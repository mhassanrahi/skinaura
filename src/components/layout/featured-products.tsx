"use strict";

import * as React from "react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  image: string;
}

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Brightening Serum",
    description: "Advanced formula for radiant, even-toned skin",
    price: 49.99,
    discountedPrice: 39.99,
    image: "/products/brightening-serum.jpg"
  },
  {
    id: "2",
    name: "Hydrating Moisturizer",
    description: "24-hour hydration for all skin types",
    price: 34.99,
    image: "/products/moisturizer.jpg"
  },
  {
    id: "3",
    name: "Acne Control Kit",
    description: "Complete solution for acne-prone skin",
    price: 79.99,
    discountedPrice: 69.99,
    image: "/products/acne-kit.jpg"
  },
  {
    id: "4",
    name: "Anti-Aging Bundle",
    description: "Comprehensive anti-aging skincare routine",
    price: 129.99,
    discountedPrice: 99.99,
    image: "/products/anti-aging-bundle.jpg"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Best Sellers</h2>
          <p className="text-gray-600">Discover our most loved products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                {/* Replace with actual image when available */}
                <div className="w-full h-full bg-gray-200" />
                {product.discountedPrice && (
                  <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-md text-sm font-medium">
                    Save {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
                  </div>
                )}
              </div>

              <h3 className="font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>

              <div className="flex items-center justify-between mb-4">
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
              </div>

              <Button className="w-full" variant="outline">
                Add to Cart
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;