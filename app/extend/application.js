const puppeteer = require("puppeteer");

const globelInfo = {
  chromeInstance: null
}

module.exports = {
  async getBrowserInstance() {
    if (globelInfo.chromeInstance) {
        console.log('使用存在chrome')
        return globelInfo.chromeInstance
    }
    const instance = await puppeteer.launch({
      executablePath: "./Chromium.app/Contents/MacOS/Chromium",
      headless: true
    });
    console.log("新建一个chrome");
    globelInfo.chromeInstance = instance
    return instance;
  }
};
