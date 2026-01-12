import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gig } from '@/contexts/GigContext';
import { DollarSign, Clock, User, MessageSquare, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface GigCardProps {
  gig: Gig;
  index?: number;
}

const GigCard = ({ gig, index = 0 }: GigCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col glass border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow group overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
             <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
           </div>
        </div>

        <CardHeader className="pb-3 relative">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                {gig.category || 'General'}
              </div>
                <Badge variant={gig.status === 'open' ? 'default' : 'secondary'} className={`text-[10px] uppercase font-bold tracking-tighter ${gig.status === 'open' ? 'bg-green-500/20 text-green-500 border-green-500/20 hover:bg-green-500/30' : ''}`}>
                  {gig.status === 'open' ? 'Open' : 'Assigned'}
                </Badge>
            </div>
            <h3 className="font-display font-bold text-2xl text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              {gig.title}
            </h3>
          </div>
        </CardHeader>

        <CardContent className="flex-1 pb-6">
          <p className="text-muted-foreground text-sm line-clamp-3 mb-6 leading-relaxed">
            {gig.description}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-muted-foreground leading-none mb-1">Budget</div>
                <div className="text-sm font-bold text-foreground">${gig.budget.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-muted-foreground leading-none mb-1">Bids</div>
                <div className="text-sm font-bold text-foreground">{gig.bids.length} Active</div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0 border-t border-border/50 mt-auto">
          <div className="flex items-center justify-between w-full pt-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold border border-border">
                {gig.ownerName.charAt(0)}
              </div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                {gig.ownerName}
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase">
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(new Date(gig.createdAt), { addSuffix: false })} ago
            </div>
          </div>
        </CardFooter>
        
        <Link to={`/gigs/${gig.id}`} className="absolute inset-0 z-10" />
      </Card>
    </motion.div>
  );
};

export default GigCard;
