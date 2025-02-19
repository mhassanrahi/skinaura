"use client";

import * as React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, User, ShoppingCart, ChevronDown } from 'lucide-react';
import { CartDrawer } from "@/components/layout/cart-drawer";
import { SearchOverlay } from "@/components/layout/search-overlay";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from '@/contexts/cart-context';

const shopCategories = [
  { name: 'Skincare', href: '/shop/skincare' },
  { name: 'Haircare', href: '/shop/haircare' },
  { name: 'Body Care', href: '/shop/body-care' },
  { name: 'New Arrivals', href: '/shop/new-arrivals' },
  { name: 'Best Sellers', href: '/shop/best-sellers' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const { items, setIsOpen } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]" title="Navigation Menu">
                <nav className="flex flex-col gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 hover:bg-accent rounded-md">
                      Shop <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {shopCategories.map((category) => (
                        <DropdownMenuItem key={category.href}>
                          <Link href={category.href} className="w-full">
                            {category.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link href="/bundles" className="px-4 py-2 hover:bg-accent rounded-md">
                    Bundles
                  </Link>
                  <Link href="/quiz" className="px-4 py-2 hover:bg-accent rounded-md">
                    Skin Quiz
                  </Link>
                  <Link href="/blog" className="px-4 py-2 hover:bg-accent rounded-md">
                    Blog
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold tracking-tight hover:text-primary transition-colors">
            SkinEra
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors">
                  Shop <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {shopCategories.map((category) => (
                    <DropdownMenuItem key={category.href}>
                      <Link href={category.href} className="w-full">
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/bundles" className="hover:text-primary transition-colors">
                Bundles
              </Link>
              <Link href="/quiz" className="hover:text-primary transition-colors">
                Skin Quiz
              </Link>
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primary transition-colors"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <Link href="/account">
              <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primary transition-colors relative"
              onClick={() => setIsOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Button>
            <CartDrawer />
          </div>
        </div>
      </div>
    </nav>
  );
}