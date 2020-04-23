const Service = require('egg').Service;

async function example4(browser) {

    const page = await browser.newPage();
    await page.goto('https://www.jd.com/')
    
    await page.waitFor(1*1000);

    const inputEle = await page.$('#search input');
    await inputEle.type('macbook pro 13.3 256G');

    const btnEle = await page.$('#search button');
    await btnEle.click();

    await page.waitFor(2*1000)

    const list = await page.evaluate(() => {
        let arr = []
        let itemList = document.querySelectorAll('.gl-warp li .gl-i-wrap')
        for (let item of itemList) {
            const price = item.querySelector('.p-price i').innerHTML
            const name = item.querySelector('.p-name a em').innerText
            let temp = {
                name,
                price,
            }
            arr.push(temp)
        }
        return arr
    })
    return list
}

class PriceService extends Service {
  async jdData() {
    const browser = await this.app.getBrowserInstance()
    const newsList = await example4(browser)
    this.ctx.log('done')
    return newsList
  }
}

module.exports = PriceService;
