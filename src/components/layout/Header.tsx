import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Briefcase, Menu, X, User, LogOut, Plus, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { href: '/gigs', label: 'Browse Gigs' },
    { href: '/dashboard', label: 'Dashboard', protected: true },
  ];


  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl transition-all">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="GigFlow" className="w-10 h-10 rounded-xl transition-transform group-hover:scale-110" />
          <span className="text-2xl font-bold text-foreground tracking-tighter">GigFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            if (link.protected && !isAuthenticated) return null;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`text-[10px] font-bold tracking-[0.25em] transition-colors hover:text-primary ${isActive(link.href) ? 'text-primary' : 'text-muted-foreground/60'
                  }`}
              >
                {link.label.toUpperCase()}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-white/10 p-0 overflow-hidden hover:border-primary/50 transition-colors">
                  <div className="bg-primary/20 w-full h-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                    {user?.roles?.includes('freelancer') && (
                      <div className="absolute bottom-2 right-2 h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background/95 backdrop-blur-xl border-white/5" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.roles?.includes('employer') ? 'Employer' : 'Freelancer'}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/10">
                  <Link to="/dashboard" className="flex w-full items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/10">
                  <Link to="/gigs/new" className="flex w-full items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Post a Gig</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-muted-foreground/80 hover:text-foreground transition-colors">
                Log in
              </Link>
              <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 glow-primary font-bold transition-all hover:scale-105 active:scale-95 border-none">
                <Link to="/register">Join Network</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <nav className="container py-4 flex flex-col gap-4">
              {navLinks.map((link) => {
                if (link.protected && !isAuthenticated) return null;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-medium ${isActive(link.href) ? 'text-primary' : 'text-muted-foreground'
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="border-t border-border pt-4 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/gigs/new" onClick={() => setMobileMenuOpen(false)}>
                        <Plus className="h-4 w-4 mr-1" />
                        Post a Gig
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-1" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost" size="sm">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                        Log in
                      </Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
