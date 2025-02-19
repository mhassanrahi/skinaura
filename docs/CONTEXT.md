# Jenpharm Clone

This project is an e-commerce platform inspired by [Jenpharm](https://jenpharm.com), built using the latest Next.js. It provides a complete online shopping experience for dermatologically approved skincare and hair care products, featuring dynamic promotions, custom bundle creation, interactive skin quizzes, and robust account management.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Pages and User Flows](#pages-and-user-flows)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Future Enhancements](#future-enhancements)

---

## Project Overview

The Jenpharm Clone replicates the design and functionality of Jenpharm's website with:
- Dynamic homepage elements (countdowns, promotional banners)
- Comprehensive product catalog with filtering and search
- Customizable bundles with automated discounts
- An interactive skin analysis quiz
- Secure user account and order management
- Integrated blog, reviews, and social media/community features

---

## Features

- **Dynamic Homepage:**  
  - Flash sale countdown timers  
  - Promotional banners (e.g., limited-time discounts, free shipping)

- **Product Discovery:**  
  - Search functionality with popular search terms  
  - Category filters (e.g., Dark Spots, Acne, Haircare, Best Sellers)

- **Product Catalog & Details:**  
  - Product listing pages with discounts and bundles  
  - Detailed product pages with images, descriptions, pricing, and reviews  
  - “Add to Cart” functionality

- **Custom Bundle Creation:**  
  - User-selected product bundles with an instant discount  
  - Customizable according to skin/hair concerns

- **Interactive Skin Analysis/Quiz:**  
  - A guided quiz to generate personalized skincare routines

- **User Account & Order Management:**  
  - Sign In, Create Account, and Forgot Password flows  
  - Order tracking and history

- **Shopping Cart & Checkout:**  
  - Real-time cart updates  
  - Secure checkout with integrated payment gateways

- **Content & Community:**  
  - Blog and Reviews sections  
  - Customer testimonials and celebrity endorsements  
  - Mailing list subscription and social media integration

- **Static Informational Pages:**  
  - Contact Us, Store Locator, Shipping Policy, Privacy Policy, FAQ’s

---

## Pages and User Flows

### Pages

1. **Homepage:**  
   - Features promotional banners, countdown timers, featured products, testimonials, a skin quiz call-to-action, and community/social media links.

2. **Shop/Product Listing Page:**  
   - Displays products by categories (bundles, best sellers, seasonal offers) with filtering and sorting options.

3. **Product Detail Page:**  
   - Contains detailed information about a product, pricing (including discounts), multiple images, customer reviews, and an “Add to Cart” button.

4. **Custom Bundle Creation Page:**  
   - Enables users to create personalized bundles from the full product range and receive a discount when meeting a minimum order threshold.

5. **Skin Analysis/Quiz Page:**  
   - Interactive quiz to assess skin type and concerns, leading to personalized skincare routine recommendations.

6. **Cart Page:**  
   - Shows current cart items, pricing details (subtotal, shipping, taxes), and options to update quantities or remove products.

7. **Checkout Page:**  
   - Collects shipping details, payment information, and provides an order summary before purchase confirmation.

8. **User Account Pages:**  
   - **Sign In:** Login form  
   - **Create Account:** Registration page  
   - **Forgot Password:** Password recovery process

9. **Order Tracking Page:**  
   - Allows users to track their orders using an order number and email.

10. **Content Pages:**  
    - **Blog:** Articles on skincare and product usage  
    - **Reviews:** Customer testimonials and ratings  
    - **Static Info:** Contact Us, Store Locator, Shipping Policy, Privacy Policy, FAQ’s

### User Flows

- **Landing Flow:**  
  Users arrive on the homepage, engage with promotional content, and navigate to shop or take the skin analysis quiz.

- **Product Browsing Flow:**  
  Users use the search and category filters to browse products, then click through to product detail pages.

- **Product Detail & Cart Flow:**  
  After viewing product details, users add items to the cart, which updates in real-time and persists across sessions.

- **Custom Bundle Flow:**  
  Users select “Create Bundle,” choose products based on their needs, and automatically receive a discount.

- **Skin Analysis Flow:**  
  Users complete the quiz to receive a tailored skincare routine recommendation.

- **Checkout Flow:**  
  Users review their cart, proceed through a secure checkout process, and complete their purchase.

- **Account & Order Management Flow:**  
  Users sign in or register, view their order history, and track current orders.

- **Subscription & Community Flow:**  
  Users subscribe to the mailing list for exclusive offers and join the community through social media integrations.

---

## Tech Stack

### Frontend
- **Next.js (Latest):**  
  Provides server-side rendering and static site generation for enhanced performance and SEO.
- **React.js:**  
  Core library for building user interfaces.
- **ShadCN UI:**  
  A component library built with Tailwind CSS and Radix UI, offering pre-built, accessible UI components that accelerate development and ensure a consistent design system.
- **Tailwind CSS / Styled Components:**  
  For modern, responsive, and utility-first styling.
- **TypeScript:**  
  For improved type safety and code maintainability.

### Backend
- **Supabase:**  
  Leverages Supabase for backend services including authentication, storage, and real-time subscriptions.
- **Next.js API Routes (Optional):**  
  Can be used for additional custom server-side logic alongside Supabase.

### Database
- **MySQL (Managed by Supabase):**  
  Utilize MySQL as your relational database, managed and scaled through Supabase.
- **ORM Tools:**  
  Use Prisma (or another MySQL-supported ORM) for streamlined database interactions.

### Payment & Order Processing
- **Stripe or PayPal:**  
  Integration with secure payment gateways.