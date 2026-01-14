import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bid } from '@/contexts/GigContext';
import { DollarSign, User, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface BidCardProps {
  bid: Bid;
  isOwner: boolean;
  onHire?: () => void;
  index?: number;
}

const BidCard = ({ bid, isOwner, onHire, index = 0 }: BidCardProps) => {
  // Safe access for freelancer name
  const freelancerName = typeof bid.freelancerId === 'object' ? (bid.freelancerId as any).name : 'Unknown';

  const getStatusBadge = () => {
    switch (bid.status) {
      case 'hired':
        return (
          <Badge className="bg-success text-success-foreground">
            <CheckCircle className="h-3 w-3 mr-1" />
            Hired
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className={`shadow-card ${bid.status === 'hired' ? 'border-success/50 bg-success/5' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-medium">
                  {freelancerName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{freelancerName}</h4>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(bid.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{bid.message}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="text-xl font-bold text-foreground">${bid.amount.toLocaleString()}</span>
            </div>
            {isOwner && bid.status === 'pending' && onHire && (
              <Button onClick={onHire}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Hire
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BidCard;
