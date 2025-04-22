
import { useState, useEffect } from 'react';
import { useHealthProfile } from '@/contexts/HealthProfileContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
  benefits: string[];
  category: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { profile } = useHealthProfile();

  // Mock products data
  useEffect(() => {
    // In a real app, this would be fetched from an API
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Ashwagandha Supplement',
        description: 'Helps reduce stress and anxiety',
        price: 24.99,
        image: '/placeholder.svg',
        ingredients: ['Ashwagandha root', 'Black pepper extract'],
        benefits: ['Reduces stress', 'Improves sleep', 'Boosts immunity'],
        category: 'supplements'
      },
      {
        id: '2',
        name: 'Triphala Powder',
        description: 'Supports digestive health',
        price: 19.99,
        image: '/placeholder.svg',
        ingredients: ['Amalaki', 'Bibhitaki', 'Haritaki'],
        benefits: ['Improves digestion', 'Detoxifies body', 'Supports immunity'],
        category: 'powders'
      },
      {
        id: '3',
        name: 'Brahmi Oil',
        description: 'For hair and scalp wellness',
        price: 15.99,
        image: '/placeholder.svg',
        ingredients: ['Brahmi extract', 'Coconut oil', 'Amla extract'],
        benefits: ['Nourishes scalp', 'Strengthens hair', 'Reduces hair loss'],
        category: 'oils'
      },
      {
        id: '4',
        name: 'Tulsi Tea',
        description: 'Relaxing herbal tea for immunity',
        price: 12.99,
        image: '/placeholder.svg',
        ingredients: ['Holy Basil (Tulsi)', 'Ginger', 'Lemon grass'],
        benefits: ['Boosts immunity', 'Reduces stress', 'Improves respiratory health'],
        category: 'teas'
      }
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Filter products based on search term and category
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter out products with allergens the user is allergic to
    if (profile.allergies) {
      const userAllergies = profile.allergies.toLowerCase();
      filtered = filtered.filter(product => {
        // Check if any ingredient matches user allergies
        return !product.ingredients.some(ingredient => 
          userAllergies.includes(ingredient.toLowerCase())
        );
      });
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products, profile.allergies]);

  const categories = ['all', 'supplements', 'powders', 'oils', 'teas'];

  return (
    <div className="flex flex-col min-h-screen bg-ayurveda-cream">
      <Navbar />
      
      <main className="flex-1">
        <div className="container px-4 py-8">
          <h1 className="text-3xl font-serif font-medium mb-2">Ayurvedic Products</h1>
          <p className="text-muted-foreground mb-8">Discover natural wellness products tailored to your needs</p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="w-full sm:w-2/3">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full sm:w-1/3">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No products found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <CardHeader className="p-4">
                    <div className="bg-gray-100 rounded-md h-40 flex items-center justify-center mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover h-32 w-32"
                      />
                    </div>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="font-medium text-lg">${product.price.toFixed(2)}</p>
                    <Separator className="my-3" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium">Key Ingredients:</p>
                      <p>{product.ingredients.join(', ')}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
