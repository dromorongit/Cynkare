'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice, convertToGHS } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-accent/30 mx-auto mb-4" />
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
      <div className="bg-secondary/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-hero font-heading text-text"
          >
            Shopping Cart
          </motion.h1>
          <p className="text-text/60 mt-2">{items.length} items in your cart</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 pb-6 border-b border-accent/20"
                >
                  {/* Product Image */}
                  <Link href={`/product/${item.product.slug}`}>
                    <div className="relative w-24 h-24 bg-secondary flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1">
                    <Link href={`/product/${item.product.slug}`}>
                      <h3 className="font-medium text-text hover:text-accent transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-text/60 mb-2">{item.product.category.name}</p>
                    <p className="font-medium">{formatPrice(convertToGHS(item.product.price))}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 text-text/40 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center border border-accent/30">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-secondary transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-secondary transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <Link href="/shop" className="text-accent hover:text-text transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary/30 p-6 sticky top-24">
              <h2 className="font-heading text-xl font-semibold text-text mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-text/70">Subtotal</span>
                  <span className="font-medium">{formatPrice(convertToGHS(subtotal))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/70">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="border-t border-accent/20 pt-4 flex justify-between">
                  <span className="font-semibold text-text">Total</span>
                  <span className="text-xl font-bold">{formatPrice(convertToGHS(subtotal))}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
