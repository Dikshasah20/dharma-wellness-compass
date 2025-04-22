
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type HealthProfile = {
  // Personal Information (Step 1)
  height?: number;
  weight?: number;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  
  // Health Conditions (Step 2)
  healthConditions?: string[];
  allergies?: string;
  
  // Health Goals (Step 3)
  goals?: string;
  
  // Lifestyle (Step 4)
  dietaryPreferences?: string[];
  sleepHours?: number;
  exerciseFrequency?: string;
  stressLevel?: number;
  
  // Profile Status
  currentStep?: number;
  profileComplete?: boolean;
  dominantDosha?: 'vata' | 'pitta' | 'kapha' | 'vata-pitta' | 'pitta-kapha' | 'vata-kapha' | 'balanced';
};

type HealthProfileContextType = {
  profile: HealthProfile;
  updateProfile: (data: Partial<HealthProfile>) => void;
  isProfileComplete: boolean;
};

const HealthProfileContext = createContext<HealthProfileContextType | undefined>(undefined);

export const HealthProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<HealthProfile>({
    currentStep: 0,
    profileComplete: false
  });
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem('ayurveda_health_profile');
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(parsedProfile);
        setIsProfileComplete(!!parsedProfile.profileComplete);
      } catch (e) {
        console.error('Error parsing stored health profile', e);
      }
    }
  }, []);

  const updateProfile = (data: Partial<HealthProfile>) => {
    setProfile(prevProfile => {
      const updatedProfile = { ...prevProfile, ...data };
      localStorage.setItem('ayurveda_health_profile', JSON.stringify(updatedProfile));
      
      if (data.profileComplete !== undefined) {
        setIsProfileComplete(data.profileComplete);
      }
      
      return updatedProfile;
    });
  };

  return (
    <HealthProfileContext.Provider value={{ profile, updateProfile, isProfileComplete }}>
      {children}
    </HealthProfileContext.Provider>
  );
};

export const useHealthProfile = () => {
  const context = useContext(HealthProfileContext);
  if (context === undefined) {
    throw new Error('useHealthProfile must be used within a HealthProfileProvider');
  }
  return context;
};
