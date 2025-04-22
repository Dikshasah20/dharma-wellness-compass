
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useHealthProfile } from '@/contexts/HealthProfileContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface HealthProfileModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HealthProfileModal = ({ isOpen, onOpenChange }: HealthProfileModalProps) => {
  const { profile, updateProfile } = useHealthProfile();
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    height: profile.height || '',
    weight: profile.weight || '',
    age: profile.age || '',
    gender: profile.gender || 'male',
    healthConditions: profile.healthConditions || [],
    allergies: profile.allergies || ''
  });

  const steps = [
    { title: 'Personal Information', description: 'Basic health details' },
    { title: 'Health Conditions', description: 'Medical conditions and allergies' }
  ];

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep === 0) {
      // Validate Step 1
      if (!formData.height || !formData.weight) {
        toast.error('Please fill in required fields');
        return;
      }
      updateProfile({
        height: Number(formData.height),
        weight: Number(formData.weight),
        age: Number(formData.age),
        gender: formData.gender as 'male' | 'female' | 'other',
        currentStep: 1
      });
      setCurrentStep(1);
    } else {
      // Complete profile
      updateProfile({
        ...formData,
        healthConditions: formData.healthConditions,
        allergies: formData.allergies,
        profileComplete: true,
        currentStep: 2
      });
      toast.success('Health profile completed!');
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      updateProfile({ currentStep: currentStep - 1 });
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogTitle>Complete Your Health Profile</DialogTitle>
        <DialogDescription>
          Help us personalize your wellness journey with Ayurvedic practices.
        </DialogDescription>

        <Progress value={progress} className="w-full h-2 mb-6" />

        {currentStep === 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm) *</Label>
                <Input
                  id="height"
                  placeholder="175"
                  value={formData.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg) *</Label>
                <Input
                  id="weight"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                placeholder="30"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleChange('gender', value)}
                className="flex gap-4"
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
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-base">Do you have any of these conditions?</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Anxiety',
                  'Stress',
                  'Digestive Issues',
                  'Diabetes',
                  'Depression',
                  'Insomnia',
                  'Hypertension',
                  'Arthritis'
                ].map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={condition}
                      checked={formData.healthConditions.includes(condition)}
                      onCheckedChange={(checked) => {
                        const updatedConditions = checked
                          ? [...formData.healthConditions, condition]
                          : formData.healthConditions.filter((c) => c !== condition);
                        handleChange('healthConditions', updatedConditions);
                      }}
                    />
                    <Label htmlFor={condition}>{condition}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea
                id="allergies"
                placeholder="List any allergies you have..."
                value={formData.allergies}
                onChange={(e) => handleChange('allergies', e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {currentStep < steps.length - 1 ? 'Next' : 'Complete Profile'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
