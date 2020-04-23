const Controller = require('egg').Controller;

class PriceController extends Controller {
  async list() {
    const ctx = this.ctx;
    const newsList = await ctx.service.price.jdData();
    // 直接返回数据
    ctx.response.body = newsList
    // await ctx.render('news/list.tpl', { list: newsList });
  }
}

module.exports = PriceController;
