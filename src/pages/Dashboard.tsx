import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import { useGigs, Gig, Bid } from '@/contexts/GigContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Plus, Briefcase, FileText, DollarSign, Clock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Dashboard = () => {
  const { gigs, getUserBids } = useGigs();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <AlertCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Login Required</h2>
          <p className="text-muted-foreground mb-6">
            Please log in to view your dashboard.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Safe filter for My Gigs
  const myGigs = gigs.filter(g => {
    const ownerId = (typeof g.ownerId === 'object' && g.ownerId !== null) ? (g.ownerId as any)._id : g.ownerId;
    return ownerId === user._id;
  });

  const [myBids, setMyBids] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      getUserBids().then(setMyBids);
    }
  }, [user, getUserBids]);

  const stats = [
    {
      title: 'My Gigs',
      value: myGigs.length,
      icon: Briefcase,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      title: 'My Bids',
      value: myBids.length,
      icon: FileText,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Hired',
      value: myBids.filter((b) => b.status === 'hired').length,
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      title: 'Pending',
      value: myBids.filter((b) => b.status === 'pending').length,
      icon: Clock,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
  ];

  const getBidStatusBadge = (status: Bid['status']) => {
    switch (status) {
      case 'hired':
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30 font-bold uppercase tracking-wider text-[10px]">Hired</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="font-bold uppercase tracking-wider text-[10px]">Rejected</Badge>;
      default:
        return <Badge variant="secondary" className="bg-muted/50 font-bold uppercase tracking-wider text-[10px]">Pending</Badge>;
    }
  };

  const getGigStatusBadge = (status: Gig['status']) => {
    return status === 'open' ? (
      <Badge className="bg-primary/20 text-primary border-primary/30 font-bold uppercase tracking-wider text-[10px]">Open</Badge>
    ) : (
      <Badge variant="secondary" className="bg-muted/50 font-bold uppercase tracking-wider text-[10px]">Assigned</Badge>
    );
  };

  return (
    <Layout>
      <div className="relative min-h-screen">
        <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-primary/5 blur-[150px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[30%] h-[40%] bg-blue-500/5 blur-[150px] -z-10" />

        <div className="container py-12 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mb-6"
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  Performance Overview
                </motion.div>

                <h1 className="text-6xl md:text-8xl font-black text-foreground mb-6 leading-[0.9] tracking-tighter">
                  Welcome back, <br />
                  <span className="gradient-text">{user.name.split(' ')[0]}.</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                  Monitor your active projects, track your earnings, and discover new elite opportunities.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button asChild size="lg" className="rounded-full h-16 px-10 bg-white text-black hover:bg-white/90 text-lg font-bold transition-all hover:scale-105 active:scale-95 group shadow-xl">
                  <Link to="/gigs/new">
                    Post a Gig
                    <Plus className="ml-2 h-5 w-5 transition-transform group-hover:rotate-90" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-background/80 backdrop-blur-xl border-border/50 shadow-sm hover:border-primary/30 transition-all duration-500 overflow-hidden group">
                    <CardContent className="pt-8 pb-6 relative">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <stat.icon className="h-16 w-16" />
                      </div>
                      <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-500`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-4xl font-black tracking-tighter font-display">{stat.value}</p>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Tabs defaultValue="gigs" className="space-y-12">
              <TabsList className="bg-muted/50 backdrop-blur-md p-1 rounded-2xl border border-border/50 h-auto gap-1">
                <TabsTrigger
                  value="gigs"
                  className="rounded-xl px-8 py-3 font-bold text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all"
                >
                  My Gigs <span className="ml-2 opacity-50">{myGigs.length}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="bids"
                  className="rounded-xl px-8 py-3 font-bold text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all"
                >
                  My Bids <span className="ml-2 opacity-50">{myBids.length}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="gigs" className="mt-0 focus-visible:outline-none">
                {myGigs.length > 0 ? (
                  <div className="grid gap-6">
                    {myGigs.map((gig, index) => (
                      <motion.div
                        key={gig._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="bg-background/80 backdrop-blur-xl border-border/50 hover:border-primary/30 transition-all duration-300 group overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <h3 className="font-bold text-xl text-foreground tracking-tight group-hover:text-primary transition-colors">
                                    {gig.title}
                                  </h3>
                                  {getGigStatusBadge(gig.status)}
                                </div>
                                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium">
                                  <span className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-green-500/10 text-green-500">
                                      <DollarSign className="h-4 w-4" />
                                    </div>
                                    <span className="text-foreground font-bold">${gig.budget.toLocaleString()}</span>
                                  </span>
                                  <span className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                                      <FileText className="h-4 w-4" />
                                    </div>
                                    <span className="text-foreground font-bold">{gig.bids?.length || 0}</span> bids
                                  </span>
                                  <span className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500">
                                      <Clock className="h-4 w-4" />
                                    </div>
                                    {formatDistanceToNow(new Date(gig.createdAt), { addSuffix: true })}
                                  </span>
                                </div>
                              </div>
                              <Button asChild variant="outline" className="rounded-xl border-border/50 bg-background/50 hover:bg-primary hover:text-white hover:border-primary transition-all px-6">
                                <Link to={`/gigs/${gig._id}`}>
                                  Manage Details
                                  <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <Card className="bg-background/80 backdrop-blur-xl border-border/50 border-dashed py-24">
                    <CardContent className="text-center">
                      <div className="w-20 h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                        <Briefcase className="h-10 w-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Launch your first gig</h3>
                      <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
                        The world's best talent is ready to collaborate. Post your project and start receiving elite proposals today.
                      </p>
                      <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 shadow-glow">
                        <Link to="/gigs/new">
                          <Plus className="h-5 w-5 mr-2" />
                          Post a Gig
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="bids" className="mt-0 focus-visible:outline-none">
                {myBids.length > 0 ? (
                  <div className="grid gap-6">
                    {myBids.map((bid, index) => {
                      // Handle potential null gig if gig was deleted
                      const gigTitle = (bid.gigId as any)?.title || 'Unknown Gig';
                      const gigId = (bid.gigId as any)?._id || bid.gigId;

                      return (
                        <motion.div
                          key={bid._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card className={`bg-background/80 backdrop-blur-xl border-border/50 hover:border-primary/30 transition-all duration-300 group overflow-hidden ${bid.status === 'hired' ? 'ring-1 ring-green-500/50' : ''}`}>
                            <CardContent className="p-0">
                              <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-3">
                                    <h3 className="font-bold text-xl text-foreground tracking-tight group-hover:text-primary transition-colors">
                                      {gigTitle}
                                    </h3>
                                    {getBidStatusBadge(bid.status)}
                                  </div>
                                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium">
                                    <span className="flex items-center gap-2">
                                      <div className="p-1.5 rounded-lg bg-green-500/10 text-green-500">
                                        <DollarSign className="h-4 w-4" />
                                      </div>
                                      Your bid: <span className="text-foreground font-bold">${bid.amount.toLocaleString()}</span>
                                    </span>
                                    <span className="flex items-center gap-2">
                                      <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500">
                                        <Clock className="h-4 w-4" />
                                      </div>
                                      {formatDistanceToNow(new Date(bid.createdAt), { addSuffix: true })}
                                    </span>
                                  </div>
                                  {bid.status === 'hired' && (
                                    <motion.div
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-bold flex items-center gap-2 shadow-sm"
                                    >
                                      <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                                        <CheckCircle className="h-4 w-4" />
                                      </div>
                                      Elite Project Unlocked: You've been selected for this project!
                                    </motion.div>
                                  )}
                                </div>
                                <Button asChild variant="outline" className="rounded-xl border-border/50 bg-background/50 hover:bg-primary hover:text-white hover:border-primary transition-all px-6">
                                  <Link to={`/gigs/${gigId}`}>
                                    View Opportunity
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                  </Link>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <Card className="bg-background/80 backdrop-blur-xl border-border/50 border-dashed py-24">
                    <CardContent className="text-center">
                      <div className="w-20 h-20 rounded-3xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-6">
                        <FileText className="h-10 w-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">No bids submitted</h3>
                      <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
                        Your next career-defining project is just one proposal away. Explore the marketplace and make your mark.
                      </p>
                      <Button asChild size="lg" className="rounded-full px-8 bg-blue-500 hover:bg-blue-600 shadow-xl transition-all hover:scale-105">
                        <Link to="/gigs">Browse Premium Gigs</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
