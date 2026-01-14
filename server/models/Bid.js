import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
    gigId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Gig',
    },
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    message: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'hired', 'rejected'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

const Bid = mongoose.model('Bid', bidSchema);

export default Bid;
