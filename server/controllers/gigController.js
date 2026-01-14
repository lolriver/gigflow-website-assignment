import Gig from '../models/Gig.js';

// @desc    Fetch all gigs
// @route   GET /api/gigs
// @access  Public
const getGigs = async (req, res) => {
    const keyword = req.query.keyword
        ? {
            title: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    // Add category filter if it exists and is not 'All'
    if (req.query.category && req.query.category !== 'All') {
        keyword.category = {
            $regex: req.query.category,
            $options: 'i',
        };
    }

    const gigs = await Gig.find({ ...keyword, status: 'open' })
        .populate('ownerId', 'name email')
        .populate('bids')
        .sort({ createdAt: -1 });

    res.json(gigs);
};

// @desc    Create a gig
// @route   POST /api/gigs
// @access  Private
const createGig = async (req, res) => {
    const { title, description, budget, category } = req.body;

    if (!title || !description || !budget || !category) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const gig = new Gig({
        title,
        description,
        budget,
        category,
        ownerId: req.user._id,
    });

    const createdGig = await gig.save();
    res.status(201).json(createdGig);
};

// @desc    Get gig by ID
// @route   GET /api/gigs/:id
// @access  Public
const getGigById = async (req, res) => {
    const gig = await Gig.findById(req.params.id)
        .populate('ownerId', 'name email')
        .populate('bids');

    if (gig) {
        res.json(gig);
    } else {
        res.status(404);
        throw new Error('Gig not found');
    }
};

export { getGigs, createGig, getGigById };
