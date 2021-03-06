import {NextFunction, Router, Request, Response} from "express";
import {Registry} from "../../registry";
import {
    aFnAnyTrue,
    v,
    validateJwtMiddlewareFn,
    validateMiddlewareFn,
    vFnHasAnyUserRoles
} from "./common-middleware";
import {check, param} from 'express-validator';
import {doInDbConnection, QueryA, QueryI} from "../../db";
import {Connection} from "mariadb";
import {
    PricingStructure,
    PricingStructureItemWithPrice,
    PricingStructureWithItems
} from "../../model/pricing-structure.model";
import {getChildrenWithConn} from "../../service/pricing-structure-item.service";
import {ROLE_VIEW} from "../../model/role.model";
import {ApiResponse, PaginableApiResponse} from "../../model/api-response.model";
import {LIMIT_OFFSET, toLimitOffset} from "../../util/utils";
import {LimitOffset} from "../../model/limit-offset.model";
import {
    getAllPricingStructureItemsWithPrice,
    getAllPricingStructureItemsWithPriceCount, getPricingStructureById
} from "../../service/pricing-structure.service";


// CHECKED
const httpAction: any[] = [
    [
        param('pricingStructureId').exists().isNumeric()
    ],
    validateMiddlewareFn,
    validateJwtMiddlewareFn,
    v([vFnHasAnyUserRoles([ROLE_VIEW])], aFnAnyTrue),
    async (req: Request, res: Response, next: NextFunction) => {

        const pricingStructureId: number = Number(req.params.pricingStructureId);
        const limitOffset: LimitOffset = toLimitOffset(req.query.limit, req.query.offset);

        const ps: PricingStructure = await getPricingStructureById(pricingStructureId);
        const total: number = await getAllPricingStructureItemsWithPriceCount(pricingStructureId);
        const items: PricingStructureItemWithPrice[] = await getAllPricingStructureItemsWithPrice(pricingStructureId, limitOffset);

        const pricingStructureWithItems: PricingStructureWithItems = {
            id: ps.id,
            name: ps.name,
            viewId: ps.viewId,
            description: ps.description,
            creationDate: ps.creationDate,
            lastUpdate: ps.lastUpdate,
            items:  {
                limit: limitOffset ? limitOffset.limit : total,
                offset: limitOffset ? limitOffset.offset: 0,
                total,
                payload: items
            } as PaginableApiResponse<PricingStructureItemWithPrice[]>
        } as PricingStructureWithItems;

        res.status(200).json({
            status: 'SUCCESS',
            message: `Pricing structure with items successfully retrieved`,
            payload: pricingStructureWithItems
        } as ApiResponse<PricingStructureWithItems>);
    }
];

const reg = (router: Router, registry: Registry) => {
    const p = `/pricingStructuresWithItems/:pricingStructureId`;
    registry.addItem('GET', p);
    router.get(p, ...httpAction);
}

export default reg;
