const Service = require("egg").Service;
const { format } = require("date-fns")

class GetService extends Service {
  async getData() {
    const list = this.ctx.model.PriceModel.find({})
    console.log(list, 'list')
    return {
      list: list
    };
  }
}

module.exports = GetService;
