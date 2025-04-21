
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

type Reminder = {
  id: string;
  title: string;
  time: string;
  days: string[];
  active: boolean;
  type: 'meditation' | 'yoga' | 'medicine' | 'meal' | 'other';
  notification: boolean;
};

const defaultReminders: Reminder[] = [
  {
    id: '1',
    title: 'Morning Meditation',
    time: '07:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    active: true,
    type: 'meditation',
    notification: true
  },
  {
    id: '2',
    title: 'Take Ashwagandha',
    time: '08:30',
    days: ['Mon', 'Wed', 'Fri'],
    active: true,
    type: 'medicine',
    notification: true
  },
  {
    id: '3',
    title: 'Evening Yoga',
    time: '18:00',
    days: ['Mon', 'Tue', 'Thu', 'Sat'],
    active: true,
    type: 'yoga',
    notification: true
  }
];

const RemindersPage = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogPremiumOpen, setIsDialogPremiumOpen] = useState(false);
  const [currentReminder, setCurrentReminder] = useState<Reminder | null>(null);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  
  // Load reminders from localStorage
  useEffect(() => {
    const savedReminders = localStorage.getItem('ayurveda_reminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    } else {
      setReminders(defaultReminders);
      localStorage.setItem('ayurveda_reminders', JSON.stringify(defaultReminders));
    }
    
    // Check if user is premium (for demo purposes, always false initially)
    const userIsPremium = localStorage.getItem('ayurveda_premium_user') === 'true';
    setIsPremium(userIsPremium);
  }, []);
  
  // Save reminders to localStorage when updated
  useEffect(() => {
    if (reminders.length > 0) {
      localStorage.setItem('ayurveda_reminders', JSON.stringify(reminders));
    }
  }, [reminders]);
  
  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    toast.success('Reminder deleted');
  };
  
  const handleToggleActive = (id: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id 
        ? { ...reminder, active: !reminder.active }
        : reminder
    ));
  };
  
  const handleAddReminder = () => {
    if (reminders.length >= 3 && !isPremium) {
      setIsDialogPremiumOpen(true);
      return;
    }
    
    setCurrentReminder({
      id: Date.now().toString(),
      title: '',
      time: '08:00',
      days: ['Mon', 'Wed', 'Fri'],
      active: true,
      type: 'other',
      notification: true
    });
    setIsDialogOpen(true);
  };
  
  const handleEditReminder = (reminder: Reminder) => {
    setCurrentReminder(reminder);
    setIsDialogOpen(true);
  };
  
  const handleSaveReminder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentReminder) return;
    
    if (currentReminder.title.trim() === '') {
      toast.error('Please enter a title for your reminder');
      return;
    }
    
    if (currentReminder.days.length === 0) {
      toast.error('Please select at least one day for your reminder');
      return;
    }
    
    const existingReminderIndex = reminders.findIndex(r => r.id === currentReminder.id);
    
    if (existingReminderIndex >= 0) {
      // Update existing reminder
      const updatedReminders = [...reminders];
      updatedReminders[existingReminderIndex] = currentReminder;
      setReminders(updatedReminders);
      toast.success('Reminder updated');
    } else {
      // Add new reminder
      setReminders([...reminders, currentReminder]);
      toast.success('Reminder added');
    }
    
    setIsDialogOpen(false);
    setCurrentReminder(null);
  };
  
  const handleToggleDay = (day: string) => {
    if (!currentReminder) return;
    
    const updatedDays = currentReminder.days.includes(day)
      ? currentReminder.days.filter(d => d !== day)
      : [...currentReminder.days, day];
    
    setCurrentReminder({ ...currentReminder, days: updatedDays });
  };
  
  const upgradeToPremium = () => {
    // This would normally handle payment processing
    // For demo purposes, we'll just set the premium flag
    setIsPremium(true);
    localStorage.setItem('ayurveda_premium_user', 'true');
    setIsDialogPremiumOpen(false);
    toast.success('Upgraded to premium successfully!');
  };
  
  const getIconForType = (type: Reminder['type']) => {
    switch (type) {
      case 'meditation':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13 15v4"></path>
            <path d="M11 15v4"></path>
            <path d="M12 8v7"></path>
            <path d="M8 22H16"></path>
          </svg>
        );
      case 'yoga':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="m18 22-5-4-5 4 1-6.5L4 11l6.5-.5L13 4l2.5 6.5L22 11l-5.5 4.5Z"></path>
          </svg>
        );
      case 'medicine':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="m19 14-2 2H8l-2-2"></path>
            <path d="M18 18H9v3"></path>
            <rect x="4" y="5" width="16" height="9" rx="1"></rect>
            <path d="M4 14h16"></path>
            <path d="M7 8v3"></path>
            <path d="M12 8v3"></path>
            <path d="M17 8v3"></path>
          </svg>
        );
      case 'meal':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="M7 10h10"></path>
            <path d="M7 14h10"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="M18 20V8.5a4.5 4.5 0 0 0-9 0v11.5"></path>
            <path d="M18 12h3v-2h-3"></path>
            <path d="M6 12h3v-2H6"></path>
            <path d="M9 12h6"></path>
          </svg>
        );
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8 bg-background">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-medium mb-2">Wellness Reminders</h1>
              <p className="text-muted-foreground max-w-xl">
                Schedule reminders for your daily wellness practices, medications, and routines.
              </p>
            </div>
            
            <Button 
              onClick={handleAddReminder} 
              className="bg-primary hover:bg-primary/90 mt-4 md:mt-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <line x1="12" x2="12" y1="5" y2="19"></line>
                <line x1="5" x2="19" y1="12" y2="12"></line>
              </svg>
              Add Reminder
            </Button>
          </div>
          
          {/* Premium badge for premium users */}
          {isPremium && (
            <div className="mb-6 bg-gradient-to-r from-amber-200 to-amber-100 border border-amber-300 rounded-lg p-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-700 mr-2">
                <path d="M6 17h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"></path>
                <path d="M9 9V4a2 2 0 0 1 1.459-1.929l5.027-1.258a1.869 1.869 0 0 1 2.514 1.75v3.272"></path>
                <circle cx="9" cy="9" r="2"></circle>
              </svg>
              <span className="font-medium text-amber-800">Premium Account - Unlimited Reminders</span>
            </div>
          )}
          
          {/* Reminders grid */}
          {reminders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h2 className="text-xl font-medium mb-2">No Reminders</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                You haven't set up any reminders yet. Add your first reminder to stay on track with your wellness practices.
              </p>
              <Button 
                onClick={handleAddReminder} 
                className="bg-primary hover:bg-primary/90"
              >
                Add Your First Reminder
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reminders.map(reminder => (
                <Card 
                  key={reminder.id} 
                  className={`border ${
                    reminder.active ? 'border-border/50' : 'border-border/30 bg-muted/30'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-md ${reminder.active ? 'bg-primary/10' : 'bg-muted'}`}>
                          {getIconForType(reminder.type)}
                        </div>
                        <div>
                          <h3 className={`font-medium text-lg mb-1 ${!reminder.active && 'text-muted-foreground'}`}>
                            {reminder.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {reminder.time} • {reminder.days.join(', ')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative inline-flex">
                        <button
                          className="text-muted-foreground hover:text-foreground"
                          onClick={() => handleToggleActive(reminder.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 20V10"></path>
                            <path d="M12 20V4"></path>
                            <path d="M6 20v-6"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-6">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleEditReminder(reminder)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteReminder(reminder.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* Reminder creation/edit dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-serif">{currentReminder?.id ? 'Edit Reminder' : 'Create Reminder'}</DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSaveReminder} className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={currentReminder?.title || ''} 
                    onChange={(e) => setCurrentReminder(prev => 
                      prev ? { ...prev, title: e.target.value } : null
                    )} 
                    placeholder="e.g., Morning Meditation"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input 
                      id="time" 
                      type="time" 
                      value={currentReminder?.time || '08:00'} 
                      onChange={(e) => setCurrentReminder(prev => 
                        prev ? { ...prev, time: e.target.value } : null
                      )} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Reminder Type</Label>
                    <Select 
                      value={currentReminder?.type || 'other'}
                      onValueChange={(value: Reminder['type']) => 
                        setCurrentReminder(prev => 
                          prev ? { ...prev, type: value } : null
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meditation">Meditation</SelectItem>
                        <SelectItem value="yoga">Yoga</SelectItem>
                        <SelectItem value="medicine">Medicine</SelectItem>
                        <SelectItem value="meal">Meal</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Days</Label>
                  <div className="flex flex-wrap gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <div
                        key={day}
                        className={`
                          cursor-pointer px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                          ${currentReminder?.days.includes(day) 
                            ? 'bg-primary text-white' 
                            : 'bg-secondary text-muted-foreground hover:bg-secondary/70'
                          }
                        `}
                        onClick={() => handleToggleDay(day)}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="notification" 
                    checked={currentReminder?.notification || false}
                    onCheckedChange={(checked) => 
                      setCurrentReminder(prev => 
                        prev ? { ...prev, notification: checked as boolean } : null
                      )
                    } 
                  />
                  <Label htmlFor="notification">Send notification</Label>
                </div>
                
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          
          {/* Premium upgrade dialog */}
          <Dialog open={isDialogPremiumOpen} onOpenChange={setIsDialogPremiumOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-serif">Upgrade to Premium</DialogTitle>
                <DialogDescription>
                  Get unlimited reminders and access to exclusive features.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Premium Features</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Unlimited wellness reminders
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Doctor consultations
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Personalized wellness reports
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Advanced analytics
                    </li>
                  </ul>
                </div>
                
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-bold">$9.99</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogPremiumOpen(false)}
                  className="mr-2"
                >
                  Maybe Later
                </Button>
                <Button 
                  onClick={upgradeToPremium}
                  className="bg-primary hover:bg-primary/90"
                >
                  Upgrade Now
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RemindersPage;
