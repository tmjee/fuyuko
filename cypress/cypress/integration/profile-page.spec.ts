import {LoginPage} from "./page-object/login.page";
import {ProfilePage} from "./page-object/profile.page";
import * as util from './util/util';


describe('profile', () => {

    let profilePage: ProfilePage;

    before(() => {
        const username = Cypress.env('username');
        const password = Cypress.env('password');
        profilePage = new LoginPage()
            .visit()
            .login(username, password)
            .visitProfilePage();
    });

    after(() => {
        localStorage.clear();
        sessionStorage.clear();
    });


    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });


    it ('should load', () => {
        profilePage
            .visit()
            .validateTitle();
    });

    it ('should change avatar 01', () => {
        profilePage
            .changePredefinedAvatar('avatar-01.png')
            .validateAvatarChanged('avatar-01.png');
        util.clearAllMessageToasts();
    });

    it ('should change avatar 02', () => {
        profilePage
            .changePredefinedAvatar('avatar-02.png')
            .validateAvatarChanged('avatar-02.png');
        util.clearAllMessageToasts();
    });

    it ('should chnage avatar 03', () => {
        profilePage
            .changePredefinedAvatar('avatar-03.png')
            .validateAvatarChanged('avatar-03.png');
        util.clearAllMessageToasts();
    });

    it ('should chnage avatar 04', () => {
        profilePage
            .changePredefinedAvatar('avatar-04.png')
            .validateAvatarChanged('avatar-04.png');
        util.clearAllMessageToasts();
    });

    it ('should chnage avatar 05', () => {
        profilePage
            .changePredefinedAvatar('avatar-05.png')
            .validateAvatarChanged('avatar-05.png');
        util.clearAllMessageToasts();
    });

    it ('should chnage avatar 06', () => {
        profilePage
            .changePredefinedAvatar('avatar-06.png')
            .validateAvatarChanged('avatar-06.png');
        util.clearAllMessageToasts();
    });

    it ('should chnage avatar 07', () => {
        profilePage
            .changePredefinedAvatar('avatar-07.png')
            .validateAvatarChanged('avatar-07.png');
        util.clearAllMessageToasts();
    });

    it ('should chnage avatar 08', () => {
        profilePage
            .changePredefinedAvatar('avatar-08.png')
            .validateAvatarChanged('avatar-08.png');
        util.clearAllMessageToasts();
    });

    it ('should chnage avatar 09', () => {
        profilePage
            .changePredefinedAvatar('avatar-09.png')
            .validateAvatarChanged('avatar-09.png');
        util.clearAllMessageToasts();
    });

    it ('should toggle side nav', () => {
       util.toggleSideNav(() => {
           util.validateSideNavStateOpen(false);
       });
        util.toggleSideNav(() => {
            util.validateSideNavStateOpen(true);
        })
    });

    it ('should toggle help nav', () => {
        util.toggleHelpSideNav(() => {
            util.validateHelpNavStateOpen(true);
        });
        util.toggleHelpSideNav(() => {
            util.validateHelpNavStateOpen(false);
        });
    });

    it ('should change profile details', () => {
        const firstName = `firstName-${Math.random().toFixed(5)}`;
        const lastName = `lastName-${Math.random().toFixed(5)}`;
        const email = `email-${Math.random().toFixed(5)}@test-xxx.com`;
        profilePage
            .changeProfileDetails(firstName, lastName, email)
            .validateProfileChanged(firstName, lastName, email)
        ;
    });

    it ('should change password', () => {
        profilePage.changePassword('test', 'xxxx')
            .getPasswordSubmitButton().should('be.disabled');

        profilePage.changePassword('test', 'test')
            .getPasswordSubmitButton().should('not.be.disabled')
            .click();
        util.clickOnSuccessMessageToasts(() => {});
    });

    it('should change to theme-deeppurple-amber-dark', () => {
        const cssClassName  = 'theme-deeppurple-amber-dark';
        profilePage
            .changeTheme(cssClassName)
            .validateThemeChanged(cssClassName);

    });

    it ('should change to theme-deeppurple-amber-light', () => {
        const cssClassName  = 'theme-deeppurple-amber-light';
        profilePage
            .changeTheme(cssClassName)
            .validateThemeChanged(cssClassName);
    });

    it ('should change to theme-indigo-pink-light', () => {
        const cssClassName  = 'theme-indigo-pink-light';
        profilePage
            .changeTheme(cssClassName)
            .validateThemeChanged(cssClassName);
    });

    it ('should change to theme-indigo-pink-dark', () => {
        const cssClassName  = 'theme-indigo-pink-dark';
        profilePage
            .changeTheme(cssClassName)
            .validateThemeChanged(cssClassName);
    });

    it ('should change to theme-pink-bluegrey-light', () => {
        const cssClassName  = 'theme-pink-bluegrey-light';
        profilePage
            .changeTheme(cssClassName)
            .validateThemeChanged(cssClassName);
    });

    it ('should change to theme-pink-bluegrey-dark', () => {
        const cssClassName  = 'theme-pink-bluegrey-dark';
        profilePage
            .changeTheme(cssClassName)
            .validateThemeChanged(cssClassName);
    });

    it ('should change to theme-purple-green-light', () => {
        const cssClassName  = 'theme-purple-green-light';
        profilePage
            .changeTheme(cssClassName)
            .validateThemeChanged(cssClassName);
    });

    it ('should change to theme-purple-green-dark', () => {
        const cssClassName  = 'theme-purple-green-dark';
        profilePage
            .changeTheme(cssClassName)
            .validateThemeChanged(cssClassName);

    });

    it ('should change to theme-indigo-lightblue-light', () => {
        const cssClassName  = 'theme-indigo-lightblue-light';
        profilePage
            .changeTheme(cssClassName)
            .validateThemeChanged(cssClassName);
    });

    it ('should change to theme-indigo-lightblue-dark', () => {
        const cssClassName = 'theme-indigo-lightblue-dark';
        profilePage
            .changeTheme(cssClassName)
            .validateThemeChanged(cssClassName);
    });
});