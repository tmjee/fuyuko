import {NextFunction, Router, Request, Response} from "express";
import {getJwtPayload, validateJwtMiddlewareFn} from "./common-middleware";
import {JwtPayload} from "../../model/jwt.model";
import * as formidable from 'formidable';
import {Fields, Files, IncomingForm, File} from 'formidable';
import {multipartParse} from "../../service";
import {makeApiError, makeApiErrorObj} from "../../util";
import {doInDbConnection, QueryA, QueryResponse} from "../../db";
import {PoolConnection} from "mariadb";
import fileType from 'file-type';
import {UserAvatarResponse} from "../../model/avatar.model";
import util from 'util';
import fs from 'fs';
import {Registry} from "./v1-app.router";

const httpAction: any[] = [

    validateJwtMiddlewareFn,
    async (req: Request, res: Response, next: NextFunction) => {

        const jwtPayload: JwtPayload = getJwtPayload(res);
        const userId: number = jwtPayload.user.id;

        const r: {fields: Fields, files: Files} = await multipartParse(req);

        const globalAvatarName: string = r.fields.globalAvatarName as string;
        const customAvatarFile: File = r.files.customAvatarFile as File;
        if (globalAvatarName && customAvatarFile) {
            res.status(400).json(makeApiErrorObj(
                makeApiError(`globalAvatarName and customAvatarFile cannot be supplied together picked on`, '', '', 'api')
            ));
        } else if (globalAvatarName) {
            await doInDbConnection(async (conn: PoolConnection) => {
                const q1: QueryA = await conn.query(`SELECT ID FROM TBL_GLOBAL_AVATAR WHERE NAME = ? `, [globalAvatarName]);
                if (q1.length > 0) {
                    const globalAvatarId: number = q1[0].ID;
                    const qCount: QueryA = await conn.query(`SELECT COUNT(*) AS COUNT, ID FROM TBL_USER_AVATAR WHERE USER_ID = ? `, [userId]);
                    let q: QueryResponse;
                    let userAvatarId: number;
                    if (qCount[0].COUNT > 0) {
                        q = await conn.query(`UPDATE TBL_USER_AVATAR SET GLOBAL_AVATAR_ID = ?, MIME_TYPE = ?, SIZE = ?, CONTENT =? WHERE USER_ID = ?`,
                            [globalAvatarId, null, null, null, userId]);
                        userAvatarId = qCount[0].ID;
                    } else {
                        q = await conn.query(`INSERT INTO TBL_USER_AVATAR (USER_ID, GLOBAL_AVATAR_ID, MIME_TYPE, SIZE, CONTENT) VALUES (?,?,?,?,?) `,
                            [userId, globalAvatarId, null, null, null]);
                        userAvatarId = q.insertId;
                    }
                    res.status(200).json({
                        status: 'SUCCESS',
                        message: `UserId ${userId}, Avatar updated`,
                        userAvatarId
                    } as UserAvatarResponse);
                } else {
                    res.status(400).json(makeApiErrorObj(
                        makeApiError(`Global avatar name ${globalAvatarName} is not found`, '', '', 'api')
                    ));
                }
            });
        } else if (customAvatarFile) {
            await doInDbConnection(async (conn: PoolConnection) => {
                const buffer: Buffer = Buffer.from(await util.promisify(fs.readFile)(customAvatarFile.path));
                const ft: fileType.FileTypeResult = fileType(buffer);
                const qCount: QueryA = await conn.query(`SELECT COUNT(*) AS COUNT, ID FROM TBL_USER_AVATAR WHERE USER_ID = ? `, [userId]);
                let q: QueryResponse;
                let userAvatarId: number;
                if (qCount[0].COUNT > 0) {
                    q = await conn.query(`UPDATE TBL_USER_AVATAR SET GLOBAL_AVATAR_ID = ?, MIME_TYPE = ?, SIZE = ?, CONTENT =? WHERE USER_ID = ?`,
                        [null, ft.mime, buffer.length, buffer, userId]);
                    userAvatarId = qCount[0].ID;
                } else {
                    q = await conn.query(`INSERT INTO TBL_USER_AVATAR (USER_ID, GLOBAL_AVATAR_ID, MIME_TYPE, SIZE, CONTENT) VALUES (?,?,?,?,?) `,
                        [userId, null, ft.mime, buffer.length, buffer]);
                    userAvatarId = q.insertId;
                }

                res.status(200).json({
                    status: 'SUCCESS',
                    message: `UserId ${userId}, Avatar updated`,
                    userAvatarId
                } as UserAvatarResponse);
            });
        } else { // insufficient parameters
            res.status(400).json(makeApiErrorObj(
                makeApiError(`globalAvatarName and customAvatarFile are both not given`, '', '', 'api')
            ));
        }
    }
];

const reg = (router: Router, registry: Registry) => {
    const p = '/user/avatar';
    registry.addItem('POST', p);
    router.post(p, ...httpAction);
};

export default reg;
