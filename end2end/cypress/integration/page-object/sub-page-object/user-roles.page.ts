import {ActualPage} from "../actual.page";
import * as util from '../../util/util';

const PAGE_NAME = 'user-role';
export class UserRolesPage implements ActualPage<UserRolesPage> {

    validateTitle(): UserRolesPage {
        cy.get(`[test-page-title]`).should('have.attr', 'test-page-title', PAGE_NAME);
        return this;
    }

    visit(): UserRolesPage {
        cy.visit('/user-gen-layout/(role//help:user-help)');
        this.waitForReady();
        return this;
    }

    waitForReady(): UserRolesPage {
        util.waitUntilTestPageReady(PAGE_NAME);
        return this;
    }

    toggleRolePanel(roleName: string): UserRolesPage {
       cy.waitUntil(() => cy.get(`[test-expansion-panel-header='${roleName}']`)).click({force: true});
       return this;
    }

    verifyRolePanelExpanded(roleName: string, b: boolean): UserRolesPage {
        cy.get(`[test-expansion-panel-content='${roleName}'] > *`)
            .should(b ? 'be.visible' : 'not.be.visible');
        return this;
    }

    searchForAutoCompleteGroupToAddToRole(roleName: string, search: string, autoCompleteGroupName: string) {
        cy.waitUntil(() => cy.get(`[test-expansion-panel-content='${roleName}']
            [test-field-search]`))
            .clear()
            .type(search)
            .wait(5000);
        cy.waitUntil(() => cy.get(`[test-auto-complete-option='${autoCompleteGroupName}']`))
            .focus();
        cy.waitUntil(() => cy.get(`[test-auto-complete-option='${autoCompleteGroupName}']`))
            .focus()
            .click({force: true})
            // .click({force: true})
            // .click({force: true, multiple: true})
        ;
        return this;
    }

    verifyGroupInRole(roleName: string, groupName: string) {
        cy.waitUntil(() => cy.get(`[test-expansion-panel-content='${roleName}']`))
            .find(`[test-table-item-group='${groupName}']`).then((n) => {
                cy.wrap(n).should('exist');
            });
        return this;
    }

    verifyGroupInRoleDeleted(roleName: string, groupName: string) {
        cy.waitUntil(() => cy.get(`[test-expansion-panel-content='${roleName}']`))
            .contains(`[test-table-item-group='${groupName}']`)
            .should('not.exist');
        return this;
    }

    clickDeleteGroupFromRoleTable(roleName: string, groupName: string) {
        cy.waitUntil(() => cy.get(`[test-expansion-panel-content='${roleName}']
            [test-icon-group-action='DELETE_${groupName}']`))
            // .find(`[test-icon-delete-group='${groupName}']`)
            .click({force: true});
        return this;
    }

    verifySuccessMessageExists() {
        util.clickOnSuccessMessageToasts();
        return this;
    }

    verifyErrorMessageExists(): UserRolesPage {
        util.clickOnErrorMessageToasts();
        return this;
    }

    toggleSubSideNav(): UserRolesPage {
        return this;
    }
}
