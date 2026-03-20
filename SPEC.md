# Cynkare Premium Skincare E-commerce Specification

## 1. Project Overview

- **Project Name**: Cynkare Premium Skincare E-commerce
- **Project Type**: Full-stack E-commerce Website
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Framer Motion
- **Language**: TypeScript
- **Deployment**: Vercel or Railway
- **Design Goal**: Clean, minimal, luxury skincare e-commerce website that feels premium, fast, mobile-first, and elegant like top global beauty brands

---

## 2. Brand Identity

- **Brand Name**: Cynkare
- **Tagline**: "Glow Starts Here"
- **Description**: Premium skincare products, perfumes, and beauty essentials for glowing, flawless skin

### Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Primary (Background) | Soft Beige | `#F8F5F0` |
| Secondary | Warm Cream | `#EDE3D9` |
| Accent | Taupe | `#D6C3B3` |
| Text | Deep Black | `#1A1A1A` |

### Typography
- **Body Font**: `system-ui, -apple-system, San Francisco, Helvetica, Arial, sans-serif`
- **Heading Font**: `Playfair Display, serif`

---

## 3. Pages Structure

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, categories, new arrivals, testimonials |
| Shop | `/shop` | Product listing with filters and sorting |
| Product Details | `/product/[slug]` | Individual product page with gallery |
| About | `/about` | Brand story and values |
| Contact | `/contact` | Contact info with WhatsApp integration |
| Cart | `/cart` | Full cart view |
| Checkout | `/checkout` | Payment with Paystack |

---

## 4. Feature Specifications

### 4.1 Homepage Sections

#### Hero Section
- **Headline**: "Flawless Skin Starts Here"
- **Subtext**: "Premium skincare and beauty essentials for your glow"
- **CTA Button**: "Shop Now"
- **Design**: Minimal, large product image, soft beige background (#F8F5F0), smooth fade animation on load

#### Shop by Category
- **Categories**:
  1. Whitening Lotions
  2. Black Soap
  3. Face Creams & Cleansers
  4. Perfumes
  5. Beauty Essentials
- **Design**: Grid layout (responsive), rounded cards with hover scale animation

#### New Arrivals
- **Type**: Carousel
- **Design**: Smooth horizontal scroll with product cards, drag-to-scroll enabled

#### Why Cynkare
- **Points**:
  1. Premium Quality Products
  2. Glow Enhancing Formulas
  3. Trusted by Customers

#### Testimonials
- **Design**: Clean cards with customer reviews, star ratings, optional customer images

#### Instagram Feed
- **Integration**: Display Instagram posts (placeholder with social links)

### 4.2 Shop Page
- **Layout**: Grid (2 columns mobile, 3 columns tablet, 4 columns desktop)
- **Filters**:
  - Category filter
  - Price range filter
- **Sorting Options**:
  - Newest first
  - Price: Low to High
  - Price: High to Low

### 4.3 Product Details Page
- **Features**:
  - Image gallery with zoom on hover
  - Product description
  - Price display
  - Add to Cart button
  - WhatsApp Order button
  - Related products section
  - Reviews section

### 4.4 Cart System
- **Type**: Slide-out mini cart (right side)
- **Features**:
  - Update quantity (+/- buttons)
  - Remove item
  - Subtotal display
  - Checkout button
  - Close button (X)
- **Animation**: Slide in from right with backdrop overlay

### 4.5 Checkout
- **Payment Gateway**: Paystack
- **Form Fields**:
  - Full Name (required)
  - Phone Number (required)
  - Address (required)
  - Email (optional)
- **Design**: Simple, fast, mobile-optimized form

### 4.6 WhatsApp Integration
- **Floating Button**: Fixed position bottom-right
- **Link**: `https://wa.me/233554882542`
- **Prefilled Message**: "Hello, I want to order this product"
- **Icon**: WhatsApp green icon with pulse animation

### 4.7 Social Links
- **Instagram**: https://www.instagram.com/cynkare.gh
- **Facebook**: https://www.facebook.com/share/1TNayKdBzX/
- **TikTok**: https://www.tiktok.com/@cynkareshop
- **Snapchat**: https://snapchat.com/t/68sGdAOK

---

## 5. Technical Specifications

### 5.1 Animations (Framer Motion)
- **Page Transitions**: Fade in with slight upward movement
- **Scroll Animations**: Elements fade in as they enter viewport
- **Hover Effects**: Scale up (1.02-1.05) on cards and buttons
- **Loading**: Skeleton loaders for images
- **Mini Cart**: Slide from right with opacity backdrop

### 5.2 Performance Optimization
- **Lazy Loading**: Images lazy loaded with blur placeholder
- **Image Optimization**: Next.js Image component with WebP
- **Code Splitting**: Automatic with Next.js App Router
- **Caching**: Static generation for product pages

### 5.3 SEO
- **Meta Tags**: Title, description, og:image for each page
- **Semantic HTML**: Proper heading hierarchy
- **Sitemap**: Auto-generated

### 5.4 Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

---

## 6. Component Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Homepage
│   ├── shop/
│   │   └── page.tsx        # Shop page
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx    # Product details
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── contact/
│   │   └── page.tsx        # Contact page
│   ├── cart/
│   │   └── page.tsx        # Cart page
│   └── checkout/
│       └── page.tsx        # Checkout page
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductGallery.tsx
│   │   └── RelatedProducts.tsx
│   ├── cart/
│   │   ├── MiniCart.tsx
│   │   ├── CartItem.tsx
│   │   └── CartSummary.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── Categories.tsx
│       ├── NewArrivals.tsx
│       ├── WhyCynkare.tsx
│       ├── Testimonials.tsx
│       └── InstagramFeed.tsx
├── lib/
│   ├── store.ts            # Zustand store
│   ├── products.ts         # Product data
│   └── utils.ts            # Utility functions
├── types/
│   └── index.ts            # TypeScript types
└── styles/
    └── globals.css         # Global styles
```

---

## 7. Sample Product Data

```typescript
const products = [
  {
    id: "1",
    name: "Luxury Whitening Lotion",
    slug: "luxury-whitening-lotion",
    category: "Whitening Lotions",
    price: 89.99,
    description: "Premium whitening lotion for radiant skin...",
    images: ["/products/lotion-1.jpg"],
    inStock: true,
  },
  // ... more products
]
```

---

## 8. Acceptance Criteria

### Must Have
- [ ] Homepage loads with all 6 sections
- [ ] Navigation works on all pages
- [ ] Shop page shows products with filters
- [ ] Product details page shows all information
- [ ] Add to cart works and updates cart count
- [ ] Mini cart slides out when item added
- [ ] Cart shows correct items and totals
- [ ] Checkout form validates required fields
- [ ] WhatsApp button opens with prefilled message
- [ ] Mobile responsive on all breakpoints
- [ ] Animations are smooth (60fps)

### Should Have
- [ ] SEO meta tags on all pages
- [ ] Image zoom on product gallery
- [ ] Related products on product page
- [ ] Testimonials section on homepage

### Nice to Have
- [ ] Instagram feed integration
- [ ] Search functionality
- [ ] Product reviews

---

## 9. Implementation Notes

- Use Zustand for state management (lightweight, simple)
- Use React Context for cart state
- Paystack integration via @paystack/inline-js
- All images from Unsplash or placeholder service
- Icons from Lucide React
