exports.index = function* (ctx) {
  ctx.body = yield ctx.model.PriceModel.find({});
}