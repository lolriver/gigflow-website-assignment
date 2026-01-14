import express from 'express';
import { createBid, getGigBids, hireFreelancer, getMyBids } from '../controllers/bidController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/my-bids', protect, getMyBids);
router.post('/', protect, createBid);
router.get('/:gigId', protect, getGigBids);
router.patch('/:bidId/hire', protect, hireFreelancer);

export default router;
