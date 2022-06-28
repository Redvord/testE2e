class BasePage{
    constructor(page){
        this.page = page;
    }

    async getUrl(){
        return await this.page.url();
    }
}

export {BasePage};