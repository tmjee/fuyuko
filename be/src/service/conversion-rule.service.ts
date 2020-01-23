import {Rule, ValidateClause, WhenClause} from "../model/rule.model";
import {
    ItemMetadataEntry2,
    Rule2,
    ValidateClause2,
    ValidateClauseMetadata2, ValidateClauseMetadataEntry2, WhenClause2,
    WhenClauseMetadata2, WhenClauseMetadataEntry2
} from "../route/model/server-side.model";
import {
    AreaValue, CurrencyValue, DateValue,
    DimensionValue, DoubleSelectValue, HeightValue,
    ItemValTypes, LengthValue,
    NumberValue, SelectValue,
    StringValue,
    TextValue, VolumeValue,
    WidthValue
} from "../model/item.model";

export const convert = (rules2: Rule2[]): Rule[] => {
    return rules2 ? rules2.map(_convert) : [];
};

export const _convert = (rule2: Rule2): Rule => {
    return {
        id: rule2.id,
        name: rule2.name,
        status: rule2.status,
        description: rule2.description,
        validateClauses: rule2.validateClauses.map((v: ValidateClause2)=> ({
           id: v.id,
           attributeId : v.attributeId,
           attributeName: v.attributeName,
           attributeType: v.attributeType,
           operator: v.operator,
           condition: toItemValTypes(v.metadatas)
        } as ValidateClause)),
        whenClauses: rule2.whenClauses.map((w: WhenClause2) => ({
            id: w.id,
            attributeId: w.attributeId,
            attributeName: w.attributeName,
            attributeType: w.attributeType,
            operator: w.operator,
            condition: toItemValTypes(w.metadatas)
        } as WhenClause))
    } as Rule;
};

export const revert = (rules: Rule[]): Rule2[] => {
    return rules ? rules.map(_revert) : [];
}

export const _revert = (rule: Rule): Rule2 => {
    return {
        id: rule.id,
        name: rule.name,
        description: rule.description,
        status: rule.status,
        whenClauses: rule.whenClauses.map((w: WhenClause) => ({
           id: w.id,
           attributeId: w.attributeId,
           attributeName: w.attributeName,
           attributeType: w.attributeType,
           operator: w.operator,
           metadatas: [toMetadata(w.attributeId, w.condition)].filter((r)=>r)
        } as WhenClause2)),
        validateClauses: rule.validateClauses.map((w: WhenClause) => ({
            id: w.id,
            attributeId: w.attributeId,
            attributeName: w.attributeName,
            attributeType: w.attributeType,
            operator: w.operator,
            metadatas: [toMetadata(w.attributeId, w.condition)].filter((r)=>r)
        } as ValidateClause2)),

    } as Rule2;
}

const toMetadata = (attributeId: number, val: ItemValTypes): WhenClauseMetadata2 | ValidateClauseMetadata2 => {
    if (val) {
        let i: WhenClauseMetadata2 | ValidateClauseMetadata2 = null;
        switch (val.type) {
            case 'string': {
                const v: StringValue = val as StringValue;
                i = {
                        id: -1,
                        attributeType: val.type,
                        attributeId,
                        name: '',
                        entries: [
                            {
                                id: -1,
                                key: 'type',
                                value: val.type,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'value',
                                value: val.value,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                        ]
                } as ValidateClauseMetadata2 | WhenClauseMetadata2;
                break;
            }
            case 'text': {
                const v: TextValue = val as TextValue;
                i = {
                        id: -1,
                        attributeType: val.type,
                        attributeId: attributeId,
                        name: '',
                        entries: [
                            {
                                id: -1,
                                key: 'type',
                                value: val.type,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'value',
                                value: val.value,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                        ]
                } as ValidateClauseMetadata2 | WhenClauseMetadata2;
                break;
            }
            case 'number': {
                const v: NumberValue = val as NumberValue;
                i = {
                        id: -1,
                        attributeType: val.type,
                        attributeId: attributeId,
                        name: '',
                        entries: [
                            {
                                id: -1,
                                key: 'type',
                                value: val.type,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'value',
                                value: `${val.value}`,
                                dataType: 'number'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                        ]
                } as ValidateClauseMetadata2 | WhenClauseMetadata2;
                break;
            }
            case 'area': {
                const v: AreaValue = val as AreaValue;
                i = {
                        id: -1,
                        attributeType: val.type,
                        attributeId: attributeId,
                        name: '',
                        entries: [
                            {
                                id: -1,
                                key: 'type',
                                value: val.type,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'unit',
                                value: val.unit,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'value',
                                value: `${val.value}`,
                                dataType: 'number'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                        ]
                } as ValidateClauseMetadata2 | WhenClauseMetadata2;
                break;
            }
            case 'dimension': {
                const v: DimensionValue = val as DimensionValue;
                i = {
                        id: -1,
                        attributeType: val.type,
                        attributeId: attributeId,
                        name: '',
                        entries: [
                            {
                                id: -1,
                                key: 'type',
                                value: val.type,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'width',
                                value: `${val.width}`,
                                dataType: 'number'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'height',
                                value: `${val.height}`,
                                dataType: 'number'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'length',
                                value: `${val.length}`,
                                dataType: 'number'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'unit',
                                value: `${val.unit}`,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                        ]
                } as ValidateClauseMetadata2 | WhenClauseMetadata2;
                break;
            }
            case 'width': {
                const v: WidthValue = val as WidthValue;
                i = {
                        id: -1,
                        attributeType: val.type,
                        attributeId: attributeId,
                        name: '',
                        entries: [
                            {
                                id: -1,
                                key: 'type',
                                value: val.type,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'value',
                                value: `${v.value}`,
                                dataType: 'number'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'unit',
                                value: `${v.unit}`,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                        ]
                } as ValidateClauseMetadata2 | WhenClauseMetadata2;
                break;
            }
            case 'length': {
                const v: LengthValue = val as LengthValue;
                i = {
                        id: -1,
                        attributeType: val.type,
                        attributeId: attributeId,
                        name: '',
                        entries: [
                            {
                                id: -1,
                                key: 'type',
                                value: val.type,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'value',
                                value: `${val.value}`,
                                dataType: 'number'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'unit',
                                value: `${val.unit}`,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                        ]
                } as ValidateClauseMetadata2 | WhenClauseMetadata2;
                break;
            }
            case 'height': {
                const v: HeightValue = val as HeightValue;
                i = {
                        id: -1,
                        attributeType: val.type,
                        attributeId: attributeId,
                        name: '',
                        entries: [
                            {
                                id: -1,
                                key: 'type',
                                value: val.type,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'value',
                                value: `${val.value}`,
                                dataType: 'number'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'unit',
                                value: `${val.unit}`,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                        ]
                } as ValidateClauseMetadata2 | WhenClauseMetadata2;
                break;
            }
            case "volume": {
                const v: VolumeValue = val as VolumeValue;
                i = {
                        id: -1,
                        attributeType: val.type,
                        attributeId: attributeId,
                        name: '',
                        entries: [
                            {
                                id: -1,
                                key: 'type',
                                value: val.type,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'value',
                                value: `${val.value}`,
                                dataType: 'number'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'unit',
                                value: `${val.unit}`,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                        ]
                } as ValidateClauseMetadata2 | WhenClauseMetadata2;
                break;
            }
            case 'date': {
                const v: DateValue = val as DateValue;
                i = {
                        id: -1,
                        attributeType: val.type,
                        attributeId: attributeId,
                        name: '',
                        entries: [
                            {
                                id: -1,
                                key: 'type',
                                value: val.type,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'value',
                                value: `${val.value}`,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                        ]
                } as ValidateClauseMetadata2 | WhenClauseMetadata2;
                break;
            }
            case 'currency': {
                const v: CurrencyValue = val as CurrencyValue;
                i = {
                        id: -1,
                        attributeType: val.type,
                        attributeId: attributeId,
                        name: '',
                        entries: [
                            {
                                id: -1,
                                key: 'type',
                                value: val.type,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'value',
                                value: `${val.value}`,
                                dataType: 'number'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'country',
                                value: `${val.country}`,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                        ]
                } as ValidateClauseMetadata2 | WhenClauseMetadata2;
                break;
            }
            case 'select': {
                const v: SelectValue = val as SelectValue;
                i = {
                        id: -1,
                        attributeType: val.type,
                        attributeId: attributeId,
                        name: '',
                        entries: [
                            {
                                id: -1,
                                key: 'type',
                                value: val.type,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'key',
                                value: `${val.key}`,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                        ]
                } as ValidateClauseMetadata2 | WhenClauseMetadata2;
                break;
            }
            case 'doubleselect': {
                const v: DoubleSelectValue = val as DoubleSelectValue;
                i = {
                        id: -1,
                        attributeType: val.type,
                        attributeId: attributeId,
                        name: '',
                        entries: [
                            {
                                id: -1,
                                key: 'type',
                                value: val.type,
                                dataType: 'string'
                            } as ItemMetadataEntry2,
                            {
                                id: -1,
                                key: 'key1',
                                value: `${val.key1}`,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                            {
                                id: -1,
                                key: 'key2',
                                value: `${val.key2}`,
                                dataType: 'string'
                            } as ValidateClauseMetadataEntry2 | WhenClauseMetadataEntry2,
                        ]
                } as ValidateClauseMetadata2 | WhenClauseMetadata2;
                break;
            }
        }
        return i;
    }
    return null;
}

const toItemValTypes = (metadatas: ValidateClauseMetadata2[] | WhenClauseMetadata2[]): ItemValTypes => {
    const o: any = {};
    for (const metadata of metadatas) {
        for (const entry of metadata.entries) {
            const k: string = entry.key;
            const t: string = entry.dataType;
            const v: string = entry.value;
            let _v: string | number = null;
            switch (t) {
                case 'string':
                    _v = String(v);
                    break;
                case 'number':
                    _v = Number(v);
                    break;
            }
            o[k] = _v;
        }
    }
    return o;
}