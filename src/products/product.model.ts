import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  sku: { type: String, required: false },
  name: { type: String, required: false },
  description: { type: String, required: false },
  price: { type: Number, required: false },
  qty: { type: Number, required: false },
  // img: {
  //   data: Buffer,
  //   contentType: String,
  // },
});

//use mongodb atlas to store
export interface Product extends mongoose.Document {
  sku: String;
  name: String;
  description: String;
  price: Number;
  qty: Number;
  // img: {
  //   data: Buffer;
  //   contentType: String;
  // };
}
