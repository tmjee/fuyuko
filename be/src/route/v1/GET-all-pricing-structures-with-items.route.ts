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
    PricingStructureItemWithPrice,
    PricingStructureWithItems
} from "../../model/pricing-structure.model";
import {getChildrenWithConn} from "../../service/pricing-structure-item.service";
import {ROLE_VIEW} from "../../model/role.model";
import {ApiResponse, PaginableApiResponse} from "../../model/api-response.model";
import {LIMIT_OFFSET, toLimitOffset} from "../../util/utils";
import {LimitOffset} from "../../model/limit-offset.model";


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

        await doInDbConnection(async (conn: Connection) => {

            const qq: QueryA = await conn.query(`
                SELECT COUNT(*) AS COUNT 
                FROM TBL_ITEM AS I 
                WHERE I.STATUS = 'ENABLED' AND I.PARENT_ID IS NULL AND I.VIEW_ID = (
                    SELECT VIEW_ID FROM TBL_PRICING_STRUCTURE WHERE ID = ?
                )
            `, [pricingStructureId]);
            const total = qq[0].COUNT;

            const q: QueryA = await conn.query(`
                SELECT
                    I.ID AS I_ID,
                    I.PARENT_ID AS I_PARENT_ID,
                    I.VIEW_ID AS I_VIEW_ID,
                    I.NAME AS I_NAME,
                    I.DESCRIPTION AS I_DESCRIPTION,
                    I.STATUS AS I_STATUS,
                    
                    PS.ID AS PS_ID,
                    PS.VIEW_ID AS PS_VIEW_ID,
                    PS.NAME AS PS_NAME,
                    PS.DESCRIPTION AS PS_DESCRIPTION,
                    PS.CREATION_DATE AS PS_CREATION_DATE,
                    PS.LAST_UPDATE AS PS_LAST_UPDATE,
                    
                    PSI.ID AS PSI_ID,
                    PSI.ITEM_ID AS PSI_ITEM_ID,
                    PSI.PRICING_STRUCTURE_ID AS PSI_PRICING_STRUCTURE_ID,
                    PSI.PRICE AS PSI_PRICE,
                    PSI.COUNTRY AS PSI_COUNTRY,
                    PSI.CREATION_DATE AS PSI_CREATION_DATE,
                    PSI.LAST_UPDATE AS PSI_LAST_UPDATE
                
                FROM TBL_ITEM AS I
                LEFT JOIN TBL_PRICING_STRUCTURE AS PS ON PS.VIEW_ID = I.VIEW_ID
                LEFT JOIN TBL_PRICING_STRUCTURE_ITEM AS PSI ON PSI.PRICING_STRUCTURE_ID = PS.ID AND PSI.ITEM_ID = I.ID
                WHERE PS.ID=? AND I.PARENT_ID IS NULL AND I.STATUS = 'ENABLED' AND PS.STATUS <> 'DELETED'
                ${LIMIT_OFFSET(limitOffset)}
            `, [pricingStructureId]);

            let pricingStructureWithItems: PricingStructureWithItems = null;
            const mItemMap: Map<string /* itemId */, PricingStructureItemWithPrice> = new Map();
            for (const i of q) {

               if (!!!pricingStructureWithItems) {
                   pricingStructureWithItems = {
                       id: i.PS_ID,
                       name: i.PS_NAME,
                       viewId: i.PS_VIEW_ID,
                       description: i.PS_DESCRIPTION,
                       creationDate: i.PS_CREATION_DATE,
                       lastUpdate: i.PS_LAST_UPDATE,
                       items:  {
                          limit: limitOffset ? limitOffset.limit : total,
                          offset: limitOffset ? limitOffset.offset: 0,
                          total,
                          payload: []
                       } as PaginableApiResponse<PricingStructureItemWithPrice[]>
                   } as PricingStructureWithItems;
               }

               const itemId: number = i.I_ID;
               const mItemMapKey: string = `${itemId}`;


               if (!mItemMap.has(mItemMapKey)) {
                   const item: PricingStructureItemWithPrice = {
                       id: i.PSI_ID,
                       itemId: itemId,
                       itemName: i.I_NAME,
                       itemDescription: i.I_DESCRIPTION,
                       parentId: i.I_PARENT_ID,
                       country: i.PSI_COUNTRY,
                       price: i.PSI_PRICE,
                       creationDate: i.PSI_CREATION_DATE,
                       lastUpdate: i.PSI_LAST_UPDATE,
                       children: await getChildrenWithConn(conn, pricingStructureId, itemId)
                   } as PricingStructureItemWithPrice;
                   mItemMap.set(mItemMapKey, item);
                   pricingStructureWithItems.items.payload.push(item);
               }
           }

           res.status(200).json({
               status: 'SUCCESS',
               message: `Pricing structure with items successfully retrieved`,
               payload: pricingStructureWithItems
           } as ApiResponse<PricingStructureWithItems>);
        });
    }
];

const reg = (router: Router, registry: Registry) => {
    const p = `/pricingStructuresWithItems/:pricingStructureId`;
    registry.addItem('GET', p);
    router.get(p, ...httpAction);
}

export default reg;
