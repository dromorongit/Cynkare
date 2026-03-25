'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Search, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import Footer from '@/components/layout/Footer';

const navigation = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/categories', label: 'Categories' },
  { href: '/admin/subcategories', label: 'Subcategories' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { items, openCart } = useCartStore();

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem('admin_auth');
    const currentPath = window.location.pathname;
    
    // Allow access to login page without authentication
    if (currentPath === '/admin/login') {
      setIsAuthenticated(true);
      return;
    }
    
    if (!auth) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/admin/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Same style as website but with admin navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-primary/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/admin" className="flex-shrink-0">
              <img 
                src="/cynkarelogo.PNG" 
                alt="Cynkare" 
                className="h-32 md:h-40 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link text-text hover:text-accent transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button className="p-2 text-text hover:text-accent transition-colors">
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                className="p-2 text-text hover:text-accent transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2 text-text hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-text"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-primary border-t border-accent/20">
            <nav className="px-4 py-6 space-y-4">
              {navigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-text hover:text-accent transition-colors duration-300 font-medium text-lg"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="block text-red-600 hover:text-red-700 transition-colors duration-300 font-medium text-lg"
              >
                Logout
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Page content with top padding for fixed header */}
      <main className="flex-grow pt-20">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>

      {/* Footer - Same as website */}
      <Footer />
    </div>
  );
}
