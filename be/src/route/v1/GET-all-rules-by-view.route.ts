import {NextFunction, Router, Request, Response } from "express";
import {Registry} from "../../registry";
import {
    aFnAnyTrue,
    v,
    validateJwtMiddlewareFn,
    validateMiddlewareFn,
    vFnHasAnyUserRoles
} from "./common-middleware";
import {check} from 'express-validator';
import {Rule} from "../../model/rule.model";
import {
    Rule2,
} from "../../server-side-model/server-side.model";
import {rulesConvert} from '../../service/conversion-rule.service';
import {ROLE_VIEW} from "../../model/role.model";
import {getRule2s} from "../../service/rule.service";
import {ApiResponse} from "../../model/api-response.model";

// CHECKED
const httpAction: any[] = [
    [
        check('viewId').exists().isNumeric()
    ],
    validateJwtMiddlewareFn,
    validateMiddlewareFn,
    v([vFnHasAnyUserRoles([ROLE_VIEW])], aFnAnyTrue),
    async (req: Request, res: Response, next: NextFunction) => {
        const viewId: number = Number(req.params.viewId);
        const rule2s: Rule2[] = await getRule2s(viewId);
        const rules: Rule[] = rulesConvert(rule2s);
        res.status(200).json({
            status: 'SUCCESS',
            message: `Rules retrieved successfully`,
            payload: rules
        } as ApiResponse<Rule[]>);
    }
];


const reg = (router: Router, registry: Registry) => {
    const p = `/view/:viewId/rules`;
    registry.addItem('GET', p);
    router.get(p, ...httpAction);
}

export default reg;
