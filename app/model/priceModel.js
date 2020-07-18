'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('db1'); 
  const PostSchema = new Schema({
    keyWord: {
      type: String,
    },
    date: {
      type: String,
    },
    price: {
      type: Number,
    }
  });
  console.log('表price')
  return conn.model('PriceModel', PostSchema);
};
