import {LoginPage} from "../page-object/login.page";
import {PartnerPage} from "../page-object/partner.page";
import {PartnerTablePage} from "../page-object/sub-page-object/partner-table.page";


describe('partner table spec', () => {

    let partnerPage: PartnerPage;
    let partnerTablePage: PartnerTablePage;


    before(() => {
        // const username = Cypress.env('username');
        // const password = Cypress.env('password');
        // partnerPage = new LoginPage()
        //     .visit()
        //     .login(username, password)
        //     .visitPartnerPage()
        // ;
    });

    after(() => {
        // localStorage.clear();
        // sessionStorage.clear();
    });


    beforeEach(() => {
        // cy.restoreLocalStorage();
        const username = Cypress.env('username');
        const password = Cypress.env('password');
        partnerPage = new LoginPage()
            .visit()
            .login(username, password)
            .visitPartnerPage()
        ;
        partnerTablePage = partnerPage.visitPartnerTablePage();
        // cy.wait(1000);
    });

    afterEach(() => {
        // cy.saveLocalStorage();
    });

    it('should load', () => {
        partnerTablePage
            .validateTitle()
        ;
    });

    //////////////////

    it(`can expand row`, () => {

        partnerTablePage
            .selectPricingStructure(`Test View 1`, 'Pricing Structure #1')
            .expandItem(`Item-1`)
            .verifyItemVisible(`Item-1-1`)
            .verifyItemVisible(`Item-1-2`)
            .collapseItem(`Item-1`)
            .verifyItemNotVisible(`Item-1-1`)
            .verifyItemNotVisible(`Item-1-2`)
        ;
    });

    it(`can show attribute and item info side menu`, () => {
        partnerTablePage
            .selectPricingStructure(`Test View 1`, 'Pricing Structure #1')
            .clickOnShowAttributeIcon(`Item-1`)
            .verifyAttributeSideMenuVisible()
            .verifyAttributeSideMenuItemName(`Item-1`)
            .verifyAttributeSideNenuItemPrice(`1.10`)
            .verifyAttributeSideMenuAttributeValue('string attribute', ['some', 'string'])
            .clickOnShowAttributeIcon(`Item-2`)
            .verifyAttributeSideMenuVisible()
            .verifyAttributeSideMenuItemName(`Item-2`)
            .verifyAttributeSideMenuAttributeValue('string attribute', [])
        ;
    });

    it(`have the right attribute and values`, () => {
        partnerTablePage
            .selectPricingStructure(`Test View 1`,'Pricing Structure #1')
            .verifyItemName(`Item-1`, `Item-1`)
            .verifyItemPrice(`Item-1`, '$1.10')
            .verifyItemAttributeValue(`Item-1`, 'string attribute', [`some`, `string`])
            .verifyItemAttributeValue(`Item-1`, `text attribute`, [`some`, `text`])
            .verifyItemAttributeValue(`Item-2`, `string attribute`, [])
            .verifyItemAttributeValue(`Item-2`, `text attribute`, [])
    });
});