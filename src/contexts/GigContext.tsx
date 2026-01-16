import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { io, Socket } from 'socket.io-client';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';

export type GigStatus = 'open' | 'assigned';
export type BidStatus = 'pending' | 'hired' | 'rejected';

export interface Bid {
  _id: string; // MongoDB ID
  gigId: string;
  freelancerId: { _id: string; name: string; email: string } | string;
  message: string;
  amount: number; // Changed from price to match backend
  status: BidStatus;
  createdAt: string;
}

export interface Gig {
  _id: string; // MongoDB ID
  title: string;
  description: string;
  category: string; // Backend might need this if we filter by it, otherwise it's just a string
  budget: number;
  ownerId: { _id: string; name: string; email: string } | string;
  status: GigStatus;
  createdAt: string;
  bids?: Bid[]; // We might need to fetch this separately
}

interface GigContextType {
  gigs: Gig[];
  createGig: (title: string, description: string, budget: number, category: string) => Promise<void>;
  submitBid: (gigId: string, message: string, amount: number) => Promise<void>;
  hireBid: (gigId: string, bidId: string) => Promise<void>;
  getGigById: (id: string) => Promise<Gig | undefined>;
  getGigBids: (gigId: string) => Promise<Bid[]>;
  searchGigs: (query: string, category?: string) => Promise<void>;
  getUserBids: () => Promise<Bid[]>;
  isLoading: boolean;
}

const GigContext = createContext<GigContextType | undefined>(undefined);

export const GigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);

  // Initialize Socket.io
  useEffect(() => {
    // Only connect if user is logged in
    if (!user) return;

    // Use the backend URL from environment or default to local/proxy
    const socketUrl = import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL.replace('/api', '') // Remove /api suffix for socket connection
      : 'http://localhost:5000';

    const newSocket = io(socketUrl, {
      withCredentials: true
    });
    setSocket(newSocket);

    newSocket.emit('join', user._id);

    newSocket.on('notification', (data: any) => {
      toast({
        title: "Notification",
        description: data.message,
        variant: "default" // or success style
      });
      // Refresh gigs/data if needed
      fetchGigs();
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user, toast]);

  const fetchGigs = useCallback(async (query = '', category = 'All') => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/gigs?keyword=${query}&category=${category}`);
      setGigs(data);
    } catch (error) {
      console.error('Error fetching gigs:', error);
      toast({ title: "Error", description: "Failed to fetch gigs", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchGigs();
  }, [fetchGigs]);

  const createGig = useCallback(async (title: string, description: string, budget: number, category: string) => {
    try {
      await api.post('/gigs', { title, description, budget, category });
      toast({ title: "Success", description: "Gig posted successfully!" });
      fetchGigs();
    } catch (error) {
      console.error('Create gig error:', error);
      toast({ title: "Error", description: "Failed to create gig", variant: "destructive" });
      throw error;
    }
  }, [fetchGigs, toast]);

  const submitBid = useCallback(async (gigId: string, message: string, amount: number) => {
    try {
      await api.post('/bids', { gigId, message, amount });
      toast({ title: "Success", description: "Bid submitted successfully!" });
    } catch (error) {
      console.error('Submit bid error:', error);
      toast({ title: "Error", description: "Failed to submit bid", variant: "destructive" });
      throw error;
    }
  }, [toast]);

  const hireBid = useCallback(async (gigId: string, bidId: string) => {
    try {
      await api.patch(`/bids/${bidId}/hire`);
      toast({ title: "Success", description: "Freelancer hired!" });
      fetchGigs();
    } catch (error) {
      console.error('Hire error:', error);
      toast({ title: "Error", description: "Failed to hire freelancer", variant: "destructive" });
      throw error;
    }
  }, [fetchGigs, toast]);

  const getGigById = useCallback(async (id: string) => {
    try {
      // First try to find in existing state to be fast
      const foundGig = gigs.find(g => g._id === id);
      if (foundGig) return foundGig;

      // If not found (e.g. refresh), fetch from API
      const { data } = await api.get(`/gigs/${id}`);
      return data;
    } catch (error) {
      console.error('Error fetching gig by ID', error);
      return undefined;
    }
  }, [gigs]);

  const getGigBids = useCallback(async (gigId: string) => {
    try {
      const { data } = await api.get(`/bids/${gigId}`);
      return data;
    } catch (error) {
      console.error('Error fetching bids', error);
      return [];
    }
  }, []);

  const searchGigs = useCallback(async (query: string, category: string = 'All') => {
    fetchGigs(query, category);
  }, [fetchGigs]);

  const getUserBids = useCallback(async () => {
    try {
      const { data } = await api.get('/bids/my-bids');
      return data;
    } catch (error) {
      console.error('Error fetching user bids', error);
      return [];
    }
  }, []);

  return (
    <GigContext.Provider
      value={{
        gigs,
        createGig,
        submitBid,
        hireBid,
        getGigById,
        getGigBids,
        searchGigs,
        getUserBids,
        isLoading,
      }}
    >
      {children}
    </GigContext.Provider>
  );
};

export const useGigs = () => {
  const context = useContext(GigContext);
  if (!context) {
    throw new Error('useGigs must be used within a GigProvider');
  }
  return context;
};
