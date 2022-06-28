import { chromium } from '@playwright/test';

let browser, page, context;
async function run(url){
    browser = await chromium.launch({ headless: false, slowMo: 200 });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(url);
    return page;
};

async function stop(){
    // await page.screenshot({path:'screenshot.png'});
    await browser.close();
};

export {run, stop};