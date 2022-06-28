import {BasePage} from './BasePage.js'
class EmployerRegistratiron extends BasePage{
    constructor(page){
        super(page);
        this.inn = '[placeholder="Введите ИНН"]';
        this.buisnessEntity = '.input-group__selections';
        this.optionOOO = 'text="ООО"';
        this.companyName = '[name="company_name"]';
        this.employerName = '[name="first_name"]' ;   
        this.employerSurname = '[name="last_name"]';
        this.email = '[placeholder="Введите ваш email"]';
        this.password = '[name="password"]';
        this.phone= '[placeholder="Введите телефон"]';
        this.continueButton = 'text="Продолжить"';  
    }

    async registerEmployer(inn, companyName, employerName, employerSurname, email, password, phone){
        if (inn){
            await this.page.locator(this.inn).fill(inn);
            await this.page.locator(this.buisnessEntity).click();
            await this.page.locator(this.optionOOO).click();
            await this.page.locator(this.companyName ).fill(companyName);
        }       
        await this.page.locator(this.employerName ).fill(employerName);
        await this.page.locator(this.employerSurname ).fill(employerSurname);
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.password).fill(password);
        await this.page.locator(this.phone).fill(phone);
        await this.page.locator(this.continueButton).click();
    }
}

export default EmployerRegistratiron;