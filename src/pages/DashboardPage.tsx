
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ProgressCircle } from '@/components/ui/progress-circle';
import { useAuth } from '@/contexts/AuthContext';
import { useHealthProfile } from '@/contexts/HealthProfileContext';
import { HealthProfileModal } from '@/components/ui/health-profile-modal';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const DashboardPage = () => {
  const { user } = useAuth();
  const { profile, isProfileComplete } = useHealthProfile();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    
    if (!profile.profileComplete) {
      navigate('/onboarding');
    }
  }, [user, profile, navigate]);
  
  // Handler for tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8 bg-background">
        <div className="container px-4">
          {/* User welcome and actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="font-serif text-2xl font-medium mb-1">Welcome, {user?.name || 'Arjun'}</h1>
              <p className="text-sm text-muted-foreground">Your personalized Ayurvedic wellness journey</p>
            </div>
            <Button 
              onClick={() => navigate('/consultation')} 
              className="bg-primary hover:bg-primary/90 mt-4 sm:mt-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M22 12A10 10 0 1 1 12 2a8 8 0 0 0 8 10Z"></path>
                <path d="M15 10h1a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-1c-1 0-2 .5-2 1"></path>
                <path d="M17 21.3V14"></path>
                <path d="M14 16.5v.8"></path>
              </svg>
              New Consultation
            </Button>
          </div>
          
          {/* Dashboard tabs */}
          <div className="mb-6">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="bg-background border border-border/40 rounded-md">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="daily-routine">Daily Routine</TabsTrigger>
                <TabsTrigger value="diet-plan">Diet Plan</TabsTrigger>
                <TabsTrigger value="meditation">Meditation</TabsTrigger>
                <TabsTrigger value="yoga">Yoga</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  {/* Wellness Score Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Wellness Score</CardTitle>
                      <CardDescription>Based on your profile</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <ProgressCircle value={75} size={150} strokeWidth={15} color="stroke-primary">
                        <div className="text-center">
                          <span className="text-4xl font-serif font-medium">75%</span>
                        </div>
                      </ProgressCircle>
                    </CardContent>
                    <div className="px-6 pb-6">
                      <Button variant="outline" className="w-full" onClick={() => setShowProfileModal(true)}>
                        View Details
                      </Button>
                    </div>
                  </Card>
                  
                  {/* Today's Focus Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Today's Focus</CardTitle>
                      <CardDescription>Recommended practices</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                          <span>Morning meditation (15 min)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-amber-500 mt-2"></span>
                          <span>Ginger tea before meals</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                          <span>Evening yoga sequence</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-amber-500 mt-2"></span>
                          <span>Oil massage before bath</span>
                        </li>
                      </ul>
                    </CardContent>
                    <div className="px-6 pb-6">
                      <Button variant="outline" className="w-full" onClick={() => navigate('/daily-routine')}>
                        Start Now
                      </Button>
                    </div>
                  </Card>
                  
                  {/* Upcoming Sessions Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Sessions</CardTitle>
                      <CardDescription>Your scheduled activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="border-b border-border/30 pb-4">
                          <div className="flex justify-between mb-1">
                            <p className="font-medium">Yoga with Dr. Sharma</p>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Online</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Tomorrow, 8:00 AM</p>
                        </li>
                        <li>
                          <div className="flex justify-between mb-1">
                            <p className="font-medium">Nutrition Consultation</p>
                            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">In Person</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Apr 24, 2:30 PM</p>
                        </li>
                      </ul>
                    </CardContent>
                    <div className="px-6 pb-6">
                      <Button variant="outline" className="w-full" onClick={() => navigate('/calendar')}>
                        View Calendar
                      </Button>
                    </div>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Recommended Products Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended Products</CardTitle>
                      <CardDescription>Based on your health profile</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-green-100 flex items-center justify-center">
                              <div className="w-6 h-6 rounded-full bg-green-500"></div>
                            </div>
                            <div>
                              <p className="font-medium">Ashwagandha Supplement</p>
                              <p className="text-xs text-muted-foreground">Helps reduce stress and anxiety</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">View</Button>
                        </li>
                        
                        <li className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-amber-100 flex items-center justify-center">
                              <div className="w-6 h-6 rounded-full bg-amber-500"></div>
                            </div>
                            <div>
                              <p className="font-medium">Triphala Powder</p>
                              <p className="text-xs text-muted-foreground">Supports digestive health</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">View</Button>
                        </li>
                      </ul>
                    </CardContent>
                    <div className="px-6 pb-6">
                      <Button variant="outline" className="w-full" onClick={() => navigate('/products')}>
                        Browse All Products
                      </Button>
                    </div>
                  </Card>
                  
                  {/* Progress Tracking Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Progress Tracking</CardTitle>
                      <CardDescription>Your wellness journey</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Meditation Consistency</span>
                          <span className="text-sm font-medium">85%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Diet Adherence</span>
                          <span className="text-sm font-medium">70%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Yoga Practice</span>
                          <span className="text-sm font-medium">60%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Sleep Quality</span>
                          <span className="text-sm font-medium">75%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="daily-routine">
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Your Daily Ayurvedic Routine</CardTitle>
                    <CardDescription>Follow this personalized routine based on your dosha type and health profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {/* Morning Routine */}
                      <div>
                        <h3 className="flex items-center text-lg font-medium mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Morning Routine (6:00 AM - 10:00 AM)
                        </h3>
                        <ol className="space-y-4">
                          <li className="flex">
                            <span className="mr-3 font-medium">1</span>
                            <div>
                              <p className="font-medium">Wake up before sunrise (5:30-6:00 AM)</p>
                              <p className="text-sm text-muted-foreground">Aligns your body with nature's rhythm</p>
                            </div>
                          </li>
                          <li className="flex">
                            <span className="mr-3 font-medium">2</span>
                            <div>
                              <p className="font-medium">Drink warm water with lemon</p>
                              <p className="text-sm text-muted-foreground">Stimulates digestion and cleanses the system</p>
                            </div>
                          </li>
                          <li className="flex">
                            <span className="mr-3 font-medium">3</span>
                            <div>
                              <p className="font-medium">Oil pulling with coconut oil (5 minutes)</p>
                              <p className="text-sm text-muted-foreground">Promotes oral health and detoxification</p>
                            </div>
                          </li>
                          <li className="flex">
                            <span className="mr-3 font-medium">4</span>
                            <div>
                              <p className="font-medium">Morning meditation (15 minutes)</p>
                              <p className="text-sm text-muted-foreground">Calms the mind and sets positive intentions</p>
                            </div>
                          </li>
                        </ol>
                      </div>
                      
                      {/* Midday Routine */}
                      <div>
                        <h3 className="flex items-center text-lg font-medium mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-amber-600">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Midday Routine (10:00 AM - 2:00 PM)
                        </h3>
                        <ol className="space-y-4">
                          <li className="flex">
                            <span className="mr-3 font-medium">1</span>
                            <div>
                              <p className="font-medium">Main meal of the day</p>
                              <p className="text-sm text-muted-foreground">Eat your largest meal when digestion is strongest</p>
                            </div>
                          </li>
                          <li className="flex">
                            <span className="mr-3 font-medium">2</span>
                            <div>
                              <p className="font-medium">Short walk after eating (10-15 minutes)</p>
                              <p className="text-sm text-muted-foreground">Aids digestion and prevents sluggishness</p>
                            </div>
                          </li>
                        </ol>
                      </div>
                      
                      {/* Evening Routine */}
                      <div>
                        <h3 className="flex items-center text-lg font-medium mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Evening Routine (2:00 PM - 6:00 PM)
                        </h3>
                        <ol className="space-y-4">
                          <li className="flex">
                            <span className="mr-3 font-medium">1</span>
                            <div>
                              <p className="font-medium">Herbal tea break</p>
                              <p className="text-sm text-muted-foreground">Ginger, tulsi, or chamomile based on your dosha</p>
                            </div>
                          </li>
                          <li className="flex">
                            <span className="mr-3 font-medium">2</span>
                            <div>
                              <p className="font-medium">Yoga practice (30 minutes)</p>
                              <p className="text-sm text-muted-foreground">Gentle asanas to balance your energy</p>
                            </div>
                          </li>
                        </ol>
                      </div>
                      
                      {/* Night Routine */}
                      <div>
                        <h3 className="flex items-center text-lg font-medium mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-amber-600">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Night Routine (6:00 PM - 10:00 PM)
                        </h3>
                        <ol className="space-y-4">
                          <li className="flex">
                            <span className="mr-3 font-medium">1</span>
                            <div>
                              <p className="font-medium">Light dinner before 7:00 PM</p>
                              <p className="text-sm text-muted-foreground">Easy to digest foods to promote good sleep</p>
                            </div>
                          </li>
                          <li className="flex">
                            <span className="mr-3 font-medium">2</span>
                            <div>
                              <p className="font-medium">Self-massage with warm oil (10 minutes)</p>
                              <p className="text-sm text-muted-foreground">Calms the nervous system and improves circulation</p>
                            </div>
                          </li>
                          <li className="flex">
                            <span className="mr-3 font-medium">3</span>
                            <div>
                              <p className="font-medium">Golden milk before bed</p>
                              <p className="text-sm text-muted-foreground">Turmeric milk to reduce inflammation and promote sleep</p>
                            </div>
                          </li>
                          <li className="flex">
                            <span className="mr-3 font-medium">4</span>
                            <div>
                              <p className="font-medium">Bedtime by 10:00 PM</p>
                              <p className="text-sm text-muted-foreground">Aligns with natural circadian rhythms</p>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Download Routine
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="diet-plan">
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Your Personalized Diet Plan</CardTitle>
                    <CardDescription>AI-powered nutrition recommendations based on your dosha and health needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6">Your dominant dosha is <span className="font-medium text-primary">Vata-Pitta</span>. This diet plan is designed to balance these energies and support your specific health goals.</p>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Foods to Favor</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-primary font-medium mb-2">Grains</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Basmati rice
                            </li>
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Oats
                            </li>
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Quinoa
                            </li>
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Wheat (moderate)
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-primary font-medium mb-2">Vegetables</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Sweet potatoes
                            </li>
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Carrots
                            </li>
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Zucchini
                            </li>
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Asparagus
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-primary font-medium mb-2">Spices</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Turmeric
                            </li>
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Cumin
                            </li>
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Coriander
                            </li>
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Fennel
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Foods to Limit</h3>
                      <div>
                        <h4 className="text-amber-600 font-medium mb-2">Reduce</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-amber-600">
                              <line x1="18" x2="6" y1="6" y2="18"></line>
                              <line x1="6" x2="18" y1="6" y2="18"></line>
                            </svg>
                            Raw foods
                          </li>
                          <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-amber-600">
                              <line x1="18" x2="6" y1="6" y2="18"></line>
                              <line x1="6" x2="18" y1="6" y2="18"></line>
                            </svg>
                            Caffeine
                          </li>
                          <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-amber-600">
                              <line x1="18" x2="6" y1="6" y2="18"></line>
                              <line x1="6" x2="18" y1="6" y2="18"></line>
                            </svg>
                            Processed foods
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Sample Meal Plan</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-1">Breakfast (7:00 - 8:00 AM)</h4>
                          <p className="text-muted-foreground">Warm oatmeal with stewed apples, cinnamon, and a touch of ghee</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-1">Lunch (12:00 - 1:00 PM)</h4>
                          <p className="text-muted-foreground">Basmati rice, mung dal, steamed vegetables with cumin and coriander, and a side of yogurt</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-1">Dinner (6:00 - 7:00 PM)</h4>
                          <p className="text-muted-foreground">Quinoa soup with seasonal vegetables, turmeric, and fresh herbs</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="flex-1 bg-primary hover:bg-primary/90">
                        Generate Weekly Meal Plan
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Print Diet Guidelines
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="meditation">
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Meditation Practices</CardTitle>
                    <CardDescription>Personalized meditation techniques to balance your mind and body</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6">Based on your health profile and stress levels, we've curated these meditation practices to help you find balance and inner peace.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Meditation 1 */}
                      <div className="bg-ayurveda-cream rounded-lg overflow-hidden">
                        <div className="h-48 bg-ayurveda-soft-gray relative flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-lg mb-1">Morning Breath Awareness</h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <span>15 minutes</span>
                            <span className="mx-2">•</span>
                            <span>Beginner</span>
                          </div>
                          <p className="text-sm mb-4">
                            Start your day with this gentle breath-focused meditation to calm your Vata energy and set a peaceful tone for the day.
                          </p>
                          <Button className="w-full bg-primary hover:bg-primary/90">
                            Begin Practice
                          </Button>
                        </div>
                      </div>
                      
                      {/* Meditation 2 */}
                      <div className="bg-ayurveda-cream rounded-lg overflow-hidden">
                        <div className="h-48 bg-ayurveda-soft-gray relative flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-lg mb-1">Cooling Visualization</h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <span>20 minutes</span>
                            <span className="mx-2">•</span>
                            <span>Intermediate</span>
                          </div>
                          <p className="text-sm mb-4">
                            This meditation uses cooling visualizations to balance Pitta energy and reduce stress and irritability.
                          </p>
                          <Button className="w-full bg-primary hover:bg-primary/90">
                            Begin Practice
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Recommended Schedule</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-background p-4 rounded-md border border-border/40">
                          <h4 className="font-medium mb-1">Morning Practice (15-20 minutes)</h4>
                          <p className="text-sm text-muted-foreground">Breath awareness or mantra meditation to start your day with clarity</p>
                        </div>
                        
                        <div className="bg-background p-4 rounded-md border border-border/40">
                          <h4 className="font-medium mb-1">Midday Reset (5-10 minutes)</h4>
                          <p className="text-sm text-muted-foreground">Short mindfulness practice to center yourself during the day</p>
                        </div>
                        
                        <div className="bg-background p-4 rounded-md border border-border/40">
                          <h4 className="font-medium mb-1">Evening Wind-down (15-20 minutes)</h4>
                          <p className="text-sm text-muted-foreground">Cooling visualization or body scan to prepare for restful sleep</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Meditation Progress</h3>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">This week</span>
                          <span className="text-sm">4 of 7 days</span>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                          <div className="h-10 rounded bg-primary/20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <div className="h-10 rounded bg-primary/20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <div className="h-10 rounded bg-secondary flex items-center justify-center text-sm text-muted-foreground">
                            W
                          </div>
                          <div className="h-10 rounded bg-primary/20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <div className="h-10 rounded bg-primary/20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <div className="h-10 rounded bg-secondary flex items-center justify-center text-sm text-muted-foreground">
                            S
                          </div>
                          <div className="h-10 rounded bg-secondary flex items-center justify-center text-sm text-muted-foreground">
                            S
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="flex-1 bg-primary hover:bg-primary/90">
                        Start Today's Meditation
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Browse All Practices
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="yoga">
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Yoga & Acupressure</CardTitle>
                    <CardDescription>AI-recommended practices based on your body type and health needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6">These yoga sequences and acupressure points are specifically selected to address your health concerns and balance your doshas.</p>
                    
                    <div>
                      <h3 className="text-xl font-medium mb-4">Recommended Yoga Sequence</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                        {/* Pose 1 */}
                        <div className="flex flex-col items-center">
                          <div className="w-32 h-32 rounded-full bg-ayurveda-cream flex items-center justify-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <path d="M18 22c-1.5-1.5-3-3-3-6V4a2 2 0 1 0-4 0v12c0 3-1.5 4.5-3 6"></path>
                            </svg>
                          </div>
                          <h4 className="font-medium text-center mb-1">Mountain Pose</h4>
                          <p className="text-sm text-center text-muted-foreground">Grounds energy and improves posture</p>
                        </div>
                        
                        {/* Pose 2 */}
                        <div className="flex flex-col items-center">
                          <div className="w-32 h-32 rounded-full bg-ayurveda-cream flex items-center justify-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <path d="M18 22c-1.5-1.5-3-3-3-6V4a2 2 0 1 0-4 0v12c0 3-1.5 4.5-3 6"></path>
                            </svg>
                          </div>
                          <h4 className="font-medium text-center mb-1">Cat-Cow Stretch</h4>
                          <p className="text-sm text-center text-muted-foreground">Releases tension in spine and abdomen</p>
                        </div>
                        
                        {/* Pose 3 */}
                        <div className="flex flex-col items-center">
                          <div className="w-32 h-32 rounded-full bg-ayurveda-cream flex items-center justify-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <path d="M18 22c-1.5-1.5-3-3-3-6V4a2 2 0 1 0-4 0v12c0 3-1.5 4.5-3 6"></path>
                            </svg>
                          </div>
                          <h4 className="font-medium text-center mb-1">Child's Pose</h4>
                          <p className="text-sm text-center text-muted-foreground">Calms the nervous system</p>
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <Button variant="outline">View Full Sequence</Button>
                      </div>
                      
                      <h3 className="text-xl font-medium mb-4">Acupressure Points for Your Concerns</h3>
                      
                      <div className="space-y-6 mb-8">
                        {/* Point 1 */}
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <span className="font-medium text-primary">LI4</span>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Hegu Point</h4>
                            <p className="text-sm text-muted-foreground">Located between the thumb and index finger. Press firmly for 2-3 minutes to relieve headaches and stress.</p>
                          </div>
                        </div>
                        
                        {/* Point 2 */}
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <span className="font-medium text-amber-600">CV6</span>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Sea of Energy</h4>
                            <p className="text-sm text-muted-foreground">Located two finger widths below the navel. Gently massage in circular motions to improve digestion and reduce anxiety.</p>
                          </div>
                        </div>
                        
                        {/* Point 3 */}
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <span className="font-medium text-primary">B38</span>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Vital Diaphragm</h4>
                            <p className="text-sm text-muted-foreground">Located on the back, between the shoulder blades. Apply pressure to relieve respiratory issues and back tension.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="flex-1 bg-primary hover:bg-primary/90">
                          Start Guided Practice
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Download Instructions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <HealthProfileModal isOpen={showProfileModal} onOpenChange={setShowProfileModal} />
      
      <Footer />
    </div>
  );
};

export default DashboardPage;
