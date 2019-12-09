import {Injectable} from '@angular/core';
import {
    AttributeDataImport,
    ItemDataImport,
    PriceDataImport,
    UploadType
} from '../../model/data-import.model';
import {Observable, of} from 'rxjs';
import {Job} from '../../model/job.model';
import {Message} from '../../model/notification-listing.model';
import {Attribute} from '../../model/attribute.model';
import {Item, StringValue} from '../../model/item.model';


@Injectable()
export class ImportDataService {

    jobNumber = 1000;

    showPreview(uploadType: UploadType, file: File): Observable<AttributeDataImport | ItemDataImport | PriceDataImport> {
        return of({
            type: 'ATTRIBUTE',
            messages: {
                infos: [
                    {title: 'info #1', messsage: 'info #1 message'} as Message,
                    {title: 'info #2', messsage: 'info #2 message'} as Message,
                    {title: 'info #3', messsage: 'info #3 message'} as Message,
                    {title: 'info #4', messsage: 'info #4 message'} as Message,
                ],
                warnings: [
                    {title: 'warn #1', messsage: 'warning #1 message'} as Message,
                    {title: 'warn #2', messsage: 'warning #2 message'} as Message,
                    {title: 'warn #3', messsage: 'warning #3 message'} as Message,
                    {title: 'warn #4', messsage: 'warning #4 message'} as Message,
                    {title: 'warn #5', messsage: 'warning #5 message'} as Message,
                ],
                errors: []
            } ,
            attributes: [
                { id: 1, type: 'string', name: 'attr #1', description: 'attr #1 description' } as Attribute,
                { id: 2, type: 'string', name: 'attr #2', description: 'attr #2 description' } as Attribute,
                { id: 3, type: 'string', name: 'attr #3', description: 'attr #3 description' } as Attribute,
                { id: 4, type: 'string', name: 'attr #4', description: 'attr #4 description' } as Attribute,
            ],
            items: [
                { id: 1, name: 'item #1', description: 'item #1 description', images: [], parentId: undefined, children: [],
                    1: { attributeId: 1, val: { type: 'string', value: 'item 1 val 1' }  as StringValue },
                    2: { attributeId: 2, val: { type: 'string', value: 'item 1 val 2' }  as StringValue },
                    3: { attributeId: 3, val: { type: 'string', value: 'item 1 val 3' }  as StringValue },
                    4: { attributeId: 4, val: { type: 'string', value: 'item 1 val 4' }  as StringValue },
                } as Item
            ]
        } as AttributeDataImport);
    }


    submitDataImport(uploadType: UploadType, dataImport: AttributeDataImport | ItemDataImport | PriceDataImport): Observable<Job> {
        const num = this.jobNumber++;
        return of({
            id: num,
            name: `data import job ${num}`,
            creationDate: new Date(),
            lastUpdate: new Date(),
            progress: 'COMPLETED',
            status: 'ENABLED'
        } as Job);
    }
}
