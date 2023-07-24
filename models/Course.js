import mongoose from 'mongoose';

// Define the schema for the course model
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  discountCoupon: {
    type: String,
  },
  expiryTime: {
    type: Date,
    required: true,
  },
});

// Create the Course model using the schema
const Course = mongoose.model('Course', courseSchema);

export default Course;
