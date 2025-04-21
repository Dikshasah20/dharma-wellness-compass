
import { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useHealthProfile } from '@/contexts/HealthProfileContext';
import { Send } from 'lucide-react';

// Message types
type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

// Sample responses based on keywords
const botResponses: Record<string, string[]> = {
  greeting: [
    "Namaste! How can I assist you with your Ayurvedic wellness journey today?",
    "Greetings! I'm here to help with your Ayurvedic wellness questions.",
    "Hello! How may I support your path to balance and wellness?"
  ],
  dosha: [
    "Your dosha is your unique mind-body constitution in Ayurveda. The three doshas are Vata (air/space), Pitta (fire/water), and Kapha (earth/water). Each person has their own unique combination.",
    "Doshas are the three energies that define every person's makeup. Understanding your dominant dosha can help create personalized wellness plans."
  ],
  vata: [
    "Vata dosha represents the elements of air and space. People with dominant Vata tend to be creative, energetic, and quick-thinking. When imbalanced, they may experience anxiety, dry skin, and irregular digestion.",
    "For Vata balance, focus on warm, cooked foods, regular routines, and grounding practices like yoga and meditation."
  ],
  pitta: [
    "Pitta dosha embodies fire and water elements. Pitta-dominant individuals are often focused, ambitious, and have strong digestion. Imbalances can manifest as inflammation, irritability, and skin rashes.",
    "To balance Pitta, incorporate cooling foods like cucumbers and coconut, avoid overexertion, and practice cooling breath work."
  ],
  kapha: [
    "Kapha dosha represents earth and water. Kapha types are typically calm, strong, and stable. When out of balance, they may experience weight gain, congestion, and lethargy.",
    "For Kapha balance, engage in regular physical activity, enjoy warming spices like ginger and black pepper, and maintain a stimulating environment."
  ],
  meditation: [
    "Ayurvedic meditation practices include mindful breathing, mantra repetition, and focused awareness. These practices help balance the mind and body.",
    "Based on your profile, I recommend starting with 10-15 minutes of morning meditation focusing on breath awareness. This can help calm Vata and create mental stability."
  ],
  diet: [
    "Ayurvedic nutrition is personalized based on your dosha. Generally, focus on fresh, whole foods appropriate for your constitution and current imbalances.",
    "Your personalized diet plan is available in the Diet Plan section. For additional guidance, consider scheduling a consultation with our Ayurvedic practitioners."
  ],
  sleep: [
    "Ayurveda recommends going to bed before 10 PM and waking up before sunrise. This aligns with natural circadian rhythms.",
    "For better sleep, try a gentle self-massage with warm sesame oil before bathing, drink warm milk with a pinch of nutmeg, and avoid electronic devices before bed."
  ],
  herbs: [
    "Ashwagandha is excellent for reducing stress and anxiety, while Triphala supports digestion and gentle detoxification.",
    "Based on your profile, herbs like Brahmi for mental clarity and Shatavari for hormonal balance might be beneficial. Always consult with a practitioner before starting herbal supplements."
  ],
  yoga: [
    "Yoga in Ayurveda is prescribed based on your dosha. Gentle, grounding poses are good for Vata, cooling and moderate practices for Pitta, and more vigorous sequences for Kapha.",
    "Check out our personalized yoga recommendations in the Yoga section of your dashboard."
  ],
  stress: [
    "Ayurveda offers many approaches to stress management including meditation, specific breathing techniques (pranayama), adaptogenic herbs, and daily routine adjustments.",
    "Based on your profile, I recommend trying the 'Cooling Visualization' meditation and incorporating Ashwagandha into your routine for stress relief."
  ],
  digestion: [
    "In Ayurveda, strong digestion (Agni) is fundamental to health. Consider eating your main meal at midday when digestion is strongest.",
    "For digestive support, try ginger tea before meals, chew your food thoroughly, and avoid ice-cold beverages which can dampen the digestive fire."
  ],
  default: [
    "I'm here to help with your Ayurvedic wellness journey. Feel free to ask about doshas, diet recommendations, herbs, yoga, or lifestyle practices.",
    "I don't have information on that specific topic yet. Would you like to know about Ayurvedic approaches to diet, stress management, sleep, or balancing your dosha?",
    "That's beyond my current knowledge base. Try asking about Ayurvedic principles, practices, or personalized recommendations based on your health profile."
  ]
};

const findBotResponse = (message: string): string => {
  message = message.toLowerCase();
  
  if (/hello|hi|hey|greetings|namaste/i.test(message)) {
    return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
  } else if (/what.*dosha|dosha.*mean|dosha.*are/i.test(message)) {
    return botResponses.dosha[Math.floor(Math.random() * botResponses.dosha.length)];
  } else if (/vata/i.test(message)) {
    return botResponses.vata[Math.floor(Math.random() * botResponses.vata.length)];
  } else if (/pitta/i.test(message)) {
    return botResponses.pitta[Math.floor(Math.random() * botResponses.pitta.length)];
  } else if (/kapha/i.test(message)) {
    return botResponses.kapha[Math.floor(Math.random() * botResponses.kapha.length)];
  } else if (/meditat|breath|mindful/i.test(message)) {
    return botResponses.meditation[Math.floor(Math.random() * botResponses.meditation.length)];
  } else if (/food|diet|eat|nutrition/i.test(message)) {
    return botResponses.diet[Math.floor(Math.random() * botResponses.diet.length)];
  } else if (/sleep|rest|insomnia|night|bed/i.test(message)) {
    return botResponses.sleep[Math.floor(Math.random() * botResponses.sleep.length)];
  } else if (/herb|supplement|ashwagandha|triphala/i.test(message)) {
    return botResponses.herbs[Math.floor(Math.random() * botResponses.herbs.length)];
  } else if (/yoga|pose|asana|stretch/i.test(message)) {
    return botResponses.yoga[Math.floor(Math.random() * botResponses.yoga.length)];
  } else if (/stress|anxiety|worry|tension/i.test(message)) {
    return botResponses.stress[Math.floor(Math.random() * botResponses.stress.length)];
  } else if (/digest|stomach|gut|bowel|intestine/i.test(message)) {
    return botResponses.digestion[Math.floor(Math.random() * botResponses.digestion.length)];
  } else {
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  }
};

const ChatbotPage = () => {
  const { user } = useAuth();
  const { profile } = useHealthProfile();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Namaste${user?.name ? ' ' + user.name : ''}! I'm your Ayurvedic wellness assistant. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate typing delay before bot responds
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: findBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8 bg-ayurveda-cream">
        <div className="container px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="font-serif text-2xl sm:text-3xl font-medium mb-2">Ayurvedic Wellness Assistant</h1>
            <p className="text-muted-foreground">
              Ask questions about Ayurvedic practices, get personalized wellness tips, or learn more about your dosha.
            </p>
          </div>
          
          <Card className="bg-white border border-border/30 overflow-hidden">
            {/* Chat messages area */}
            <div className="h-[500px] overflow-y-auto p-4 md:p-6">
              <div className="space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.sender === 'user' 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100'
                      }`}
                    >
                      <p>{message.content}</p>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Input area */}
            <div className="p-4 border-t border-border/30 bg-white">
              <form 
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90"
                  disabled={inputValue.trim() === ''}
                >
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </Card>
          
          <div className="mt-6 text-sm text-muted-foreground text-center">
            <p>For more personalized advice, consider booking a consultation with one of our Ayurvedic practitioners.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatbotPage;
