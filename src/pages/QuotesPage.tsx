
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Sample quotes data
const quotesData = [
  {
    id: 1,
    text: "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need.",
    author: "Ayurvedic Proverb"
  },
  {
    id: 2,
    text: "The natural healing force within each one of us is the greatest force in getting well.",
    author: "Hippocrates"
  },
  {
    id: 3,
    text: "Health is not simply the absence of sickness.",
    author: "Hannah Green"
  },
  {
    id: 4,
    text: "To keep the body in good health is a duty, otherwise we shall not be able to keep our mind strong and clear.",
    author: "Buddha"
  },
  {
    id: 5,
    text: "The part can never be well unless the whole is well.",
    author: "Plato"
  },
  {
    id: 6,
    text: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    author: "Albert Einstein"
  },
  {
    id: 7,
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu"
  },
  {
    id: 8,
    text: "Your body hears everything your mind says.",
    author: "Naomi Judd"
  },
  {
    id: 9,
    text: "The greatest wealth is health.",
    author: "Virgil"
  },
  {
    id: 10,
    text: "A good laugh and a long sleep are the best cures in the doctor's book.",
    author: "Irish Proverb"
  },
  {
    id: 11,
    text: "Happiness lies, first of all, in health.",
    author: "George William Curtis"
  },
  {
    id: 12,
    text: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn"
  }
];

const QuotesPage = () => {
  const [currentQuote, setCurrentQuote] = useState(quotesData[0]);
  const [favoriteQuotes, setFavoriteQuotes] = useState<number[]>([]);
  
  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('ayurveda_favorite_quotes');
    if (savedFavorites) {
      setFavoriteQuotes(JSON.parse(savedFavorites));
    }
  }, []);
  
  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('ayurveda_favorite_quotes', JSON.stringify(favoriteQuotes));
  }, [favoriteQuotes]);
  
  const getRandomQuote = () => {
    const filteredQuotes = quotesData.filter(quote => quote.id !== currentQuote.id);
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    setCurrentQuote(filteredQuotes[randomIndex]);
  };
  
  const toggleFavorite = (quoteId: number) => {
    if (favoriteQuotes.includes(quoteId)) {
      setFavoriteQuotes(favoriteQuotes.filter(id => id !== quoteId));
    } else {
      setFavoriteQuotes([...favoriteQuotes, quoteId]);
    }
  };
  
  const downloadFavorites = () => {
    const favoriteQuotesContent = quotesData
      .filter(quote => favoriteQuotes.includes(quote.id))
      .map(quote => `"${quote.text}" - ${quote.author}`)
      .join('\n\n');
    
    const element = document.createElement('a');
    const file = new Blob([favoriteQuotesContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'Ayurvedic_Favorite_Quotes.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-10 bg-ayurveda-cream">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl font-medium mb-4">Daily Wellness Inspiration</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find motivation and wisdom through these time-tested quotes on wellness, balance, and mindful living.
            </p>
          </div>
          
          {/* Current quote card */}
          <div className="max-w-3xl mx-auto mb-16">
            <Card className="bg-white border border-border/30 p-8 md:p-12 flex flex-col items-center text-center">
              <div className="mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/60">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </div>
              <p className="font-serif text-xl md:text-2xl lg:text-3xl mb-6">{currentQuote.text}</p>
              <p className="text-muted-foreground font-medium">— {currentQuote.author}</p>
              
              <div className="mt-8 flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => toggleFavorite(currentQuote.id)}
                  className="flex items-center gap-2"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill={favoriteQuotes.includes(currentQuote.id) ? "currentColor" : "none"}
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={favoriteQuotes.includes(currentQuote.id) ? "text-amber-500" : ""}
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  {favoriteQuotes.includes(currentQuote.id) ? 'Favorited' : 'Add to Favorites'}
                </Button>
                
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={getRandomQuote}
                >
                  Next Quote
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Favorites section */}
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl font-medium">Your Favorite Quotes</h2>
              {favoriteQuotes.length > 0 && (
                <Button variant="outline" onClick={downloadFavorites}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download Favorites
                </Button>
              )}
            </div>
            
            {favoriteQuotes.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-border/30">
                <p className="text-muted-foreground mb-4">You haven't saved any favorite quotes yet.</p>
                <p className="text-sm">Click "Add to Favorites" on quotes you'd like to save for later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quotesData
                  .filter(quote => favoriteQuotes.includes(quote.id))
                  .map(quote => (
                    <Card key={quote.id} className="bg-white border border-border/30 p-6">
                      <p className="font-serif text-lg mb-3">{quote.text}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">— {quote.author}</p>
                        <button 
                          onClick={() => toggleFavorite(quote.id)}
                          className="text-amber-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                          </svg>
                        </button>
                      </div>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuotesPage;
