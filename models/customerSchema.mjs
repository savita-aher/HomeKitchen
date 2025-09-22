import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "❌ Name is required"],
    trim: true,
    minlength: 2
  },
  email: {
    type: String,
    required: [true, "❌ Email is required"],
    unique: true,
    match: /.+\@.+\..+/
  },
  phone: {
    type: String,
    match: /^[0-9]{10}$/,
    required: false
  },
  address: {
    type: String,
    required: false,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Indexes for dashboard filters
customerSchema.index({ email: 1 }, { unique: true });
customerSchema.index({ createdAt: -1 });
customerSchema.index({ isActive: 1 });

export default mongoose.model("Customer", customerSchema);