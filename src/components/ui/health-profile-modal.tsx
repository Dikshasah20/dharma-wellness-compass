
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HealthProfile, useHealthProfile } from '@/contexts/HealthProfileContext';
import { X } from 'lucide-react';

interface HealthProfileModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HealthProfileModal = ({ isOpen, onOpenChange }: HealthProfileModalProps) => {
  const { profile, updateProfile } = useHealthProfile();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<HealthProfile>({
    ...profile,
    healthConditions: profile.healthConditions || [],
    dietaryPreferences: profile.dietaryPreferences || []
  });

  const steps = [
    { title: 'Personal Information', description: 'Basic health details' },
    { title: 'Health Conditions', description: 'Any medical conditions you have' },
    { title: 'Lifestyle', description: 'Diet, sleep, and exercise habits' },
    { title: 'Health Goals', description: 'What you want to achieve' }
  ];

  const handleChange = (field: keyof HealthProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleHealthCondition = (condition: string) => {
    const conditions = formData.healthConditions || [];
    if (conditions.includes(condition)) {
      handleChange('healthConditions', conditions.filter(c => c !== condition));
    } else {
      handleChange('healthConditions', [...conditions, condition]);
    }
  };

  const toggleDietaryPreference = (preference: string) => {
    const preferences = formData.dietaryPreferences || [];
    if (preferences.includes(preference)) {
      handleChange('dietaryPreferences', preferences.filter(p => p !== preference));
    } else {
      handleChange('dietaryPreferences', [...preferences, preference]);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the profile
      const updatedProfile = {
        ...formData,
        profileComplete: true,
        // Simulate dosha determination based on user's data
        dominantDosha: determineDoshaType(formData)
      };
      updateProfile(updatedProfile);
      onOpenChange(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Simple algorithm to determine dosha type based on user's health profile
  const determineDoshaType = (data: HealthProfile): HealthProfile['dominantDosha'] => {
    const types = ['vata', 'pitta', 'kapha', 'vata-pitta', 'pitta-kapha', 'vata-kapha', 'balanced'];
    // This is a simplified placeholder logic
    // In a real app, this would be based on actual Ayurvedic principles
    
    if (data.stressLevel === 'high' && (data.healthConditions || []).includes('anxiety')) {
      return 'vata';
    } else if ((data.healthConditions || []).includes('inflammation')) {
      return 'pitta';
    } else if (data.exerciseFrequency === 'rarely' || data.exerciseFrequency === 'never') {
      return 'kapha';
    } else {
      // Random selection for demo purposes
      return types[Math.floor(Math.random() * 3)] as HealthProfile['dominantDosha'];
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="p-6">
          <DialogTitle className="text-xl font-serif mb-1">Complete Your Health Profile</DialogTitle>
          <DialogDescription>
            Help us personalize your wellness journey with Ayurvedic practices.
          </DialogDescription>
          
          {/* Progress steps */}
          <div className="flex justify-between mt-6 mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-full h-1.5 rounded-full ${
                    index <= currentStep 
                      ? 'bg-primary' 
                      : 'bg-secondary'
                  }`}
                  style={{ width: `${100 / steps.length - 5}%` }}
                ></div>
              </div>
            ))}
          </div>
          
          <div>
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm) *</Label>
                    <Input 
                      id="height" 
                      type="number" 
                      placeholder="175"
                      value={formData.height || ''}
                      onChange={(e) => handleChange('height', parseInt(e.target.value))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg) *</Label>
                    <Input 
                      id="weight" 
                      type="number"
                      placeholder="70" 
                      value={formData.weight || ''}
                      onChange={(e) => handleChange('weight', parseInt(e.target.value))}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input 
                      id="age" 
                      type="number"
                      placeholder="30"
                      value={formData.age || ''}
                      onChange={(e) => handleChange('age', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup 
                      defaultValue={formData.gender}
                      onValueChange={(value) => handleChange('gender', value as 'male' | 'female' | 'other')}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Health Conditions</h3>
                  <p className="text-sm text-muted-foreground mb-4">Do you have any of these conditions?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Anxiety', 'Depression', 'Stress', 'Insomnia', 'Digestive Issues', 'Hypertension', 'Diabetes', 'Arthritis'].map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox 
                          id={condition} 
                          checked={(formData.healthConditions || []).includes(condition)}
                          onCheckedChange={() => toggleHealthCondition(condition)}
                        />
                        <Label htmlFor={condition}>{condition}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea 
                    id="allergies" 
                    placeholder="List any allergies you have..."
                    value={formData.allergies || ''}
                    onChange={(e) => handleChange('allergies', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Dietary Preferences</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Keto', 'Paleo'].map((diet) => (
                      <div key={diet} className="flex items-center space-x-2">
                        <Checkbox 
                          id={diet} 
                          checked={(formData.dietaryPreferences || []).includes(diet)}
                          onCheckedChange={() => toggleDietaryPreference(diet)}
                        />
                        <Label htmlFor={diet}>{diet}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>Sleep Hours</Label>
                    <span className="text-sm text-muted-foreground">
                      {formData.sleepHours || 7} hours
                    </span>
                  </div>
                  <Slider 
                    defaultValue={[formData.sleepHours || 7]} 
                    max={12}
                    min={3}
                    step={0.5}
                    onValueChange={(value) => handleChange('sleepHours', value[0])}
                    className="py-4"
                  />
                </div>
                
                <div>
                  <Label htmlFor="exercise">Exercise Frequency</Label>
                  <Select 
                    defaultValue={formData.exerciseFrequency || ''}
                    onValueChange={(value) => handleChange('exerciseFrequency', value as HealthProfile['exerciseFrequency'])}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="rarely">Rarely (few times a month)</SelectItem>
                      <SelectItem value="sometimes">Sometimes (once a week)</SelectItem>
                      <SelectItem value="regularly">Regularly (2-3 times a week)</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>Stress Level</Label>
                    <span className="text-sm text-muted-foreground">
                      {formData.stressLevel === 'low' ? 'Low' : 
                       formData.stressLevel === 'high' ? 'High' : 'Average'}
                    </span>
                  </div>
                  <Slider 
                    defaultValue={[
                      formData.stressLevel === 'low' ? 25 : 
                      formData.stressLevel === 'high' ? 75 : 50
                    ]} 
                    max={100}
                    step={25}
                    onValueChange={(value) => {
                      let stressLevel: 'low' | 'moderate' | 'high' = 'moderate';
                      if (value[0] <= 25) stressLevel = 'low';
                      else if (value[0] >= 75) stressLevel = 'high';
                      handleChange('stressLevel', stressLevel);
                    }}
                    className="py-4"
                  />
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="healthGoals">What are your health and wellness goals?</Label>
                  <Textarea 
                    id="healthGoals"
                    placeholder="Examples: Improve sleep quality, reduce stress, increase energy levels..."
                    value={formData.healthGoals || ''}
                    onChange={(e) => handleChange('healthGoals', e.target.value)}
                    className="mt-1 h-40"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleNext}
              disabled={currentStep === 0 && (!formData.height || !formData.weight)}
            >
              {currentStep < steps.length - 1 ? 'Next' : 'Complete Profile'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
