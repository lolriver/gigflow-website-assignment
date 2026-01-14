import mongoose from 'mongoose';

const gigSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Web Development', 'Mobile Development', 'Design', 'Writing', 'Marketing', 'Data Science', 'Other', 'All'],
        default: 'Other'
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['open', 'assigned'],
        default: 'open',
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// Reverse populate with virtuals
gigSchema.virtual('bids', {
    ref: 'Bid',
    localField: '_id',
    foreignField: 'gigId',
    justOne: false
});

const Gig = mongoose.model('Gig', gigSchema);

export default Gig;
