import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    isVeg: {
      type: Boolean,
      required: true
    },
    spiceLevel: {
      type: String,
      enum: ['low', 'medium', 'spicy', 'very spicy'],
      default: 'medium'
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('MenuItem', menuSchema);