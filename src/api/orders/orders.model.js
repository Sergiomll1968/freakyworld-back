import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 }
      }
    ],
    amount: { type: Number, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      zip: { type: String, required: true }
    },
    phone: { type: String, required: true, default: '' },
    status: { type: String, enum: ['pending', 'in process', 'finished', 'cancelled', 'failed'], default: 'pending' }
  },
  { timestamps: true }
);

const orderModel = model('Order', orderSchema);

export default orderModel;
