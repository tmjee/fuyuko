import {
  AREA_FORMAT,
  AreaValue, CURRENCY_FORMAT,
  CurrencyValue, DATE_FORMAT,
  DateValue, DIMENSION_FORMAT,
  DimensionValue, DoubleSelectValue, HEIGHT_FORMAT, HeightValue,
  ItemValTypes, LENGTH_FORMAT, LengthValue, NumberValue, SelectValue,
  StringValue,
  TextValue, Value, VOLUME_FORMAT,
  VolumeValue, WIDTH_FORMAT, WidthValue
} from '../model/item.model';
import {Attribute, ATTRIBUTE_TYPES, Pair1, Pair2} from '../model/attribute.model';
import moment from 'moment';
import numeral from 'numeral';


interface ItemValueConverters {
  convertToString(a: Attribute, i: ItemValTypes): string;
}

export function isItemValue(v: (Value | ItemValTypes)): v is Value {
  const r =  (v && v.hasOwnProperty('attributeId') && v.hasOwnProperty('val'));
  return r;
}

export function isItemValueType(v: (Value | ItemValTypes)): v is ItemValTypes {
  const r =  (v && v.hasOwnProperty('type') && ATTRIBUTE_TYPES.indexOf((v as ItemValTypes).type) >= 0);
  return r;
}

abstract class AbstractItemValueConverter implements ItemValueConverters {
  convertToString(a: Attribute, i: ItemValTypes): string {
      return this._check(a, i, (y, z) => this._convertToString(y, z));
  }
  convertToCsv(a: Attribute, i: ItemValTypes): string {
      return this._check(a, i, (y, z) => this._convertToCsv(y, z));
  }
  private _check(a: Attribute, i: ItemValTypes, callback: (a: Attribute, i: ItemValTypes) => string) {
    if (i) {
      if (a.type !== i.type) {
        throw new Error('incompatible types');
      }
      return callback(a, i);
    }
    return undefined;
  }
  protected abstract _convertToString(a: Attribute, i: ItemValTypes): string;
  protected abstract _convertToCsv(a: Attribute, i: ItemValTypes): string;
  protected abstract convertFromCsv(csv: string): ItemValTypes;
}

class StringItemValueConverter extends AbstractItemValueConverter {
  protected _convertToString(a: Attribute, i: StringValue): string {
    return i.value;
  }
  protected _convertToCsv(a: Attribute, i: StringValue): string {
      return this._convertToString(a, i);
  }
  protected convertFromCsv(csv: string): ItemValTypes {
      return {
        type: 'string',
        value: csv,
      } as StringValue;
  }
}

class TextItemValueConverter extends AbstractItemValueConverter {
  protected _convertToString(a: Attribute, i: TextValue): string {
    return i.value;
  }
  protected _convertToCsv(a: Attribute, i: TextValue): string {
     return this._convertToString(a, i);
  }
  protected convertFromCsv(csv: string): ItemValTypes {
      return {
          type: 'text',
          value: csv
      } as TextValue;
  }
}

class NumberItemValueConverter extends AbstractItemValueConverter {
  protected _convertToString(a: Attribute, i: NumberValue): string {
    return '' + i.value;
  }
  protected _convertToCsv(a: Attribute, i: NumberValue): string {
      return this._convertToString(a, i);
  }
  protected convertFromCsv(csv: string): NumberValue {
      return {
        type: 'number',
        value: Number(csv)
      } as NumberValue;
  }
}

class DateItemValueConverter extends AbstractItemValueConverter {
  protected _convertToString(a: Attribute, i: DateValue): string {
    const m: moment.Moment = moment(i.value, DATE_FORMAT);
    if (a.format) {
      return m.format(a.format);
    }
    return m.format(DATE_FORMAT);
  }
  protected _convertToCsv(a: Attribute, i: DateValue): string {
      return this._convertToString(a, i);
  }
  protected convertFromCsv(csv: string): DateValue {
    const m: moment.Moment = moment(csv, DATE_FORMAT);
    const f = m.format(DATE_FORMAT);
    return {
      type: 'date',
      value: f
    } as DateValue;
  }
}

class CurrencyItemValueConverter extends AbstractItemValueConverter {
  protected _convertToString(a: Attribute, i: CurrencyValue): string {
    if (a.showCurrencyCountry) {
      return `${numeral(i.value).format(CURRENCY_FORMAT)} ${i.country ? i.country : ''}`;
    }
    return `${numeral(i.value).format(CURRENCY_FORMAT)}`;
  }
  protected _convertToCsv(a: Attribute, i: CurrencyValue): string {
    return `${numeral(i.value).format(CURRENCY_FORMAT)}|${i.country ? i.country : ''}`;
  }
  protected convertFromCsv(csv: string): CurrencyValue {
    const p: string[] = csv.split('|');
    return {
      type: 'currency',
      value: Number(numeral(p[0]).format(CURRENCY_FORMAT)),
      country: p.length > 1 && p[1] ? p[1] : '',
    } as CurrencyValue;
  }
}

class DimensionItemValueConverter extends AbstractItemValueConverter {
  protected _convertToString(a: Attribute, i: DimensionValue): string {
    const f: string = a.format ? a.format : DIMENSION_FORMAT;
    return `w:${numeral(i.width).format(f)} ${i.unit},
            h:${numeral(i.height).format(f)} ${i.unit}
            l:${numeral(i.length).format(f)} ${i.unit}`;
  }
  protected _convertToCsv(a: Attribute, i: DimensionValue): string {
    const f: string = a.format ? a.format : DIMENSION_FORMAT;
    return `${numeral(i.width).format(f)}|${numeral(i.height).format(f)}|${numeral(i.length).format(f)}|${i.unit}`;
  }
  protected covertFromCsv(csv: string): DimensionValue {
    // todo:
    const p: string[] = csv.split('|');
    return {
      width: 0,
      height: 0,
      length: 0,
      type: 'dimension',
      unit: 'cm'
    } as DimensionValue;
  }
}

class AreaItemValueConverter extends AbstractItemValueConverter {
  protected _convertToString(a: Attribute, i: AreaValue): string {
    const f: string = a.format ? a.format : AREA_FORMAT;
    return `${numeral(i.value).format(f)} ${i.unit}`;
  }
  protected _convertToCsv(a: Attribute, i: AreaValue): string {
    const f: string = a.format ? a.format : AREA_FORMAT;
    return `${numeral(i.value).format(f)}|${i.unit}`;
  }
}

class VolumeItemValueConverter extends AbstractItemValueConverter {
  protected _convertToString(a: Attribute, i: VolumeValue): string {
    const f: string = a.format ? a.format : VOLUME_FORMAT;
    return `${numeral(i.value).format(f)} ${i.unit}`;
  }
  protected _convertToCsv(a: Attribute, i: VolumeValue): string {
    const f: string = a.format ? a.format : VOLUME_FORMAT;
    return `${numeral(i.value).format(f)}|${i.unit}`;
  }
}

class WidthItemValueConverter extends AbstractItemValueConverter {
  protected _convertToString(a: Attribute, i: WidthValue): string {
    const f: string = a.format ? a.format : WIDTH_FORMAT;
    return `${numeral(i.value).format(f)} ${i.unit}`;
  }
  protected _convertToCsv(a: Attribute, i: WidthValue): string {
    const f: string = a.format ? a.format : WIDTH_FORMAT;
    return `${numeral(i.value).format(f)}|${i.unit}`;
  }
}

class LengthItemValueConverter extends AbstractItemValueConverter {
  protected _convertToString(a: Attribute, i: LengthValue): string {
    const f: string = a.format ? a.format : LENGTH_FORMAT;
    return `${numeral(i.value).format(f)} ${i.unit}`;
  }
  protected _convertToCsv(a: Attribute, i: LengthValue): string {
    const f: string = a.format ? a.format : LENGTH_FORMAT;
    return `${numeral(i.value).format(f)}|${i.unit}`;
  }
}

class HeightItemValueConverter extends AbstractItemValueConverter {
  protected _convertToString(a: Attribute, i: HeightValue): string {
    const f: string = a.format ? a.format : HEIGHT_FORMAT;
    return `${numeral(i.value).format(f)} ${i.unit}`;
  }
  protected _convertToCsv(a: Attribute, i: HeightValue): string {
    const f: string = a.format ? a.format : HEIGHT_FORMAT;
    return `${numeral(i.value).format(f)}|${i.unit}`;
  }
}

class SelectItemValueConverter extends AbstractItemValueConverter {
  protected _convertToString(a: Attribute, i: SelectValue): string {
    const p: Pair1 = a.pair1.find((pp: Pair1) => pp.key === i.key);
    return `${p ? p.value : ''}`;
  }
  protected _convertToCsv(a: Attribute, i: SelectValue): string {
    return this._convertToString(a, i);
  }
}

class DoubleSelectItemValueConverter extends AbstractItemValueConverter {
  protected _convertToString(a: Attribute, i: DoubleSelectValue): string {
    const p1: Pair1 = a.pair1.find((p: Pair1) => p.key === i.key1);
    const p2: Pair2 = a.pair2.find((p: Pair2) => p.key2 === i.key2);
    return `${p1 ? p1.value : ''} - ${p2 ? p2.value : ''}`;
  }
  protected _convertToCsv(a: Attribute, i: DoubleSelectValue): string {
    return this._convertToString(a, i);
  }
}

const STRING_ITEM_CONVERTER = new StringItemValueConverter();
const TEXT_ITEM_CONVERTER = new TextItemValueConverter();
const NUMBER_ITEM_CONVERTER = new NumberItemValueConverter();
const DATE_ITEM_CONVERTER = new DateItemValueConverter();
const CURRENCY_ITEM_CONVERTER = new CurrencyItemValueConverter();
const VOLUME_ITEM_CONVERTER = new VolumeItemValueConverter();
const DIMENSION_ITEM_CONVERTER = new DimensionItemValueConverter();
const AREA_ITEM_CONVERTER = new AreaItemValueConverter();
const WIDTH_ITEM_CONVERTER = new WidthItemValueConverter();
const HEIGHT_ITEM_CONVERTER = new HeightItemValueConverter();
const LENGTH_ITEM_CONVERTER = new LengthItemValueConverter();
const SELECT_ITEM_CONVERTER = new SelectItemValueConverter();
const DOUBLESELECT_ITEM_CONVERTER = new DoubleSelectItemValueConverter();


export const itemConverter = (a: Attribute): AbstractItemValueConverter => {
  let typeConverter: AbstractItemValueConverter;
  switch (a.type) {
    case 'string':
      typeConverter = STRING_ITEM_CONVERTER;
      break;
    case 'text':
      typeConverter = TEXT_ITEM_CONVERTER;
      break;
    case 'number':
      typeConverter = NUMBER_ITEM_CONVERTER;
      break;
    case 'date':
      typeConverter = DATE_ITEM_CONVERTER;
      break;
    case 'currency':
      typeConverter = CURRENCY_ITEM_CONVERTER;
      break;
    case 'volume':
      typeConverter = VOLUME_ITEM_CONVERTER;
      break;
    case 'dimension':
      typeConverter = DIMENSION_ITEM_CONVERTER;
      break;
    case 'area':
      typeConverter = AREA_ITEM_CONVERTER;
      break;
    case 'width':
      typeConverter = WIDTH_ITEM_CONVERTER;
      break;
    case 'length':
      typeConverter = LENGTH_ITEM_CONVERTER;
      break;
    case 'height':
      typeConverter = HEIGHT_ITEM_CONVERTER;
      break;
    case 'select':
      typeConverter = SELECT_ITEM_CONVERTER;
      break;
    case 'doubleselect':
      typeConverter = DOUBLESELECT_ITEM_CONVERTER;
      break;
  }
  if (!typeConverter) {
    throw new Error(`Bad attribute type ${a.type}`);
  }
  return typeConverter;
};

export const convertToCsv = (a: Attribute, i: Value | ItemValTypes): string => {
  const v: ItemValTypes = isItemValueType(i) ? i : (isItemValue(i) ? i.val : undefined);
  const typeConverter: AbstractItemValueConverter = itemConverter(a);
  return typeConverter.convertToCsv(a, v);
};

export const convertToString = (a: Attribute, i: Value | ItemValTypes): string => {
  const v: ItemValTypes = isItemValueType(i) ? i : (isItemValue(i) ? i.val : undefined);
  const typeConverter: AbstractItemValueConverter = itemConverter(a);
  return typeConverter.convertToString(a, v);
};

