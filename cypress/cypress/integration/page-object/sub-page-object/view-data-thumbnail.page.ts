import {AbstractPage} from "../abstract.page";
import {ActualPage} from "../actual.page";

export class ViewDataThumbnailPage extends AbstractPage implements ActualPage<ViewDataThumbnailPage> {

    validateTitle(): ViewDataThumbnailPage {
        cy.get(`[test-page-title]`).should('have.attr', 'test-page-title', 'view-data-thumbnail');
        return this;
    }

    visit(): ViewDataThumbnailPage {
        cy.visit(`/view-gen-layout/(data-thumbnail//help:view-help)`);
        return this;
    }

}
