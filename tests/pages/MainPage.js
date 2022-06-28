import {BasePage} from '../pages/BasePage.js'
class MainPage extends BasePage{
    constructor(page){
        super(page);
        this.loginButton = '.user-profile-header__sign-in';
        this.loginField = '[name=login]';
        this.continueButton = '.auth-main-step__button-content';
        this.passwordField = '[name=password]';
        this.registerButton = '.auth-registration-step__button-content';
    }

    async signIn(userName, password){
        await this.page.locator(this.loginButton).click();
        await this.page.locator(this.loginField).fill(userName);
        await this.page.locator(this.continueButton).click();
        await this.page.locator(this.passwordField).fill(password);
        await this.page.locator(this.registerButton).click();
    }
}

export default MainPage;