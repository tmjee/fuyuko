import {Registry} from "../../registry";
import {NextFunction, Router, Request, Response} from "express";
import { param } from "express-validator";
import {aFnAnyTrue, v, validateJwtMiddlewareFn, validateMiddlewareFn, vFnHasAnyUserRoles} from "./common-middleware";
import {ROLE_VIEW} from "../../model/role.model";
import {LimitOffset} from "../../model/limit-offset.model";
import {toLimitOffset} from "../../util/utils";
import {
    categorySimpleItemsNotInCategory,
    categorySimpleItemsNotInCategoryCount
} from "../../service/category.service";
import {CategorySimpleItem} from "../../model/category.model";
import {PaginableApiResponse} from "../../model/api-response.model";

const httpAction: any[] = [
    [
        param('viewId').exists().isNumeric(),
        param('categoryId').exists().isNumeric()
    ],
    validateMiddlewareFn,
    validateJwtMiddlewareFn,
    v([vFnHasAnyUserRoles([ROLE_VIEW])], aFnAnyTrue),
    async (req: Request, res: Response, next: NextFunction) => {

        const limitOffset: LimitOffset = toLimitOffset(req.query.limit, req.query.offset);

        const viewId: number =  Number(req.params.viewId);
        const categoryId: number = Number(req.params.categoryId);
        const total: number = await categorySimpleItemsNotInCategoryCount(viewId, categoryId);
        const items: CategorySimpleItem[] = await categorySimpleItemsNotInCategory(viewId, categoryId, limitOffset);

        res.status(200).json({
            status: 'SUCCESS',
            message: `Items retrieved successfully`,
            payload: items,
            limit: limitOffset ? limitOffset.limit : total,
            offset: limitOffset ? limitOffset.offset : 0,
            total: total
        } as PaginableApiResponse<CategorySimpleItem[]>);
    }
];

const reg = (router: Router, registry: Registry) => {
    const p = `/view/:viewId/category/:categoryId/category-simple-items-not-in-category`;
    registry.addItem('GET', p);
    router.get(p, ...httpAction);
};

export default reg;