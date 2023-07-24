import mongoose from 'mongoose';

const courseOrderSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const CourseOrder = mongoose.model('CourseOrder', courseOrderSchema);

export default CourseOrder;
