import {ActualPage} from "./actual.page";
import * as util from '../util/util';
import {
    AreaOperatorType,
    CurrencyOperatorType,
    DateOperatorType, DimensionOperatorType, DoubleselectOperatorType, HeightOperatorType, LengthOperatorType,
    NumberOperatorType,
    OperatorType, SelectOperatorType,
    StringOperatorType,
    TextOperatorType, VolumeOperatorType, WidthOperatorType
} from "../model/operator.model";
import {
    AreaUnits,
    CountryCurrencyUnits,
    DimensionUnits, HeightUnits,
    LengthUnits,
    VolumeUnits,
    WidthUnits
} from "../model/unit.model";


const PAGE_NAME = 'bulk-edit';
export class BulkEditPage implements ActualPage<BulkEditPage> {

    visit(): BulkEditPage {
        cy.visit('/gen-layout/(bulk-edit//help:bulk-edit-help)');
        this.waitForReady();
        return this;
    }

    waitForReady(): BulkEditPage {
        util.waitUntilTestPageReady(PAGE_NAME);
        return this;
    }

    validateTitle(): BulkEditPage {
        cy.get(`[test-page-title]`).should('have.attr', 'test-page-title', PAGE_NAME);
        return this;
    }

    verifyErrorMessageExists(): BulkEditPage {
        util.clickOnErrorMessageToasts();
        return this;
    }

    verifySuccessMessageExists(): BulkEditPage {
        util.clickOnSuccessMessageToasts();
        return this;
    }

    ////////////////////

    selectView(viewName: string): BulkEditPage {
        cy.waitUntil(() => cy.get(`[test-page-title='bulk-edit'] [test-mat-select-current-view] div`)).first()
            .click({force: true});
        cy.waitUntil(() => cy.get(`[test-mat-select-option-current-view='${viewName}']`))
            .click({force: true});
        return this;
    }

    verifySelectedView(viewName: string): BulkEditPage {
        cy.get(`[test-page-title='bulk-edit']`)
            .find(`[test-bulk-edit-wizard='${viewName}']`)
            .should('exist');
        return this;
    }


    startWizard(): BulkEditPageStep1 {
        return new BulkEditPageStep1();
    }


}

export class BulkEditPageStep1 {

    clickOnPredefinedTab(): BulkEditPageStep1 {
        cy.get(`[test-mat-tab-predefined]`).click({force: true});
        return this;
    }

    clickOnCustomTab(): BulkEditPageStep1 {
        cy.get(`[test-mat-tab-custom]`).click({force: true});
        return this;
    }

    verifyStep(): BulkEditPageStep1 {
        cy.get(`mat-step-header[ng-reflect-index='0']`)
            .should('have.attr', 'ng-reflect-selected', 'true');
        return this;
    }

    clickAddChangeClause(): BulkEditPageStep1 {
        cy.get(`[test-button-add-change-clause]`)
            .click({force: true});
        return this;
    }

    clickAddWhenClause(): BulkEditPageStep1 {
        cy.get(`[test-button-add-when-clause]`)
            .click({force: true});
        return this;
    }

    selectChangeAttribute(index: number, attributeName: string): BulkEditPageStep1 {
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-attribute] div`).first()
            .click({force: true});
        cy.get(`[test-mat-select-option-attribute='${attributeName}']`)
            .click({force: true});
        cy.wait(100);
        return this;
    }

    _verifyChangeClauseAttributeName(index: number, attributeName: string): BulkEditPageStep1 {
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-attribute] div`)
            .find(`.mat-select-value-text`)
            .should('contain.text', attributeName);
        return this;
    }

    // string
    editChangeString(index: number, attributeName: string, value: string): BulkEditPageStep1 {
        this.selectChangeAttribute(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-string]`)
            .clear({force: true})
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-string]`)
            .type(value, {force: true});
        return this;
    }
    verifyChangeClauseString(index: number, attributeName: string, value: string): BulkEditPageStep1 {
        this._verifyChangeClauseAttributeName(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-string]`)
            .should('contain.value', value);
        return this;
    }

    // text
    editChangeText(index: number, attributeName: string, value: string): BulkEditPageStep1 {
        this.selectChangeAttribute(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-text]`)
            .clear({force: true})
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-text]`)
            .type(value, {force: true});
        return this;
    }
    verifyChangeClauseText(index: number, attributeName: string, value: string): BulkEditPageStep1 {
        this._verifyChangeClauseAttributeName(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-text]`)
            .should('contain.value', value);
        return this;
    }

    // number
    editChangeNumber(index: number, attributeName: string, value: number): BulkEditPageStep1 {
        this.selectChangeAttribute(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-number]`)
            .clear({force: true})
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-number]`)
            .type(String(value), {force: true});
        return this;
    }
    verifyChangeClauseNumber(index: number, attributeName: string, value: number): BulkEditPageStep1 {
        this._verifyChangeClauseAttributeName(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-number]`)
            .should('contain.value', value);
        return this;
    }

    // date
    editChangeDate(index: number, attributeName: string, value: string /* DD-MM-YYYY */): BulkEditPageStep1 {
        this.selectChangeAttribute(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-date]`)
            .clear({force: true})
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-date]`)
            .type(String(value), {force: true});
        return this;
    }
    verifyChangeClauseDate(index: number, attributeName: string, value: string): BulkEditPageStep1 {
        this._verifyChangeClauseAttributeName(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-date]`)
            .should('contain.value', value);
        return this;
    }

    // currency
    editChangeCurrency(index: number, attributeName: string, value: number, unit: CountryCurrencyUnits): BulkEditPageStep1 {
        this.selectChangeAttribute(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-currency-unit] div`).first().click({force: true});
        cy.get(`[test-mat-select-option-currency-unit='${unit}']`).click({force: true});
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-currency]`)
            .clear({force: true})
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-currency]`)
            .type(String(value), {force: true});
        return this;
    }
    verifyChangeClauseCurrency(index: number, attributeName: string, value: number, unit: CountryCurrencyUnits): BulkEditPageStep1 {
        this._verifyChangeClauseAttributeName(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-currency-unit] div`)
            .find(`.mat-select-value-text`)
            .should('contain.text', unit);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-currency]`)
            .should('contain.value', value);
        return this;
    }

    // volume
    editChangeVolume(index: number, attributeName: string, value: number, unit: VolumeUnits): BulkEditPageStep1 {
        this.selectChangeAttribute(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-volume-unit] div`).first().click({force: true})
        cy.get(`[test-mat-select-option-volume-unit='${unit}']`).click({force: true});
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-volume]`)
            .clear({force: true})
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-volume]`)
            .type(String(value), {force: true});
        return this;
    }
    verifyChangeClauseVolume(index: number, attributeName: string, value: number, unit: VolumeUnits): BulkEditPageStep1 {
        this._verifyChangeClauseAttributeName(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-volume-unit] div`)
            .find(`.mat-select-value-text`)
            .should('contain.text', unit);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-volume]`)
            .should('contain.value', value);
        return this;
    }

    // dimension
    editChangeDimension(index: number, attributeName: string, length: number, width: number, height: number, unit: DimensionUnits): BulkEditPageStep1 {
        this.selectChangeAttribute(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-dimension-unit] div`).first().click({force: true})
        cy.get(`[test-mat-select-option-dimension-unit='${unit}']`).click({force: true});
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-dimension-length]`)
            .clear({force: true})
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-dimension-length]`)
            .clear({force: true})
            .type(String(length), {force: true});
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-dimension-width]`)
            .clear({force: true})
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-dimension-width]`)
            .clear({force: true})
            .type(String(width), {force: true});
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-dimension-height]`)
            .clear({force: true})
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-dimension-height]`)
            .clear({force: true})
            .type(String(height), {force: true});
        return this;
    }
    verifyChangeClauseDimension(index: number, attributeName: string, length: number, width: number, height: number, unit: DimensionUnits): BulkEditPageStep1 {
        this._verifyChangeClauseAttributeName(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-dimension-unit] div`)
            .find(`.mat-select-value-text`)
            .should('contain.text', unit);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-dimension-length]`)
            .should('contain.value', length);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-dimension-width]`)
            .should('contain.value', width);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-dimension-height]`)
            .should('contain.value', height);
        return this;
    }

    // area
    editChangeArea(index: number, attributeName: string, area: number, unit: AreaUnits):BulkEditPageStep1 {
        this.selectChangeAttribute(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-area-unit] div`).first().click({force: true})
        cy.get(`[test-mat-select-option-area-unit='${unit}']`).click({force: true});
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-area]`)
            .clear({force: true})
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-area]`)
            .type(String(area), {force: true});
        return this;
    }
    verifyChangeClauseArea(index: number, attributeName: string, value: number, unit: AreaUnits): BulkEditPageStep1 {
        this._verifyChangeClauseAttributeName(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-area-unit] div`)
            .find(`.mat-select-value-text`)
            .should('contain.text', unit);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-area]`)
            .should('contain.value', value);
        return this;
    }

    // length
    editChangeLength(index: number, attributeName: string, length: number, unit: LengthUnits): BulkEditPageStep1 {
        this.selectChangeAttribute(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-length-unit] div`).first().click({force: true})
        cy.get(`[test-mat-select-option-length-unit='${unit}']`).click({force: true});
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-length]`)
            .clear({force: true})
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-length]`)
            .type(String(length), {force: true});
        return this;
    }
    verifyChangeClauseLength(index: number, attributeName: string, value: number, unit: LengthUnits): BulkEditPageStep1 {
        this._verifyChangeClauseAttributeName(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-length-unit] div`)
            .find(`.mat-select-value-text`)
            .should('contain.text', unit);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-length]`)
            .should('contain.value', value);
        return this;
    }

    // width
    editChangeWidth(index: number, attributeName: string, width: number, unit: WidthUnits): BulkEditPageStep1 {
        this.selectChangeAttribute(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-width-unit] div`).first().click({force: true})
        cy.get(`[test-mat-select-option-width-unit='${unit}']`).click({force: true});
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-width]`)
            .clear({force: true})
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-width]`)
            .type(String(width), {force: true});
        return this;
    }
    verifyChangeClauseWidth(index: number, attributeName: string, value: number, unit: WidthUnits): BulkEditPageStep1 {
        this._verifyChangeClauseAttributeName(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-width-unit] div`)
            .find(`.mat-select-value-text`)
            .should('contain.text', unit);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-width]`)
            .should('contain.value', value);
        return this;
    }

    // height
    editChangeHeight(index: number, attributeName: string, height: number, unit: HeightUnits): BulkEditPageStep1 {
        this.selectChangeAttribute(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-height-unit] div`).first().click({force: true})
        cy.get(`[test-mat-select-option-height-unit='${unit}']`).click({force: true});
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-height]`)
            .clear({force: true})
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-height]`)
            .type(String(height), {force: true});
        return this;
    }
    verifyChangeClauseHeight(index: number, attributeName: string, value: number, unit: HeightUnits): BulkEditPageStep1 {
        this._verifyChangeClauseAttributeName(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-height-unit] div`)
            .find(`.mat-select-value-text`)
            .should('contain.text', unit);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-field-height]`)
            .should('contain.value', value);
        return this;
    }

    // select
    editChangeSelect(index: number, attributeName: string, key: string): BulkEditPageStep1 {
        this.selectChangeAttribute(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-select] div`).first().click({force: true});
        cy.get(`[test-mat-select-option-select='${key}']`).click({force: true});
        return this;
    }
    verifyChangeClauseSelect(index: number, attributeName: string, key: string): BulkEditPageStep1 {
        this._verifyChangeClauseAttributeName(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-select] div`)
            .find(`.mat-select-value-text`)
            .should('contain.text', key);
        return this;
    }

    // doubleselect
    editChangeDoubleselect(index: number, attributeName: string, key1: string, key2: string): BulkEditPageStep1 {
        this.selectChangeAttribute(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-doubleselect-1] div`).first().click({force: true});
        cy.get(`[test-mat-select-option-doubleselect-1='${key1}']`).click({force: true});
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-doubleselect-2] div`).first().click({force: true});
        cy.get(`[test-mat-select-option-doubleselect-2='${key2}']`).click({force: true});
        return this;
    }
    verifyChangeClauseDoubleselect(index: number, attributeName: string, key1: string, key2: string): BulkEditPageStep1 {
        this._verifyChangeClauseAttributeName(index, attributeName);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-doubleselect-1] div`)
            .find(`.mat-select-value-text`)
            .should('contain.text', key1);
        cy.get(`[test-change-clause-editor='${index}']`)
            .find(`[test-mat-select-doubleselect-2] div`)
            .find(`.mat-select-value-text`)
            .should('contain.text', key2);
        return this;
    }


    selectWhereAttribute(index: number, attributeName: string): BulkEditPageStep1 {
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-select-attribute]`).first()
            .click({force: true});
        cy.get(`[test-select-option-attribute='${attributeName}']`)
            .click({force: true});
        cy.wait(100);
        return this;
    }

    selectWhereOperator(index: number, operator: OperatorType): BulkEditPageStep1 {
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-select-attribute-operator]`).first()
            .click({force: true});
        cy.get(`[test-select-option-attribute-operator='${operator}']`)
            .click({force: true});
        cy.wait(100);
        return this;
    }


    editWhereFieldValue(index: number, value: string): BulkEditPageStep1 {
        cy.wait(100).get(`[test-where-clause-editor='${index}']`)
            .find(`[test-field-value]`)
            .clear({force: true});
        cy.wait(100).get(`[test-where-clause-editor='${index}']`)
            .find(`[test-field-value]`)
            .clear({force: true})
            .type(value, {force: true});
        return this;
    }


    editWhereFieldValue2(index: number, value: string): BulkEditPageStep1 {
        cy.wait(100).get(`[test-where-clause-editor='${index}']`)
            .find(`[test-field-value2]`)
            .clear({force: true});
        cy.wait(100).get(`[test-where-clause-editor='${index}']`)
            .find(`[test-field-value2]`)
            .clear({force: true})
            .type(value, {force: true});
        return this;
    }


    editWhereFieldValue3(index: number, value: string): BulkEditPageStep1 {
        cy.wait(100).get(`[test-where-clause-editor='${index}']`)
            .find(`[test-field-value3]`)
            .clear({force: true});
        cy.wait(100).get(`[test-where-clause-editor='${index}']`)
            .find(`[test-field-value3]`)
            .clear({force: true})
            .type(value, {force: true});
        return this;
    }

    editWhereFieldValue4(index: number, value: string): BulkEditPageStep1 {
        cy.wait(100).get(`[test-where-clause-editor='${index}']`)
            .find(`[test-field-value3]`)
            .clear({force: true});
        cy.wait(100).get(`[test-where-clause-editor='${index}']`)
            .find(`[test-field-value3]`)
            .type(value, {force: true});
        return this;
    }

    // string
    editWhereString(index: number, attributeName: string, operator: StringOperatorType, value: string): BulkEditPageStep1 {
        this.selectWhereAttribute(index, attributeName);
        this.selectWhereOperator(index, operator);
        this.editWhereFieldValue(index, value);
        return this;
    }

    _verifyWhereClauseAttribute(index: number, attributeName: string): BulkEditPageStep1 {
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-select-attribute]`)
            .find(`.mat-select-value-text`)
            .should('contain.text', attributeName);
        return this;
    }

    _verifyWhereClauseOperator(index: number, operator: OperatorType): BulkEditPageStep1 {
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-select-attribute-operator]`)
            .find(`.mat-select-value-text`)
            .should('contain.text', operator);
        return this;
    }

    _verifyWhereFieldValue(index: number, value: string): BulkEditPageStep1 {
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-field-value]`)
            .should('contain.value', value);
        return this;
    }

    _verifyWhereFieldValue2(index: number, value: string): BulkEditPageStep1 {
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-field-value2]`)
            .should('contain.value', value);
        return this;
    }

    _verifyWhereFieldValue3(index: number, value: string): BulkEditPageStep1 {
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-field-value3]`)
            .should('contain.value', value);
        return this;
    }

    _verifyWhereFieldValue4(index: number, value: string): BulkEditPageStep1 {
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-field-value4]`)
            .should('contain.value', value);
        return this;
    }

    verifyWhereClauseString(index: number, attributeName: string, operator: StringOperatorType, value: string): BulkEditPageStep1 {
        this._verifyWhereClauseAttribute(index, attributeName);
        this._verifyWhereClauseOperator(index, operator);
        this._verifyWhereFieldValue(index, value);
        return this;
    }


    // text
    editWhereText(index: number, attributeName: string, operator: TextOperatorType, value: string): BulkEditPageStep1 {
        this.selectWhereAttribute(index, attributeName);
        this.selectWhereOperator(index, operator);
        this.editWhereFieldValue(index, value);
        return this;
    }

    verifyWhereClauseText(index: number, attributeName: string, operator: TextOperatorType, value: string): BulkEditPageStep1 {
        this._verifyWhereClauseAttribute(index, attributeName);
        this._verifyWhereClauseOperator(index, operator);
        this._verifyWhereFieldValue(index, value);
        return this;
    }

    // number
    editWhereNumber(index: number, attributeName: string, operator: NumberOperatorType, value: number): BulkEditPageStep1 {
        this.selectWhereAttribute(index, attributeName);
        this.selectWhereOperator(index, operator);
        this.editWhereFieldValue(index, String(value));
        return this;
    }
    verifyWhereClauseNumber(index: number, attributeName: string, operator: NumberOperatorType, value: number): BulkEditPageStep1 {
        this._verifyWhereClauseAttribute(index, attributeName);
        this._verifyWhereClauseOperator(index, operator);
        this._verifyWhereFieldValue(index, String(value));
        return this;
    }

    // date
    editWhereDate(index: number, attributeName: string, operator: DateOperatorType, value: string): BulkEditPageStep1 {
        this.selectWhereAttribute(index, attributeName);
        this.selectWhereOperator(index, operator);
        this.editWhereFieldValue(index, String(value));
        return this;
    }
    verifyWhereClauseDate(index: number, attributeName: string, operator: DateOperatorType, value: string): BulkEditPageStep1 {
        this._verifyWhereClauseAttribute(index, attributeName);
        this._verifyWhereClauseOperator(index, operator);
        this._verifyWhereFieldValue(index, value);
        return this;
    }

    // currency
    editWhereCurrency(index: number, attributeName: string, operator: CurrencyOperatorType, value: number, unit: CountryCurrencyUnits): BulkEditPageStep1 {
        this.selectWhereAttribute(index, attributeName);
        this.selectWhereOperator(index, operator);
        this.editWhereFieldValue(index, String(value));
        cy.get(`[test-where-clause-editor='${index}']`) // click outside of the text field
            .find(`[test-mat-select-field-currency-unit]`).click({force: true});
        cy.get(`[test-where-clause-editor='${index}']`) // then click the drop down box
            .find(`[test-mat-select-field-currency-unit] div`).first().click({force: true});
        cy.get(`[test-mat-select-option-field-currency-unit='${unit}']`).click({force: true});
        return this;
    }
    verifyWhereClauseCurrency(index: number, attributeName: string, operator: CurrencyOperatorType, value: number, unit: CountryCurrencyUnits): BulkEditPageStep1 {
        this._verifyWhereClauseAttribute(index, attributeName);
        this._verifyWhereClauseOperator(index, operator);
        this._verifyWhereFieldValue(index, String(value));
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-mat-select-field-currency-unit]`)
            .find(`.mat-select-value-text`)
            .should('contain.text', unit);
        return this;
    }

    // volume
    editWhereVolume(index: number, attributeName: string, operator: VolumeOperatorType, value: number, unit: VolumeUnits): BulkEditPageStep1 {
        this.selectWhereAttribute(index, attributeName);
        this.selectWhereOperator(index, operator);
        this.editWhereFieldValue(index, String(value));
        cy.get(`[test-where-clause-editor='${index}']`) // click outside of text field
            .find(`[test-mat-select-field-volume-unit]`).first().click({force: true})
        cy.get(`[test-where-clause-editor='${index}']`) // click on drop down
            .find(`[test-mat-select-field-volume-unit] div`).first().click({force: true})
        cy.get(`[test-mat-select-option-field-volume-unit='${unit}']`).click({force: true});
        return this;
    }
    verifyWhereClauseVolume(index: number, attributeName: string, operator: VolumeOperatorType, value: number, unit: VolumeUnits): BulkEditPageStep1 {
        this._verifyWhereClauseAttribute(index, attributeName);
        this._verifyWhereClauseOperator(index, operator);
        this._verifyWhereFieldValue(index, String(value));
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-mat-select-field-volume-unit]`)
            .find(`.mat-select-value-text`)
            .should('contain.text', unit);
        return this;
    }

    // dimension
    editWhereDimension(index: number, attributeName: string, operator: DimensionOperatorType, length: number, width: number, height: number, unit: DimensionUnits): BulkEditPageStep1 {
        this.selectWhereAttribute(index, attributeName);
        this.selectWhereOperator(index, operator);
        this.editWhereFieldValue(index, String(Number(length)));
        this.editWhereFieldValue2(index, String(Number(width)));
        this.editWhereFieldValue3(index, String(Number(height)));
        cy.get(`[test-where-clause-editor='${index}']`) // click on outside of text field
            .find(`[test-mat-select-field-dimension-unit]`).first().click({force: true})
        cy.get(`[test-where-clause-editor='${index}']`) // click on drop down
            .find(`[test-mat-select-field-dimension-unit] div`).first().click({force: true})
        cy.get(`[test-mat-select-option-field-dimension-unit='${unit}']`).click({force: true});
        return this;
    }
    verifyWhereClauseDimension(index: number, attributeName: string, operator: DimensionOperatorType, length: number, width: number, height: number, unit: DimensionUnits): BulkEditPageStep1 {
        this._verifyWhereClauseAttribute(index, attributeName);
        this._verifyWhereClauseOperator(index, operator);
        this._verifyWhereFieldValue(index, String(length));
        this._verifyWhereFieldValue2(index, String(width));
        this._verifyWhereFieldValue3(index, String(height));
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-mat-select-field-dimension-unit]`)
            .find(`.mat-select-value-text`)
            .should('contain.text', unit);
        return this;
    }

    // area
    editWhereArea(index: number, attributeName: string, operator: AreaOperatorType, value: number, unit: AreaUnits): BulkEditPageStep1 {
        this.selectWhereAttribute(index, attributeName);
        this.selectWhereOperator(index, operator);
        this.editWhereFieldValue(index, String(value));
        cy.get(`[test-where-clause-editor='${index}']`) // click on outside of text field
            .find(`[test-mat-select-field-area-unit]`).first().click({force: true})
        cy.get(`[test-where-clause-editor='${index}']`) // click on drop down
            .find(`[test-mat-select-field-area-unit] div`).first().click({force: true})
        cy.get(`[test-mat-select-option-field-area-unit='${unit}']`).click({force: true});
        return this;
    }
    verifyWhereClauseArea(index: number, attributeName: string, operator: AreaOperatorType, value: number, unit: AreaUnits): BulkEditPageStep1 {
        this._verifyWhereClauseAttribute(index, attributeName);
        this._verifyWhereClauseOperator(index, operator);
        this._verifyWhereFieldValue(index, String(value));
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-mat-select-field-area-unit]`)
            .find(`.mat-select-value-text`)
            .should('contain.text', unit);
        return this;
    }

    // length
    editWhereLength(index: number, attributeName: string, operator: LengthOperatorType, value: number, unit: LengthUnits): BulkEditPageStep1 {
        this.selectWhereAttribute(index, attributeName);
        this.selectWhereOperator(index, operator);
        this.editWhereFieldValue(index, String(value));
        cy.get(`[test-where-clause-editor='${index}']`) // click on outside of text field
            .find(`[test-mat-select-field-length-unit]`).first().click({force: true})
        cy.get(`[test-where-clause-editor='${index}']`) // click on drop down
            .find(`[test-mat-select-field-length-unit] div`).first().click({force: true})
        cy.get(`[test-mat-select-option-field-length-unit='${unit}']`).click({force: true});
        return this;
    }
    verifyWhereClauseLength(index: number, attributeName: string, operator: LengthOperatorType, value: number, unit: LengthUnits): BulkEditPageStep1 {
        this._verifyWhereClauseAttribute(index, attributeName);
        this._verifyWhereClauseOperator(index, operator);
        this._verifyWhereFieldValue(index, String(value));
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-mat-select-field-length-unit]`)
            .find(`.mat-select-value-text`)
            .should('contain.text', unit);
        return this;
    }

    // width
    editWhereWidth(index: number, attributeName: string, operator: WidthOperatorType, value: number, unit: WidthUnits): BulkEditPageStep1 {
        this.selectWhereAttribute(index, attributeName);
        this.selectWhereOperator(index, operator);
        this.editWhereFieldValue(index, String(value));
        cy.get(`[test-where-clause-editor='${index}']`) // click on outside of text field
            .find(`[test-mat-select-field-width-unit]`).first().click({force: true})
        cy.get(`[test-where-clause-editor='${index}']`) // click on drop down
            .find(`[test-mat-select-field-width-unit] div`).first().click({force: true})
        cy.get(`[test-mat-select-option-field-width-unit='${unit}']`).click({force: true});
        return this;
    }
    verifyWhereClauseWidth(index: number, attributeName: string, operator: WidthOperatorType, value: number, unit: WidthUnits): BulkEditPageStep1 {
        this._verifyWhereClauseAttribute(index, attributeName);
        this._verifyWhereClauseOperator(index, operator);
        this._verifyWhereFieldValue(index, String(value));
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-mat-select-field-width-unit]`)
            .find(`.mat-select-value-text`)
            .should('contain.text', unit);
        return this;
    }

    // height
    editWhereHeight(index: number, attributeName: string, operator: HeightOperatorType, value: number, unit: HeightUnits): BulkEditPageStep1 {
        this.selectWhereAttribute(index, attributeName);
        this.selectWhereOperator(index, operator);
        this.editWhereFieldValue(index, String(value));
        cy.get(`[test-where-clause-editor='${index}']`) // click on outside of text field
            .find(`[test-mat-select-field-height-unit]`).first().click({force: true})
        cy.get(`[test-where-clause-editor='${index}']`) // click on drop down
            .find(`[test-mat-select-field-height-unit] div`).first().click({force: true})
        cy.get(`[test-mat-select-option-field-height-unit='${unit}']`).click({force: true});
        return this;
    }
    verifyWhereClauseHeight(index: number, attributeName: string, operator: HeightOperatorType, value: number, unit: HeightUnits): BulkEditPageStep1 {
        this._verifyWhereClauseAttribute(index, attributeName);
        this._verifyWhereClauseOperator(index, operator);
        this._verifyWhereFieldValue(index, String(value));
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-mat-select-field-height-unit]`)
            .find(`.mat-select-value-text`)
            .should('contain.text', unit);
        return this;
    }

    // select
    editWhereSelect(index: number, attributeName: string, operator: SelectOperatorType, key: string): BulkEditPageStep1 {
        this.selectWhereAttribute(index, attributeName);
        this.selectWhereOperator(index, operator);
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-mat-select-field-select] div`).first().click({force: true});
        cy.get(`[test-mat-select-option-field-select='${key}']`).click({force: true});
        return this;
    }
    verifyWhereClauseSelect(index: number, attributeName: string, operator: SelectOperatorType, key: string): BulkEditPageStep1 {
        this._verifyWhereClauseAttribute(index, attributeName);
        this._verifyWhereClauseOperator(index, operator);
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-mat-select-field-select]`)
            .find(`.mat-select-value-text`)
            .should('contain.text', key);
        return this;
    }

    // doubleselect
    editWhereDoubleselect(index: number, attributeName: string, operator: DoubleselectOperatorType, key1: string, key2: string): BulkEditPageStep1 {
        this.selectWhereAttribute(index, attributeName);
        this.selectWhereOperator(index, operator);
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-mat-select-field-doubleselect-1] div`).first().click({force: true});
        cy.get(`[test-mat-select-option-field-doubleselect-1='${key1}']`).click({force: true});
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-mat-select-field-doubleselect-2] div`).first().click({force: true});
        cy.get(`[test-mat-select-option-field-doubleselect-2='${key2}']`).click({force: true});
        return this;
    }
    verifyWhereClauseDoubleselect(index: number, attributeName: string, operator: DoubleselectOperatorType, key1: string, key2: string): BulkEditPageStep1 {
        this._verifyWhereClauseAttribute(index, attributeName);
        this._verifyWhereClauseOperator(index, operator);
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-mat-select-field-doubleselect-1]`)
            .find(`.mat-select-value-text`)
            .should('contain.text', key1);
        cy.get(`[test-where-clause-editor='${index}']`)
            .find(`[test-mat-select-field-doubleselect-2]`)
            .find(`.mat-select-value-text`)
            .should('contain.text', key2);
        return this;
    }

    clickNext(): BulkEditPageStep2 {
        cy.get(`[test-step1-next]`)
            .click({force: true});
        return new BulkEditPageStep2();
    }
}

export class BulkEditPageStep2 {

    verifyStep(): BulkEditPageStep2 {
        cy.get(`mat-step-header[ng-reflect-index='1']`)
            .should('have.attr', 'ng-reflect-selected', 'true');
        return this;
    }

    clickPrevious(): BulkEditPageStep1 {
        cy.get(`[test-button-step2-prev]`).click({force: true});
        return new BulkEditPageStep1();
    }
    clickNext(): BulkEditPageStep3 {
        cy.get(`[test-button-step2-next]`).click({force: true});
        return new BulkEditPageStep3();
    }

    verifyItemOldValue(itemName: string, attributeName: string, value: string[]): BulkEditPageStep2 {
        cy.wrap(value).each((e, i, a) => {
            cy.get(`[test-bulk-edit-review-table]`)
                .find(`[test-table-row-item='${itemName}']`)
                .find(`[test-table-column-old-value='${attributeName}']`)
                .should('contain.text', value[i]);
        });
        return this;
    }

    verifyItemNewValue(itemName: string, attributeName: string, value: string[]): BulkEditPageStep2 {
        cy.wrap(value).each((e, i, a) => {
            cy.get(`[test-bulk-edit-review-table]`)
                .find(`[test-table-row-item='${itemName}']`)
                .find(`[test-table-column-new-value='${attributeName}']`)
                .should('contain.text', value[i]);
        });
        return this;
    }

    verifyItemWhereCause(itemName: string, attributeName: string, value: string[]): BulkEditPageStep2 {
        cy.wrap(value).each((e, i, a) => {
            cy.get(`[test-bulk-edit-review-table]`)
                .find(`[test-table-row-item='${itemName}']`)
                .find(`[test-table-column-when='${attributeName}']`)
                .should('contain.text', value[i]);
        });
        return this;
    }
}

export class BulkEditPageStep3 {

    verifyStep(): BulkEditPageStep3 {
        cy.get(`mat-step-header[ng-reflect-index='2']`)
            .should('have.attr', 'ng-reflect-selected', 'true');
        return this;
    }

    clickDone(): BulkEditPage {
        cy.get(`[test-button-step3-done]`).click({force: true});
        return new BulkEditPage();
    }

    verifyJobDone(): BulkEditPageStep3 {
        cy.get(`[test-info-job-progress`).should('exist');
        return this;
    }
}
