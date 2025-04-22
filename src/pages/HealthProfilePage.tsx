
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { HealthProfileModal } from '@/components/ui/health-profile-modal';
import { useHealthProfile } from '@/contexts/HealthProfileContext';
import { Loader2 } from 'lucide-react';

const HealthProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { profile, isProfileComplete } = useHealthProfile();

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!user) {
      navigate('/login');
      return;
    }

    // If profile is complete, redirect to onboarding
    if (profile.profileComplete) {
      navigate('/onboarding');
    }
  }, [user, profile.profileComplete, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ayurveda-cream p-4">
      {!profile.profileComplete ? (
        <HealthProfileModal isOpen={true} onOpenChange={() => {}} />
      ) : (
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Redirecting to your personalized dashboard...</p>
        </div>
      )}
    </div>
  );
};

export default HealthProfilePage;
