import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="bg-white text-black font-black w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-110">
                GF
              </div>
              <span className="text-2xl font-bold text-foreground tracking-tighter">GigFlow</span>
            </Link>
            <p className="text-muted-foreground text-base max-w-sm leading-relaxed">
              A hyper-modern freelance ecosystem built for speed, transparency, and elite talent. Connect with top-tier projects globally.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/gigs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Browse Gigs
                </Link>
              </li>
              <li>
                <Link to="/gigs/new" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Post a Gig
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Log in
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GigFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
