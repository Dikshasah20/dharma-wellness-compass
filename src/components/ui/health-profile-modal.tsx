
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    allergies: profile.allergies || '',
    goals: profile.goals || '',
    dietaryPreferences: profile.dietaryPreferences || [],
    sleepHours: profile.sleepHours || 7,
    exerciseFrequency: profile.exerciseFrequency || 'moderate',
    stressLevel: profile.stressLevel || 5
  });

  const steps = [
    { title: 'Personal Information', description: 'Basic health details' },
    { title: 'Health Conditions', description: 'Medical conditions and allergies' },
    { title: 'Health Goals', description: 'Your wellness objectives' },
    { title: 'Lifestyle', description: 'Daily habits and preferences' }
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
        age: formData.age ? Number(formData.age) : undefined,
        gender: formData.gender as 'male' | 'female' | 'other',
        currentStep: 1
      });
      setCurrentStep(1);
    } else if (currentStep === 1) {
      updateProfile({
        healthConditions: formData.healthConditions,
        allergies: formData.allergies,
        currentStep: 2
      });
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.goals) {
        toast.error('Please describe your health goals');
        return;
      }
      updateProfile({
        goals: formData.goals,
        currentStep: 3
      });
      setCurrentStep(3);
    } else {
      // Complete profile
      updateProfile({
        dietaryPreferences: formData.dietaryPreferences,
        sleepHours: formData.sleepHours,
        exerciseFrequency: formData.exerciseFrequency,
        stressLevel: formData.stressLevel,
        profileComplete: true,
        currentStep: 4
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

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
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
        );

      case 1:
        return (
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
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goals">What are your health and wellness goals?</Label>
              <Textarea
                id="goals"
                placeholder="Describe your health goals and what you hope to achieve..."
                value={formData.goals}
                onChange={(e) => handleChange('goals', e.target.value)}
                className="min-h-[150px]"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Dietary Preferences</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Vegetarian',
                  'Vegan',
                  'Gluten-free',
                  'Dairy-free',
                  'Keto',
                  'Paleo'
                ].map((diet) => (
                  <div key={diet} className="flex items-center space-x-2">
                    <Checkbox
                      id={diet}
                      checked={formData.dietaryPreferences.includes(diet)}
                      onCheckedChange={(checked) => {
                        const updatedDiets = checked
                          ? [...formData.dietaryPreferences, diet]
                          : formData.dietaryPreferences.filter((d) => d !== diet);
                        handleChange('dietaryPreferences', updatedDiets);
                      }}
                    />
                    <Label htmlFor={diet}>{diet}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Sleep Hours</Label>
                <span className="text-sm text-muted-foreground">{formData.sleepHours} hours</span>
              </div>
              <Slider
                value={[formData.sleepHours]}
                min={4}
                max={12}
                step={0.5}
                onValueChange={([value]) => handleChange('sleepHours', value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exerciseFrequency">Exercise Frequency</Label>
              <Select
                value={formData.exerciseFrequency}
                onValueChange={(value) => handleChange('exerciseFrequency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Light (1-2 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (3-4 days/week)</SelectItem>
                  <SelectItem value="active">Active (5-7 days/week)</SelectItem>
                  <SelectItem value="very-active">Very Active (2x daily)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Stress Level</Label>
                <span className="text-sm text-muted-foreground">
                  {formData.stressLevel === 1 ? 'Very Low' :
                    formData.stressLevel === 3 ? 'Low' :
                    formData.stressLevel === 5 ? 'Moderate' :
                    formData.stressLevel === 7 ? 'High' :
                    formData.stressLevel === 9 ? 'Very High' : ''}
                </span>
              </div>
              <Slider
                value={[formData.stressLevel]}
                min={1}
                max={9}
                step={2}
                onValueChange={([value]) => handleChange('stressLevel', value)}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogTitle>Complete Your Health Profile</DialogTitle>
        <DialogDescription>
          Help us personalize your wellness journey with Ayurvedic practices.
        </DialogDescription>

        <Progress value={progress} className="w-full h-2 mb-6" />

        {renderStep()}

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
