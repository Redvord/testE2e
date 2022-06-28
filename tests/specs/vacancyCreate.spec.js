import { test, expect } from '@playwright/test';
import {app} from '../pages/index.js';
import {run, stop} from '../utils/browser.js';

test.describe('Регистрация работодателя',()=>{
    
    test.use({storageState: './tests/fixtures/employerState.json'});

    let page, faker, myApp;
    test.beforeEach(async()=>{
        page = await run('https://hr.saturn.rabota.space/v3_myVacancy.html?action=create');
        myApp = app(page);
        faker = myApp.faker;
    });

    test.afterAll(async()=>{
        await stop();
    });

    test('Создание вакансии', async()=>{  
        await myApp.VacancyCreation().createVacancy("Тестировщик","test","г Санкт-Петербург, ул Восстания, д 1","Санкт-Петербург","Тестировщик","Не имеет значения","полный рабочий день");
        await expect(page).toHaveURL(new RegExp("https://spb.saturn.rabota.space/v3_vacancyList.html.*"));
    });

    test('Вакансия без имени', async()=>{  
        await myApp.VacancyCreation().createVacancy("","test","г Санкт-Петербург, ул Восстания, д 1","Санкт-Петербург","Тестировщик","Не имеет значения","полный рабочий день");
        await expect(page.locator('xpath=//div[contains(text(), "Поле не заполнено. Придумайте подходящее название")]')).toBeVisible();
    });

    test('Вакансия без текста', async()=>{  
        await myApp.VacancyCreation().createVacancy("Тестировщик","","г Санкт-Петербург, ул Восстания, д 1","Санкт-Петербург","Тестировщик","Не имеет значения","полный рабочий день");
        await expect(page.locator('xpath=//div[contains(text(), "Произошла ошибка сохранения вакансии")]')).toBeVisible();
        await expect(page.locator('xpath=//div[contains(text(), "Поле не заполнено. Опишите главные особенности вакансии.")]')).toBeVisible();
    });

    test('Вакансия без указания опыта', async()=>{  
        await myApp.VacancyCreation().createVacancy("Тестировщик","test","г Санкт-Петербург, ул Восстания, д 1","Санкт-Петербург","Тестировщик","Не имеет значения","");
        await expect(page.locator('xpath=//div[contains(text(), "Выберите, пожалуйста, график")]')).toBeVisible();
    });

    test('Вакансия без профессиональной сферы', async()=>{  
        await myApp.VacancyCreation().createVacancy("Тестировщик","test","г Санкт-Петербург, ул Восстания, д 1","Санкт-Петербург","","Не имеет значения","полный рабочий день");
        await expect(page.locator('xpath=//div[contains(text(), "Выберите хотя бы одну профессиональную сферу")]')).toBeVisible();
    });

    test('Вакансия без указания опыта', async()=>{  
        await myApp.VacancyCreation().createVacancy("Тестировщик","test","г Санкт-Петербург, ул Восстания, д 1","Санкт-Петербург","Тестировщик","","полный рабочий день");
        await expect(page.locator('xpath=//div[contains(text(), "Выберите желаемый опыт кандидатов.")]')).toBeVisible();
    });
});