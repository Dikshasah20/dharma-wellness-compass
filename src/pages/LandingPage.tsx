
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Check } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-ayurveda-cream py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/521fce6e-c49c-46a9-9337-9e9a554d6365.png')] bg-cover bg-center opacity-10"></div>
        <div className="container relative z-10 flex flex-col items-start space-y-6 px-4 md:px-6">
          <div className="max-w-3xl space-y-4">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground leading-tight">
              Discover Your Path to Wellness Through Ancient Wisdom
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
              Personalized Ayurvedic practices for modern life, tailored to your unique body type and health needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-6 rounded-md" size="lg">
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="px-6 py-6" size="lg">
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white border-t border-border/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-semibold mb-3">Holistic Wellness Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines ancient Ayurvedic wisdom with modern technology to provide a comprehensive wellness experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-border/30">
              <div className="w-12 h-12 bg-ayurveda-green-light rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-medium mb-2">Personalized Daily Routine</h3>
              <p className="text-sm text-muted-foreground mb-4">Tailored schedules based on your dosha type</p>
              <p className="text-muted-foreground">
                Receive customized daily routines that align with your unique constitution and health goals, helping you establish balance throughout your day.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-border/30">
              <div className="w-12 h-12 bg-ayurveda-peach rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M12 20v-6"></path>
                  <path d="M16 4H8v4l4 2 4-2V4z"></path>
                  <path d="m18 14-6 2-6-2v-4l6-2 6 2v4z"></path>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-medium mb-2">AI-Powered Diet Plans</h3>
              <p className="text-sm text-muted-foreground mb-4">Nutrition recommendations for your body type</p>
              <p className="text-muted-foreground">
                Our AI analyzes your health profile to create diet plans that support your digestive health and address specific imbalances in your system.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-border/30">
              <div className="w-12 h-12 bg-ayurveda-soft-gray rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="m21.2 8-2.8-4.3a8 8 0 0 0-11 10.8"></path>
                  <path d="M7.8 21h8.4a8 8 0 0 0 6.8-12"></path>
                  <path d="M7 12l5 5"></path>
                  <path d="M12 17v.01"></path>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-medium mb-2">Yoga & Meditation</h3>
              <p className="text-sm text-muted-foreground mb-4">Practices tailored to your needs</p>
              <p className="text-muted-foreground">
                Access guided yoga sequences and meditation practices specifically designed to address your health concerns and balance your energy.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-ayurveda-cream border-t border-border/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-semibold mb-3">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how Ayurvedic practices have transformed the lives of our community members.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-border/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-ayurveda-green-light flex items-center justify-center">
                  <span className="text-primary font-medium">PS</span>
                </div>
                <div>
                  <h4 className="font-medium">Priya S.</h4>
                  <p className="text-xs text-muted-foreground">Vata-Pitta Type</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "The personalized daily routine has completely transformed my sleep quality. I feel more energized and balanced than I have in years."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-border/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-ayurveda-peach flex items-center justify-center">
                  <span className="text-primary font-medium">MT</span>
                </div>
                <div>
                  <h4 className="font-medium">Michael T.</h4>
                  <p className="text-xs text-muted-foreground">Pitta Type</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "The diet recommendations helped me identify foods that were causing inflammation. My digestion has improved dramatically in just a few weeks."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-border/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-ayurveda-soft-gray flex items-center justify-center">
                  <span className="text-primary font-medium">SK</span>
                </div>
                <div>
                  <h4 className="font-medium">Sarah K.</h4>
                  <p className="text-xs text-muted-foreground">Kapha-Vata Type</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "The meditation practices have been life-changing for my anxiety. I've learned techniques that help me stay centered throughout the day."
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="mt-6">
              Join Our Community
            </Button>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 bg-white border-t border-border/30">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="font-serif text-3xl font-semibold mb-4">Begin Your Wellness Journey Today</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Create your personalized Ayurvedic wellness plan and discover the perfect balance for your mind, body, and spirit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Create Free Account
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
