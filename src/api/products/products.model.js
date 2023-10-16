import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: [String] },
    size: { type: [String] },
    color: { type: [String] },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

const productModel = model('Product', productSchema);

export default productModel;
