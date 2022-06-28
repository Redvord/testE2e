import { Faker, faker } from '@faker-js/faker';
import MainPage from '../pages/MainPage.js';
import EmployerRegistration from './EmployerRegistration.js';
import VacancyCreation from './VacancyCreation.js';

const app = (page) => ({
    MainPage: () => new MainPage(page),
    EmployerRegistration: () => new EmployerRegistration(page),
    VacancyCreation: () => new VacancyCreation(page),
    faker: faker,
});

export {app};