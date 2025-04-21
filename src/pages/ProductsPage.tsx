
import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHealthProfile } from '@/contexts/HealthProfileContext';

// Sample product data
const productsData = [
  {
    id: 1,
    name: 'Ashwagandha Supplement',
    description: 'Organic stress-relief supplement that helps reduce cortisol levels and anxiety.',
    price: 24.99,
    rating: 4.7,
    reviewCount: 128,
    image: 'public/lovable-uploads/6921390f-bd32-4283-8bdd-8b04e7d8d5cd.png',
    category: 'supplements',
    tags: ['stress', 'anxiety', 'sleep'],
    inStock: true,
    allergies: ['none'],
    dosha: ['vata', 'kapha']
  },
  {
    id: 2,
    name: 'Triphala Powder',
    description: 'Traditional Ayurvedic formula that supports digestive health and gentle detoxification.',
    price: 19.99,
    rating: 4.5,
    reviewCount: 94,
    image: 'public/lovable-uploads/d53aa22d-06e5-4ec8-aee3-4c504133e587.png',
    category: 'supplements',
    tags: ['digestion', 'detox'],
    inStock: true,
    allergies: ['none'],
    dosha: ['all']
  },
  {
    id: 3,
    name: 'Brahmi Oil',
    description: 'Cooling hair and scalp oil that promotes relaxation and mental clarity.',
    price: 16.99,
    rating: 4.8,
    reviewCount: 75,
    image: 'public/lovable-uploads/ce8513d3-79b3-425e-ba6a-9bb976bc7912.png',
    category: 'oils',
    tags: ['relaxation', 'hair care'],
    inStock: true,
    allergies: ['nuts'],
    dosha: ['pitta']
  },
  {
    id: 4,
    name: 'Chyawanprash',
    description: 'Immune-boosting herbal jam packed with antioxidants and vitamin C.',
    price: 22.99,
    rating: 4.6,
    reviewCount: 112,
    image: 'public/lovable-uploads/19f839c7-e591-4fc7-92d1-dd687d2a8c58.png',
    category: 'food',
    tags: ['immunity', 'energy'],
    inStock: true,
    allergies: ['honey', 'ghee'],
    dosha: ['vata', 'kapha']
  },
  {
    id: 5,
    name: 'Neti Pot',
    description: 'Ceramic nasal irrigation system for clearing sinuses and improving breathing.',
    price: 15.99,
    rating: 4.4,
    reviewCount: 86,
    image: 'public/lovable-uploads/3e1f8320-0da6-453f-a7c0-d9831030b2d9.png',
    category: 'tools',
    tags: ['sinus', 'allergies', 'breathing'],
    inStock: false,
    allergies: ['none'],
    dosha: ['kapha']
  },
  {
    id: 6,
    name: 'Tulsi Tea',
    description: 'Organic holy basil tea known for its adaptogenic stress-relieving properties.',
    price: 12.99,
    rating: 4.9,
    reviewCount: 142,
    image: 'public/lovable-uploads/55258534-095e-4a76-9ce3-411d4f7c7d58.png',
    category: 'tea',
    tags: ['stress', 'immunity', 'adaptogen'],
    inStock: true,
    allergies: ['none'],
    dosha: ['all']
  }
];

const ProductsPage = () => {
  const { profile } = useHealthProfile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDosha, setSelectedDosha] = useState('all');
  const [excludeAllergies, setExcludeAllergies] = useState(true);
  const [inStockOnly, setInStockOnly] = useState(false);
  
  // Filter products based on search and filters
  const filteredProducts = productsData.filter(product => {
    // Filter by search term
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    
    // Filter by dosha
    if (selectedDosha !== 'all' && !product.dosha.includes(selectedDosha) && product.dosha !== 'all') {
      return false;
    }
    
    // Filter by allergies
    if (excludeAllergies && profile.allergies) {
      const userAllergies = profile.allergies.toLowerCase().split(',').map(a => a.trim());
      const hasAllergen = product.allergies.some(allergen => 
        userAllergies.some(userAllergen => allergen.includes(userAllergen) && userAllergen !== 'none')
      );
      if (hasAllergen) return false;
    }
    
    // Filter by stock
    if (inStockOnly && !product.inStock) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container px-4">
          <div className="mb-8">
            <h1 className="font-serif text-2xl sm:text-3xl font-medium mb-2">Ayurvedic Products</h1>
            <p className="text-muted-foreground">
              Discover authentic Ayurvedic products carefully selected to support your wellness journey
            </p>
          </div>
          
          {/* Search and filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="md:col-span-2">
              <Input 
                type="search"
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="supplements">Supplements</SelectItem>
                  <SelectItem value="oils">Oils</SelectItem>
                  <SelectItem value="food">Food & Nutrition</SelectItem>
                  <SelectItem value="tea">Teas</SelectItem>
                  <SelectItem value="tools">Tools & Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={selectedDosha} onValueChange={setSelectedDosha}>
                <SelectTrigger>
                  <SelectValue placeholder="Dosha Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doshas</SelectItem>
                  <SelectItem value="vata">Vata</SelectItem>
                  <SelectItem value="pitta">Pitta</SelectItem>
                  <SelectItem value="kapha">Kapha</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="exclude-allergies" 
                checked={excludeAllergies}
                onCheckedChange={(checked) => setExcludeAllergies(checked as boolean)} 
              />
              <Label htmlFor="exclude-allergies">Hide products with my allergens</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="in-stock" 
                checked={inStockOnly}
                onCheckedChange={(checked) => setInStockOnly(checked as boolean)} 
              />
              <Label htmlFor="in-stock">In stock only</Label>
            </div>
          </div>
          
          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden border border-border/50">
                <div className="aspect-square bg-ayurveda-cream overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{product.name}</h3>
                    <span className="font-medium text-foreground">${product.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? "text-amber-500" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">({product.reviewCount})</span>
                    </div>
                    <div>
                      {product.inStock ? (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">In Stock</span>
                      ) : (
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Out of Stock</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.map(tag => (
                      <span key={tag} className="text-xs bg-secondary/50 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Add to Cart' : 'Notify Me'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search term</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedDosha('all');
                  setExcludeAllergies(true);
                  setInStockOnly(false);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
