'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Lock } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice, convertToGHS } from '@/lib/utils';
import { generatePaymentReference } from '@/lib/paystack';

// Force dynamic rendering to avoid SSR issues
export const dynamic = 'force-dynamic';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    // Validate form
    if (!formData.name || !formData.phone || !formData.address) {
      setError('Please fill in all required fields');
      setIsProcessing(false);
      return;
    }

    // Validate email if provided
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsProcessing(false);
      return;
    }

    // Generate payment reference
    const reference = generatePaymentReference();
    
    // Calculate total amount in GHS
    const totalAmount = convertToGHS(subtotal);

    // Dynamically import Paystack to avoid SSR issues
    const { default: PaystackPop } = await import('@paystack/inline-js');
    
    // Initialize Paystack payment
    const paystack = new PaystackPop();
    
    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
      email: formData.email || 'customer@cynkare.com',
      amount: totalAmount * 100, // Convert to kobo
      reference,
      onSuccess: (transaction: { reference: string }) => {
        // Prepare order details for success page
        const orderDetails = {
          reference: transaction.reference,
          items: items.map(item => ({
            name: item.product.name,
            quantity: item.quantity,
            price: convertToGHS(item.product.price * item.quantity),
          })),
          total: totalAmount,
          customerName: formData.name,
          customerPhone: formData.phone,
          customerAddress: formData.address,
        };

        // Encode order details for URL
        const encodedOrder = encodeURIComponent(JSON.stringify(orderDetails));
        
        // Clear cart and redirect to success page with order details
        clearCart();
        router.push(`/checkout/success?order=${encodedOrder}`);
      },
      onCancel: () => {
        setIsProcessing(false);
        setError('Payment was cancelled. Please try again.');
      },
    });
  };

  // Show loading state during SSR
  if (!isClient) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-text/60">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl text-text mb-4">Your cart is empty</h1>
          <Link href="/shop" className="text-accent hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-secondary/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/cart"
            className="flex items-center gap-2 text-text/60 hover:text-accent transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Cart
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-section font-heading text-text mb-8"
        >
          Checkout
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Contact Information */}
              <div className="bg-secondary/30 p-6">
                <h2 className="font-heading text-xl font-semibold text-text mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-primary border border-accent/30 focus:outline-none focus:border-accent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-primary border border-accent/30 focus:outline-none focus:border-accent"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-primary border border-accent/30 focus:outline-none focus:border-accent"
                      placeholder="+233 55 123 4567"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-secondary/30 p-6">
                <h2 className="font-heading text-xl font-semibold text-text mb-6">
                  Shipping Address
                </h2>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-text mb-2">
                    Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-primary border border-accent/30 focus:outline-none focus:border-accent resize-none"
                    placeholder="Enter your delivery address"
                  />
                </div>
              </div>

              {/* Payment Notice */}
              <div className="bg-accent/10 border border-accent/20 p-4 flex items-start gap-3">
                <Lock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-text">
                    Payment is processed securely via Paystack. You will be redirected 
                    to complete your payment after reviewing your order.
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary/30 p-6 sticky top-24">
              <h2 className="font-heading text-xl font-semibold text-text mb-6">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-16 h-16 bg-secondary flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-2 -right-2 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-text/60">
                        {formatPrice(convertToGHS(item.product.price * item.quantity))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-accent/20 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text/70">Subtotal</span>
                  <span>{formatPrice(convertToGHS(subtotal))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text/70">Shipping</span>
                  <span>Calculated at payment</span>
                </div>
                <div className="border-t border-accent/20 pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold">{formatPrice(convertToGHS(subtotal))}</span>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full mt-6 bg-text text-primary py-3 px-6 font-medium hover:bg-accent transition-colors duration-300 disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Complete Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
