"use client";

import * as React from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discountedPrice?: number;
  image: string;
  href: string;
}

const trendingProducts: Product[] = [
  { 
    id: '1', 
    name: 'Brightening Serum', 
    category: 'Skincare', 
    price: 49.99,
    discountedPrice: 39.99,
    image: '/products/brightening-serum.jpg',
    href: '/shop/skincare/brightening-serum' 
  },
  { 
    id: '2', 
    name: 'Hydrating Cream', 
    category: 'Moisturizer', 
    price: 34.99,
    image: '/products/moisturizer.jpg',
    href: '/shop/skincare/hydrating-cream' 
  },
  { 
    id: '3', 
    name: 'Anti-Aging Bundle', 
    category: 'Bundles', 
    price: 129.99,
    discountedPrice: 99.99,
    image: '/products/anti-aging-bundle.jpg',
    href: '/shop/bundles/anti-aging' 
  },
  { 
    id: '4', 
    name: 'Acne Control Kit', 
    category: 'Skincare', 
    price: 79.99,
    discountedPrice: 69.99,
    image: '/products/acne-kit.jpg',
    href: '/shop/skincare/acne-control' 
  },
];

const MAX_RECENT_SEARCHES = 5;

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [recentSearchesList, setRecentSearchesList] = React.useState<string[]>([]);

  // Load recent searches from localStorage
  React.useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearchesList(JSON.parse(savedSearches));
    }
  }, []);

  // Save search query to recent searches
  const saveToRecentSearches = (query: string) => {
    const updatedSearches = [query, ...recentSearchesList.filter(item => item !== query)]
      .slice(0, MAX_RECENT_SEARCHES);
    
    setRecentSearchesList(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    saveToRecentSearches(searchQuery.trim());

    try {
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter products based on search query
      const results = trendingProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={() => onClose()}>
      <SheetContent side="top" className="h-screen border-none">
        <div className="container mx-auto py-8 px-4">
          {/* Search Input */}
          <div className="relative mb-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-12 pl-12 pr-4 text-lg border-b-2 border-gray-200 focus:border-primary focus:outline-none bg-transparent"
              />
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
            </form>
            {searchQuery && (<Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2"
              onClick={() => {
                setSearchQuery('');
              }}
              >
                <X className="h-6 w-6" />
              </Button>)
              }
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">Search Results</h3>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {searchResults.map((product) => (
                    <Link 
                      key={product.id} 
                      href={product.href}
                      className="group block p-4 hover:bg-accent rounded-lg transition-colors"
                    >
                      <div className="aspect-square relative mb-3 bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h4 className="font-medium text-sm mb-1">{product.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                      <div className="flex items-center gap-2">
                        {product.discountedPrice ? (
                          <>
                            <span className="font-semibold">${product.discountedPrice}</span>
                            <span className="text-sm text-gray-500 line-through">${product.price}</span>
                          </>
                        ) : (
                          <span className="font-semibold">${product.price}</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No products found</p>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recent Searches */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-4">Recent Searches</h3>
              <ul className="space-y-2">
                {recentSearchesList.map((search, index) => (
                  <li key={index}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left hover:text-primary"
                      onClick={() => setSearchQuery(search)}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      {search}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trending Products */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-4">Trending Products</h3>
              <ul className="space-y-2">
                {trendingProducts.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={product.href}
                      className="block p-2 hover:bg-accent rounded-md transition-colors"
                    >
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}