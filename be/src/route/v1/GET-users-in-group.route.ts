import {NextFunction, Router, Request, Response} from "express";
import {Registry} from "../../registry";
import {
    aFnAnyTrue,
    v,
    validateJwtMiddlewareFn,
    validateMiddlewareFn,
    vFnHasAnyUserRoles
} from "./common-middleware";
import {check} from 'express-validator';
import {User} from "../../model/user.model";
import {doInDbConnection, QueryA, QueryI} from "../../db";
import {Connection} from "mariadb";
import {Group} from "../../model/group.model";
import {Role, ROLE_VIEW} from "../../model/role.model";
import {ApiResponse} from "../../model/api-response.model";
import {getUsersInGroup} from "../../service/user.service";

// CHECKED

const httpAction: any[] = [
    [
        check('groupId').exists().isNumeric()
    ],
    validateMiddlewareFn,
    validateJwtMiddlewareFn,
    v([vFnHasAnyUserRoles([ROLE_VIEW])], aFnAnyTrue),
    async (req: Request, res: Response, next: NextFunction) => {
        const groupId: number = Number(req.params.groupId);
        const u: User[] = await getUsersInGroup(groupId);

        res.status(200).json({
            status: 'SUCCESS',
            message: `Users retrieved`,
            payload: u
        } as ApiResponse<User[]>);
    }
]




const reg = (router: Router, registry: Registry) => {
    const p = `/users/in-group/:groupId`;
    registry.addItem('GET', p);
    router.get(p, ...httpAction);
}

export default reg;
