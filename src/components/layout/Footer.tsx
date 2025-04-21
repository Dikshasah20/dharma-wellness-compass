
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border/40 py-6 bg-background">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ayurveda-leaf to-ayurveda-leaf/70 p-0.5">
              <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm p-0.5">
                <div className="w-full h-full rounded-full border-2 border-white/70"></div>
              </div>
            </div>
            <span className="font-serif text-xl font-medium text-foreground">Ayurveda</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            Personalized Ayurvedic wellness solutions for modern life, balancing ancient wisdom with technology.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-sm">Resources</h3>
            <div className="flex flex-col gap-1.5">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About Ayurveda
              </Link>
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Wellness Blog
              </Link>
              <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                FAQs
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-sm">Legal</h3>
            <div className="flex flex-col gap-1.5">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-sm">Join Our Community</h3>
          <p className="text-sm text-muted-foreground">
            Subscribe to receive our monthly newsletter with wellness tips and special offers.
          </p>
          <div className="flex mt-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 bg-background border border-border rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button className="bg-primary text-white px-3 py-2 rounded-r-md text-sm hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mt-8 pt-4 border-t border-border/40">
        <p className="text-xs text-center text-muted-foreground">
          © 2025 Ayurveda Wellness. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
