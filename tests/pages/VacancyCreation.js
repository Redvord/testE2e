import {BasePage} from './BasePage.js'
class VacancyCreation extends BasePage{
    
    constructor(page){
        super(page);
        this.name = '[placeholder="Не указано"]';
        this.text = '.ql-editor';
        this.optionFullDay = 'text="полный рабочий день"';
        this.adress = '[placeholder="Россия\, Москва\, улица Генерала Дорохова\, 23к4"]';
        this.adressListElement = '.list__tile_selectable';
        this.confirmAdress = '[aria-label="Добавить адрес"]';
        this.city = 'xpath=//*[@placeholder="Выберите город"]';
        this.expirienceList = 'xpath=//span[contains(text(), "Опыт работы")]/../..//div[@role="combobox"]';
        this.profSphere = 'text="Добавить профессиональную сферу"';
        this.saveDialogButton = '.hr-dialog-actions__first-button';
        this.listOfCities = 'text="Список городов"';
        this.searchCity = '[placeholder="Поиск по региону или городу"]';
        this.allRussiaList = 'text="Выбрать всю Россию"'
        this.saveVacancy = 'text="Сохранить вакансию"';
    }

    async createVacancy(vacancy, text, adress, city, profArea, expirience, schedule){
        await this.page.locator(this.name).first().fill(vacancy);
        await this.page.locator(this.text).first().fill(text);
        // await this.addProfessionalAriaOfBuiseness("IT-компания");
        await this.chooseWorkSchedule(schedule);
        await this.addVacancyAdress(adress, city);
        await this.chooseExpirience(expirience);
        await this.chooseProfessionalAreaOfVacancy(profArea);
        await this.chooseRegionOfShow(city);
        await this.page.locator(this.saveVacancy).click();
    }   

    async chooseProfessionalAriaOfBuiseness(area){
        if (this.page.locator('xpath=//*[contains(text(),"Отрасль бизнеса")]/../..//button').isVisible({timeout:"15"})){
            await this.page.locator('xpath=//*[contains(text(),"Отрасль бизнеса")]/../..//button').click();
            await this.page.locator('xpath=//div[@class="hr-two-columns-dialog__prepend"]/../span[contains(text(),"'+ area +'")]').click();
            await this.page.locator(this.saveDialogButton).first().click();
        }
    }

    async addVacancyAdress(adress, city){
        await this.page.locator('text="Добавить новый адрес"').click();
        await this.page.locator(this.adress).click();
        await this.page.locator(this.adress).fill(adress);
        await this.page.locator('text="'+adress+'"').click();
        await this.page.locator(this.city).click();
        await this.page.locator('text="'+city+'"').click();
        await this.page.locator(this.confirmAdress).click();
    }

    async chooseProfessionalAreaOfVacancy(area){
        if(area){
            await this.page.locator(this.profSphere).last().click();
            await this.page.locator('xpath=//div[contains(@class,"dialog dialog_active hr-dialog")]//*[@placeholder="Поиск по категориям и сферам"]').fill(area);
            await this.page.locator('xpath=//div[@class="hr-two-columns-dialog__prepend"]/..//div/mark[contains(text(),"'+area+'")]').click();
            await this.page.locator('xpath=//div[contains(@class,"dialog dialog_active hr-dialog")]//*[contains(text(),"Сохранить")]').click();
        }
    }

    async chooseRegionOfShow(city){
        if(city){
            await this.page.locator(this.listOfCities).click();
            await this.page.locator(this.searchCity).fill(city);
            await this.page.locator('xpath=//div[@class="hr-two-columns-dialog__region"]/span/mark[contains(text(),"'+city+'")]').click();
            await this.page.locator(this.saveDialogButton).first().click();
        }
    }

    async chooseExpirience(expirience){
        if(expirience){
            await this.page.locator(this.expirienceList).click();
            await this.page.locator('xpath=//div[contains(@class,"hr-select__content menuable__content__active")]//div[contains(text(),"'+expirience+'")]').click();
        }
    }

    async chooseWorkSchedule(schedule){
        if(schedule){
            await this.page.locator('xpath=//div[@role="radio"]//span[contains(text(),"'+schedule+'")]').click();
        }
    }

}

export default VacancyCreation;