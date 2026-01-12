import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import GigCard from '@/components/gigs/GigCard';
import { useGigs } from '@/contexts/GigContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Search, Plus, Briefcase, ArrowRight } from 'lucide-react';

const Gigs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { searchGigs } = useGigs();
  const { isAuthenticated } = useAuth();

  const CATEGORIES = [
    'All',
    'Web Development',
    'Mobile Development',
    'Design',
    'Writing',
    'Marketing',
    'Data Science',
    'Other'
  ];

  const filteredGigs = searchGigs(searchQuery, selectedCategory);

  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[150px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-blue-500/5 blur-[150px] -z-10" />

        <div className="container py-12 md:py-24 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mb-6"
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  Elite Opportunities Await
                </motion.div>
                
                <h1 className="text-6xl md:text-8xl font-black text-foreground mb-6 leading-[0.9] tracking-tighter">
                  Browse <br />
                  <span className="gradient-text">Gigs.</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                  Find your next high-impact project from {filteredGigs.length} premium opportunities curated for elite talent.
                </p>
              </div>
              
              {isAuthenticated && (
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
              )}
            </div>

            {/* Search and Categories */}
            <div className="space-y-8">
              <div className="relative max-w-2xl group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    type="text"
                    placeholder="Search premium gigs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-16 h-16 text-xl bg-background/80 backdrop-blur-xl border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-2xl shadow-sm transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {CATEGORIES.map((category, idx) => (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
                      selectedCategory === category
                        ? 'bg-primary text-white border-primary shadow-glow scale-105'
                        : 'bg-background/50 text-muted-foreground border-border hover:border-primary/50 hover:text-primary backdrop-blur-sm'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Gigs Grid */}
          {filteredGigs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGigs.map((gig, index) => (
                <GigCard key={gig.id} gig={gig} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 glass rounded-4xl border-border/50"
            >
              <Briefcase className="h-20 w-20 mx-auto mb-6 text-primary/20" />
              <h3 className="text-2xl font-bold text-foreground mb-3">No gigs found</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {searchQuery
                  ? "We couldn't find any projects matching your search. Try broadening your criteria."
                  : 'The elite talent pool is currently between projects. Check back soon for new opportunities.'}
              </p>
              {isAuthenticated && (
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link to="/gigs/new">
                    <Plus className="h-5 w-5 mr-2" />
                    Launch the First Gig
                  </Link>
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Gigs;
