import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import gigRoutes from './routes/gigRoutes.js';
import bidRoutes from './routes/bidRoutes.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

const io = new Server(httpServer, {
    cors: {
        origin: clientUrl,
        credentials: true
    }
});

// Make io accessible to our router
app.set('io', io);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: clientUrl,
    credentials: true
}));

// Route Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/bids', bidRoutes);

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
};

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Socket.io
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join a room based on userId for private notifications
    // Frontend should emit 'join' event with userId on connection
    socket.on('join', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
