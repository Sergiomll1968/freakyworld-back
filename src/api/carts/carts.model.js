import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
  {
    userId: { type: String, ref: 'User', required: true, unique: true },
    products: [
      {
        productId: { type: String, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 }
      }
    ]
  },
  { timestamps: true }
);

const cartModel = model('Cart', cartSchema);

export default cartModel;
