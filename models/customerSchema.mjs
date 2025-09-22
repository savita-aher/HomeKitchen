import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    pickupTime: {
      type: Date,
      required: true
    },
    numberOfItems: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { timestamps: true }
);

export default mongoose.model('Customer', customerSchema);