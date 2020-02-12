const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.instagram.com/'

const instagram = {
    browser: null,
    page: null,

    initialize: async () => {

        instagram.browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage'
              ]
        });

        instagram.page = await instagram.browser.newPage();

        await instagram.page.goto(BASE_URL, {waitUntil: 'networkidle2'});

    },

    login: async (username, password) => {
        await instagram.page.goto(BASE_URL, {waitUntil: 'networkidle2'});
        let loginButton = await instagram.page.$x('//a[contains(text(),"Вход")]');

        /* Click on the login url button */
        await loginButton[0].click();
        // await instagram.page.waitForNavigation({waitUntil: 'networkidle2'});
        await instagram.page.waitFor(1000);

        /*Writing the username and password*/
        await instagram.page.type('input[name="username"]', username, {delay: 50});
        await instagram.page.type('input[name="password"]', password, {delay: 50});

        /*Clicking on the login button */
        await instagram.page.waitFor(1000)
        await instagram.page.click('button[type="submit"]');

        await instagram.page.waitFor(4000)
        await instagram.page.waitFor('a > svg[aria-label="Профиль"]')

        await instagram.page.goto('https://www.instagram.com/accounts/activity')
        
        debugger
    },
    data: async()=>{
        await instagram.page.waitFor(1000)
        
        const www = await instagram.page.$$eval('.notranslate', elem => {
            const mas = []
            for(let i in elem){
                if(elem[i].tagName.toUpperCase() === 'A'){
                    mas.push(elem[i].innerText)
                }
            }
            return mas
        })
        
        return www
        
    }
}

module.exports = instagram;