const Controller = require('egg').Controller;

class PriceController extends Controller {
  async list() {

    const ctx = this.ctx;
    const priceData = await ctx.service.price.jdData();
    // 直接返回数据
    ctx.response.body = {
      code: 200,
      message: '',
      data: priceData
    }
    // ctx.response.body = ['aa','bb']

    // await ctx.render('news/list.tpl', { list: newsList });
  }
}

module.exports = PriceController;
