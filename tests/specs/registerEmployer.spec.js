import { test, expect } from '@playwright/test';
import {app} from '../pages/index.js';
import {run, stop} from '../utils/browser.js';
import { generateINNUL } from '../utils/random.js';

test.describe('Регистрация работодателя',()=>{
    
    let page, faker, myApp, inn, companyName, employerName,employerSurname, email, password, phone;
    test.beforeEach(async()=>{
        page = await run('/v3_registerEmployer.html');
        myApp = app(page);
        faker = myApp.faker;
        inn = generateINNUL();
        companyName = faker.company.companyName();
        employerName = faker.name.firstName();
        employerSurname = faker.name.firstName();
        email = faker.internet.email(undefined,undefined,'mail.ru');
        password = faker.internet.password(15,false,undefined,'!');
        phone = faker.phone.number('+7999#######');
    });

    test.afterEach(async()=>{
        await stop();
    });

    test('Регистрация работодателя', async()=>{
        await myApp.EmployerRegistration().registerEmployer(inn,companyName, employerName, employerSurname, email, password, phone);
        await expect(page).toHaveURL('/v3_myVacancy.html?action=create&company_registered=true&employer_registered=true');
    });

    test('Регистрация без инн', async()=>{
        inn = ''
        await myApp.EmployerRegistration().registerEmployer(inn,companyName, employerName, employerSurname, email, password, phone);
        await expect(page.locator('xpath=//div[contains(text(), "Обязательное поле")]')).toBeVisible();
    });

    test('Регистрация без имени работодателя', async()=>{
        employerName = '';
        await myApp.EmployerRegistration().registerEmployer(inn, companyName, employerName, employerSurname, email, password, phone);
        await expect(page.locator('xpath=//div[contains(text(), "Обязательное поле")]')).toBeVisible();
    });
});