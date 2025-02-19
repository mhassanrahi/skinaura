"use client";

import * as React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/contexts/cart-context';
import Link from 'next/link';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, total } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-lg" title="Shopping Cart">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-6">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="py-6">
                    <div className="flex items-center">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="mx-2 text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.discountedPrice ? (
                              <>
                                <span className="font-medium">${(item.discountedPrice * item.quantity).toFixed(2)}</span>
                                <span className="text-sm text-gray-500 line-through">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cart Summary */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 py-6">
              <div className="space-y-4">
                <div className="flex justify-between text-base">
                  <p>Subtotal</p>
                  <p className="font-medium">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base">
                  <p>Shipping</p>
                  <p className="font-medium">
                    {subtotal >= 50 ? 'Free' : '$5.00'}
                  </p>
                </div>
                <div className="flex justify-between text-base font-medium">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                <div className="mt-6">
                  <Link href="/checkout">
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
                <div className="mt-2 text-center text-sm text-gray-500">
                  {subtotal < 50 && (
                    <p>Add ${(50 - subtotal).toFixed(2)} more for free shipping</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}