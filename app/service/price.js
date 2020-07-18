const Service = require("egg").Service;
const { format } = require("date-fns")

async function getListByKeyWord(browser, keyWord) {
  const page = await browser.newPage();
  await page.goto("https://www.jd.com/");

  await page.waitFor(1 * 1000);

  const inputEle = await page.$("#search input");
  await inputEle.type(keyWord);

  const btnEle = await page.$("#search button");
  await btnEle.click();

  await page.waitFor(2 * 1000);

  const list = await page.evaluate(() => {
    let arr = [];
    let itemList = document.querySelectorAll(".gl-warp li .gl-i-wrap");
    for (let item of itemList) {
      const price = item.querySelector(".p-price i").innerHTML;
      const name = item.querySelector(".p-name a em").innerText;
      let temp = {
        name,
        price
      };
      arr.push(temp);
    }
    return arr;
  });

  return list
}

function average (...arr) {
  const nums = [].concat(...arr);
  return nums.reduce((acc, val) => acc + val, 0) / nums.length;
};

class PriceService extends Service {
  async jdData() {
    const { keyWord } = this.config.querykeyWord;
    const browser = await this.app.getBrowserInstance();
    const newsList = await getListByKeyWord(browser, keyWord);
    this.ctx.log("done");
    const price = average(newsList.map(i => parseFloat(i.price)))
    const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    const dd = {
      keyWord,
      date,
      price
    }
    this.ctx.model.PriceModel.create(dd, () => {
      console.log('插入数据成功')
    });
    return {
      newsList,
      keyWord
    };
  }
}

module.exports = PriceService;
