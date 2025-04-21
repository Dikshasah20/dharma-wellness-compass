
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Navigation links
  const navLinks = [
    { name: 'Daily Routine', href: '/daily-routine' },
    { name: 'Diet Plan', href: '/diet-plan' },
    { name: 'Meditation', href: '/meditation' },
    { name: 'Yoga', href: '/yoga' },
    { name: 'Products', href: '/products' },
  ];

  // Is the current path the homepage?
  const isHomePage = location.pathname === '/';

  return (
    <header className={cn(
      "relative w-full border-b bg-background/60 backdrop-blur-sm z-10",
      isHomePage ? "border-transparent" : "border-border/40"
    )}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ayurveda-leaf to-ayurveda-leaf/70 p-0.5">
              <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm p-0.5">
                <div className="w-full h-full rounded-full border-2 border-white/70"></div>
              </div>
            </div>
            <span className="font-serif text-xl font-medium text-foreground">Ayurveda</span>
          </Link>
        </div>

        {/* Navigation for desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {user && navLinks.map((link) => (
            <Link 
              key={link.href}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.href 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <Button 
              variant="ghost" 
              onClick={logout}
              className="text-sm font-medium"
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  className="text-sm font-medium hidden sm:flex"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  className="text-sm font-medium bg-primary hover:bg-primary/90"
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
