const Controller = require('egg').Controller;

class GetController extends Controller {
  async getList() {

    const ctx = this.ctx;
    // const data = await ctx.service.getList.getData();
    const data = ctx.model.PriceModel.find({});
    console.log(data, 'data')
    // 直接返回数据
    ctx.body = {
      code: 200,
      message: '',
      data: data
    }
  }
}

module.exports = GetController;
