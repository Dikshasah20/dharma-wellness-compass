
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type HealthProfile = {
  height?: number; // in cm
  weight?: number; // in kg
  age?: number;
  gender?: 'male' | 'female' | 'other';
  healthConditions?: string[];
  allergies?: string;
  dietaryPreferences?: string[];
  sleepHours?: number;
  stressLevel?: 'low' | 'moderate' | 'high';
  exerciseFrequency?: 'never' | 'rarely' | 'sometimes' | 'regularly' | 'daily';
  healthGoals?: string;
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
    profileComplete: false
  });
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    // Load profile from localStorage if available
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
      
      // Save to localStorage
      localStorage.setItem('ayurveda_health_profile', JSON.stringify(updatedProfile));
      
      // Check if profile is complete for onboarding purposes
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
