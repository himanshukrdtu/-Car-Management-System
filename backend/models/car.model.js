import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 10'],
  },
  tags: {
    type: [String],
    default: [],
  },
  car_type: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  dealer: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

function arrayLimit(val) {
  return val.length <= 10;
}

export const Car = mongoose.model('Car', carSchema);



