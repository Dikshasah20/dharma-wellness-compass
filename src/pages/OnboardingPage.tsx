
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useHealthProfile } from '@/contexts/HealthProfileContext';
import { HealthProfileModal } from '@/components/ui/health-profile-modal';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const OnboardingPage = () => {
  const { profile, isProfileComplete } = useHealthProfile();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Check if profile is already complete
    if (profile.profileComplete) {
      navigate('/dashboard');
      return;
    }
    
    // Show the health profile modal after a short delay for a smoother UX
    const timer = setTimeout(() => {
      setIsModalOpen(true);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [user, profile.profileComplete, navigate]);

  useEffect(() => {
    // Navigate to dashboard when profile is completed
    if (isProfileComplete) {
      toast.success('Profile completed!', {
        description: 'Your personalized wellness journey begins now.'
      });
      navigate('/dashboard');
    }
  }, [isProfileComplete, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ayurveda-cream p-4">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <h1 className="font-serif text-2xl font-medium mb-4">Preparing Your Wellness Journey</h1>
          <p className="text-muted-foreground max-w-md">
            We're setting up your personalized Ayurvedic experience. This will only take a moment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ayurveda-cream p-4">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-2xl font-medium mb-4">Complete Your Health Profile</h1>
        <p className="text-muted-foreground mb-6">
          To provide you with personalized Ayurvedic recommendations, we need to understand your unique health profile.
        </p>
        <Button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-primary hover:bg-primary/90"
        >
          Start Health Assessment
        </Button>
      </div>
      
      <HealthProfileModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default OnboardingPage;
