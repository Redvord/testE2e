import { test, expect } from '@playwright/test';
import {app} from '../pages/index.js';
import {run, stop} from '../utils/browser.js';

test.describe('Регистрация соискателя',()=>{
    
    let page, faker, myApp;
    test.beforeEach(async()=>{
       console.log(test);
       page = await run('https://spb.saturn.rabota.space/');
       myApp = app(page);
       faker = myApp.faker;
    });

    test.afterEach(async()=>{
        await stop();
    });

    test('test', async()=>{
        const userName = faker.internet.email(undefined,undefined,'mail.ru');
        const password = faker.internet.password(15,false,undefined,'!');
        await myApp.MainPage().signIn(userName,password);
        await expect(page).toHaveURL('https://spb.saturn.rabota.space/my-resume/create/?redirectTo=%2F');
    });
});