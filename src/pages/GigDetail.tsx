import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Layout from '@/components/layout/Layout';
import BidCard from '@/components/gigs/BidCard';
import { useGigs, Gig, Bid } from '@/contexts/GigContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { DollarSign, User, Clock, ArrowLeft, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const GigDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getGigById, submitBid, hireBid, getGigBids, getUserBids } = useGigs();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [gig, setGig] = useState<Gig | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [bidMessage, setBidMessage] = useState('');
  const [bidPrice, setBidPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bidDialogOpen, setBidDialogOpen] = useState(false);

  useEffect(() => {
    const fetchGigData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const gigData = await getGigById(id);
        if (gigData) {
          setGig(gigData);

          // Define fetchBids function
          const fetchBids = async () => {
            const ownerIdStr = typeof gigData.ownerId === 'object'
              ? (gigData.ownerId as any)._id
              : gigData.ownerId;

            if (user) {
              if (user._id === ownerIdStr) {
                // User is owner: fetch all bids
                try {
                  const bidsData = await getGigBids(id);
                  setBids(bidsData);
                } catch (e) {
                  console.error("Not authorized to view bids, skipping.");
                }
              } else {
                // User is freelancer: fetch ONLY their bid for this gig
                try {
                  const myBids = await getUserBids();
                  // Filter for this specific gig
                  const myBidForThisGig = myBids.find(b => {
                    const bGigId = (typeof b.gigId === 'object' && b.gigId !== null)
                      ? (b.gigId as any)._id
                      : b.gigId;
                    return bGigId === id;
                  });

                  if (myBidForThisGig) {
                    setBids([myBidForThisGig]);
                  } else {
                    setBids([]);
                  }
                } catch (e) {
                  console.error("Error fetching user bid status", e);
                  setBids([]);
                }
              }
            }
          };

          await fetchBids();
        }
      } catch (error) {
        console.error("Failed to fetch gig details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGigData();
  }, [id, getGigById, getGigBids, user]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-16 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!gig) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <AlertCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Gig Not Found</h2>
          <p className="text-muted-foreground mb-6">The gig you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/gigs">Browse Gigs</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const ownerIdString = (typeof gig.ownerId === 'object' && gig.ownerId !== null) ? (gig.ownerId as any)._id : gig.ownerId;
  const ownerName = (typeof gig.ownerId === 'object' && gig.ownerId !== null) ? (gig.ownerId as any).name : 'Unknown';

  const isOwner = user?._id === ownerIdString;
  const hasAlreadyBid = bids.some((bid) => {
    const freelancerIdStr = typeof bid.freelancerId === 'object' ? (bid.freelancerId as any)._id : bid.freelancerId;
    return freelancerIdStr === user?._id;
  });

  const canBid = isAuthenticated && !isOwner && gig.status === 'open' && !hasAlreadyBid;

  const handleSubmitBid = async () => {
    if (!user || !bidMessage.trim() || !bidPrice) return;

    const price = parseFloat(bidPrice);
    if (isNaN(price) || price <= 0) {
      toast({
        title: 'Invalid price',
        description: 'Please enter a valid bid amount.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      // Adjusted signature: submitBid(gigId, message, amount)
      await submitBid(gig._id, bidMessage.trim(), price);
      toast({
        title: 'Bid submitted!',
        description: 'Your bid has been sent to the client.',
      });
      setBidDialogOpen(false);
      setBidMessage('');
      setBidPrice('');
      // Refresh bids intelligently
      if (user?._id === ownerIdString) {
        const updatedBids = await getGigBids(gig._id);
        setBids(updatedBids);
      } else {
        // Freelancer: re-fetch my bids
        const myBids = await getUserBids();
        const myBidForThisGig = myBids.find(b => {
          const bGigId = (typeof b.gigId === 'object' && b.gigId !== null)
            ? (b.gigId as any)._id
            : b.gigId;
          return bGigId === gig._id;
        });
        if (myBidForThisGig) setBids([myBidForThisGig]);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit bid. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleHire = async (bidId: string, freelancerName: string) => {
    try {
      await hireBid(gig._id, bidId);
      toast({
        title: 'Freelancer hired!',
        description: `You have successfully hired ${freelancerName}.`,
      });
      // Refresh gig status
      const updatedGig = await getGigById(gig._id);
      if (updatedGig) setGig(updatedGig);
      // Refresh bids
      const updatedBids = await getGigBids(gig._id);
      setBids(updatedBids);
    } catch (e) {
      // toast handled in context
    }
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Gig Details */}
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-2xl md:text-3xl font-bold">
                      {gig.title}
                    </CardTitle>
                    <Badge
                      variant={gig.status === 'open' ? 'default' : 'secondary'}
                      className="shrink-0"
                    >
                      {gig.status === 'open' ? 'Open' : 'Assigned'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {gig.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p className="font-semibold text-foreground">${gig.budget.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Posted by</p>
                        <p className="font-semibold text-foreground">{ownerName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Posted</p>
                        <p className="font-semibold text-foreground">
                          {formatDistanceToNow(new Date(gig.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bids Section */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Bids ({bids.length})
                </h2>

                {bids.length > 0 ? (
                  <div className="space-y-4">
                    {bids.map((bid, index) => {
                      const fName = typeof bid.freelancerId === 'object' ? (bid.freelancerId as any).name : 'Unknown';
                      return (
                        <BidCard
                          key={bid._id}
                          bid={bid}
                          isOwner={isOwner}
                          onHire={gig.status === 'open' ? () => handleHire(bid._id, fName) : undefined}
                          index={index}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <Card className="shadow-card">
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">No bids yet. Be the first to submit a proposal!</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!isAuthenticated ? (
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Log in to submit a bid on this gig.
                        </p>
                        <Button asChild className="w-full">
                          <Link to="/login">Log In</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full">
                          <Link to="/register">Create Account</Link>
                        </Button>
                      </div>
                    ) : isOwner ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          This is your gig
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Review the bids below and click "Hire" to select a freelancer.
                        </p>
                      </div>
                    ) : gig.status !== 'open' ? (
                      <div className="text-sm text-muted-foreground">
                        This gig has been assigned and is no longer accepting bids.
                      </div>
                    ) : hasAlreadyBid ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-primary">
                          <CheckCircle className="h-4 w-4" />
                          Bid submitted
                        </div>
                        <p className="text-sm text-muted-foreground">
                          You have already submitted a bid on this gig. Wait for the client's response.
                        </p>
                      </div>
                    ) : (
                      <Dialog open={bidDialogOpen} onOpenChange={setBidDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full">
                            <Send className="h-4 w-4 mr-2" />
                            Submit a Bid
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Submit Your Bid</DialogTitle>
                            <DialogDescription>
                              Propose your offer for "{gig.title}"
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="bidPrice">Your Bid Price ($)</Label>
                              <Input
                                id="bidPrice"
                                type="number"
                                placeholder={`Budget: $${gig.budget}`}
                                value={bidPrice}
                                onChange={(e) => setBidPrice(e.target.value)}
                                min="1"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="bidMessage">Cover Letter</Label>
                              <Textarea
                                id="bidMessage"
                                placeholder="Introduce yourself and explain why you're the best fit for this project..."
                                value={bidMessage}
                                onChange={(e) => setBidMessage(e.target.value)}
                                rows={5}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setBidDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button
                              onClick={handleSubmitBid}
                              disabled={submitting || !bidMessage.trim() || !bidPrice}
                            >
                              {submitting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                'Submit Bid'
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default GigDetail;
