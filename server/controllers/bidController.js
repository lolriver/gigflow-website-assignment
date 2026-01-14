import Bid from '../models/Bid.js';
import Gig from '../models/Gig.js';
import mongoose from 'mongoose';

// @desc    Submit a bid
// @route   POST /api/bids
// @access  Private
const createBid = async (req, res) => {
    const { gigId, message, amount } = req.body;

    const gig = await Gig.findById(gigId);

    if (!gig) {
        res.status(404);
        throw new Error('Gig not found');
    }

    if (gig.status !== 'open') {
        res.status(400);
        throw new Error('Gig is not open for bidding');
    }

    if (gig.ownerId.toString() === req.user._id.toString()) {
        res.status(400);
        throw new Error('Owner cannot bid on their own gig');
    }

    const bid = new Bid({
        gigId,
        freelancerId: req.user._id,
        message,
        amount,
    });

    const createdBid = await bid.save();
    res.status(201).json(createdBid);
};

// @desc    Get bids for a gig
// @route   GET /api/bids/:gigId
// @access  Private (Owner only)
const getGigBids = async (req, res) => {
    const gig = await Gig.findById(req.params.gigId);

    if (!gig) {
        res.status(404);
        throw new Error('Gig not found');
    }

    if (gig.ownerId.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to view bids for this gig');
    }

    const bids = await Bid.find({ gigId: req.params.gigId })
        .populate('freelancerId', 'name email')
        .populate('gigId', 'title status')
        .sort({ createdAt: -1 });

    res.json(bids);
};

// @desc    Hire a freelancer (Transactional)
// @route   PATCH /api/bids/:bidId/hire
// @access  Private (Owner only)
const hireFreelancer = async (req, res) => {
    const { bidId } = req.params;
    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            // 1. Fetch Bid and Gig
            const bid = await Bid.findById(bidId).session(session);
            if (!bid) throw new Error('Bid not found');

            const gig = await Gig.findById(bid.gigId).session(session);
            if (!gig) throw new Error('Gig not found');

            // 2. Authorization and Validation
            if (gig.ownerId.toString() !== req.user._id.toString()) {
                res.status(401);
                throw new Error('Not authorized to hire for this gig');
            }

            if (gig.status !== 'open') {
                res.status(400);
                throw new Error('Gig is already assigned');
            }

            // 3. Update Gig status
            gig.status = 'assigned';
            await gig.save({ session });

            // 4. Update Chosen Bid Status
            bid.status = 'hired';
            await bid.save({ session });

            // 5. Reject all other bids for this gig
            await Bid.updateMany(
                { gigId: gig._id, _id: { $ne: bid._id } },
                { status: 'rejected' },
                { session }
            );

            // 6. Real-time Notification (Socket.io)
            // Note: We can't access `io` directly here easily unless passed or global.
            // For now, we will handle this outside strict transaction or use a globally accessible function.
            // We will return the result and handle socket in the response phase if possible, 
            // OR simply emit checking the global `req.app.get('io')` if we attach it.
            const io = req.app.get('io');
            if (io) {
                io.to(bid.freelancerId.toString()).emit('notification', {
                    type: 'HIRED',
                    message: `You have been hired for ${gig.title}!`,
                    gigId: gig._id
                });
            }
        });

        session.endSession();
        res.json({ message: 'Freelancer hired successfully' });

    } catch (error) {
        session.endSession();
        console.error('Transaction Aborted:', error);
        res.status(400).json({ message: error.message || 'Hiring failed' });
    }
};

// @desc    Get current user's bids
// @route   GET /api/bids/my-bids
// @access  Private
const getMyBids = async (req, res) => {
    const bids = await Bid.find({ freelancerId: req.user._id })
        .populate('gigId', 'title status ownerId')
        .populate('freelancerId', 'name email')
        .sort({ createdAt: -1 });
    res.json(bids);
};

export { createBid, getGigBids, hireFreelancer, getMyBids };
