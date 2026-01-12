import React, { createContext, useContext, useState, ReactNode } from 'react';

export type GigStatus = 'open' | 'assigned';
export type BidStatus = 'pending' | 'hired' | 'rejected';

export interface Bid {
  id: string;
  gigId: string;
  freelancerId: string;
  freelancerName: string;
  message: string;
  price: number;
  status: BidStatus;
  createdAt: Date;
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  ownerId: string;
  ownerName: string;
  status: GigStatus;
  createdAt: Date;
  bids: Bid[];
}

interface GigContextType {
  gigs: Gig[];
  createGig: (title: string, description: string, category: string, budget: number, ownerId: string, ownerName: string) => void;
  submitBid: (gigId: string, freelancerId: string, freelancerName: string, message: string, price: number) => void;
  hireBid: (gigId: string, bidId: string) => void;
  getGigById: (id: string) => Gig | undefined;
  getUserGigs: (userId: string) => Gig[];
  getUserBids: (userId: string) => { gig: Gig; bid: Bid }[];
  searchGigs: (query: string, category?: string) => Gig[];
}

const GigContext = createContext<GigContextType | undefined>(undefined);

// Sample data for demonstration
const initialGigs: Gig[] = [
  {
    id: '1',
    title: 'Build a React Dashboard',
    description: 'Looking for an experienced React developer to build a comprehensive admin dashboard with charts, tables, and user management features. The project requires responsive design and dark mode support.',
    category: 'Web Development',
    budget: 1500,
    ownerId: 'demo-user-1',
    ownerName: 'Sarah Johnson',
    status: 'open',
    createdAt: new Date('2024-01-10'),
    bids: [
      {
        id: 'bid-1',
        gigId: '1',
        freelancerId: 'demo-freelancer-1',
        freelancerName: 'Alex Chen',
        message: 'I have 5+ years experience with React and have built multiple dashboards. I can deliver this within 2 weeks.',
        price: 1400,
        status: 'pending',
        createdAt: new Date('2024-01-11'),
      },
    ],
  },
  {
    id: '2',
    title: 'E-commerce Website Development',
    description: 'Need a full-stack developer to create an e-commerce platform with product listings, shopping cart, payment integration, and order management.',
    category: 'Web Development',
    budget: 3000,
    ownerId: 'demo-user-2',
    ownerName: 'Michael Brown',
    status: 'open',
    createdAt: new Date('2024-01-09'),
    bids: [],
  },
  {
    id: '3',
    title: 'Mobile App UI/UX Design',
    description: 'Seeking a talented UI/UX designer to create modern, user-friendly designs for a fitness tracking mobile application. Must include wireframes and high-fidelity mockups.',
    category: 'Design',
    budget: 800,
    ownerId: 'demo-user-3',
    ownerName: 'Emily Davis',
    status: 'open',
    createdAt: new Date('2024-01-08'),
    bids: [],
  },
  {
    id: '4',
    title: 'API Integration Specialist',
    description: 'Looking for a backend developer to integrate multiple third-party APIs including payment gateways, shipping providers, and CRM systems.',
    category: 'Web Development',
    budget: 1200,
    ownerId: 'demo-user-1',
    ownerName: 'Sarah Johnson',
    status: 'open',
    createdAt: new Date('2024-01-07'),
    bids: [],
  },
  {
    id: '5',
    title: 'WordPress Custom Theme',
    description: 'Need a WordPress developer to create a custom theme for a portfolio website. Should be fast, SEO-friendly, and easy to maintain.',
    category: 'Web Development',
    budget: 600,
    ownerId: 'demo-user-4',
    ownerName: 'David Wilson',
    status: 'assigned',
    createdAt: new Date('2024-01-05'),
    bids: [
      {
        id: 'bid-2',
        gigId: '5',
        freelancerId: 'demo-freelancer-2',
        freelancerName: 'Maria Garcia',
        message: 'WordPress specialist here! I can create a beautiful, fast theme.',
        price: 550,
        status: 'hired',
        createdAt: new Date('2024-01-06'),
      },
    ],
  },
];

export const GigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gigs, setGigs] = useState<Gig[]>(() => {
    const stored = localStorage.getItem('gigflow_gigs');
    return stored ? JSON.parse(stored) : initialGigs;
  });

  const saveGigs = (newGigs: Gig[]) => {
    setGigs(newGigs);
    localStorage.setItem('gigflow_gigs', JSON.stringify(newGigs));
  };

  const createGig = (title: string, description: string, category: string, budget: number, ownerId: string, ownerName: string) => {
    const newGig: Gig = {
      id: crypto.randomUUID(),
      title,
      description,
      category,
      budget,
      ownerId,
      ownerName,
      status: 'open',
      createdAt: new Date(),
      bids: [],
    };
    saveGigs([newGig, ...gigs]);
  };

  const submitBid = (gigId: string, freelancerId: string, freelancerName: string, message: string, price: number) => {
    const newBid: Bid = {
      id: crypto.randomUUID(),
      gigId,
      freelancerId,
      freelancerName,
      message,
      price,
      status: 'pending',
      createdAt: new Date(),
    };

    const updatedGigs = gigs.map((gig) =>
      gig.id === gigId ? { ...gig, bids: [...gig.bids, newBid] } : gig
    );
    saveGigs(updatedGigs);
  };

  const hireBid = (gigId: string, bidId: string) => {
    const updatedGigs = gigs.map((gig) => {
      if (gig.id !== gigId) return gig;

      const updatedBids = gig.bids.map((bid) => ({
        ...bid,
        status: bid.id === bidId ? 'hired' : 'rejected' as BidStatus,
      }));

      return {
        ...gig,
        status: 'assigned' as GigStatus,
        bids: updatedBids,
      };
    });
    saveGigs(updatedGigs);
  };

  const getGigById = (id: string) => gigs.find((gig) => gig.id === id);

  const getUserGigs = (userId: string) => gigs.filter((gig) => gig.ownerId === userId);

  const getUserBids = (userId: string) => {
    const userBids: { gig: Gig; bid: Bid }[] = [];
    gigs.forEach((gig) => {
      gig.bids.forEach((bid) => {
        if (bid.freelancerId === userId) {
          userBids.push({ gig, bid });
        }
      });
    });
    return userBids;
  };

  const searchGigs = (query: string, category?: string) => {
    let filtered = gigs.filter((gig) => gig.status === 'open');
    
    if (category && category !== 'All') {
      filtered = filtered.filter((gig) => gig.category === category);
    }
    
    if (query.trim()) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(
        (gig) =>
          gig.title.toLowerCase().includes(lowercaseQuery) ||
          gig.description.toLowerCase().includes(lowercaseQuery) ||
          gig.category.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    return filtered;
  };

  return (
    <GigContext.Provider
      value={{
        gigs,
        createGig,
        submitBid,
        hireBid,
        getGigById,
        getUserGigs,
        getUserBids,
        searchGigs,
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
