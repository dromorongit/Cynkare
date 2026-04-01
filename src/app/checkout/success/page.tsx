'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { formatPrice } from '@/lib/utils';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  reference: string;
  items: OrderItem[];
  total: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
}

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderParam = searchParams.get('order');
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Parse order details from URL
    if (orderParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(orderParam));
        setOrderDetails(decoded);
      } catch (error) {
        console.error('Failed to parse order details:', error);
      }
    }

    // Simulate verification delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [orderParam]);

  const generateWhatsAppMessage = () => {
    if (!orderDetails) return '';

    let message = `*New Order from Cynkare*\n\n`;
    message += `*Order Reference:* ${orderDetails.reference}\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${orderDetails.customerName}\n`;
    message += `Phone: ${orderDetails.customerPhone}\n`;
    message += `Address: ${orderDetails.customerAddress}\n\n`;
    message += `*Order Items:*\n`;
    
    orderDetails.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x${item.quantity} - ${formatPrice(item.price)}\n`;
    });
    
    message += `\n*Total:* ${formatPrice(orderDetails.total)}\n\n`;
    message += `Please confirm this order and arrange delivery.`;

    return encodeURIComponent(message);
  };

  const whatsappUrl = `https://wa.me/233554882542?text=${generateWhatsAppMessage()}`;

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-text/60">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Success Icon */}
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          </div>

          {/* Success Message */}
          <h1 className="font-heading text-3xl text-text mb-4">
            Payment Successful!
          </h1>
          <p className="text-text/70 mb-8">
            Thank you for your order. Your payment has been processed successfully.
          </p>

          {/* Order Reference */}
          {orderDetails && (
            <div className="bg-secondary/30 p-4 rounded-lg mb-8">
              <p className="text-sm text-text/60 mb-1">Order Reference</p>
              <p className="font-mono text-lg font-semibold text-text break-all">
                {orderDetails.reference}
              </p>
            </div>
          )}

          {/* Order Summary */}
          {orderDetails && (
            <div className="bg-secondary/30 p-6 rounded-lg mb-8 text-left">
              <h2 className="font-heading text-xl font-semibold text-text mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 mb-4">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-text/70">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-medium">{formatPrice(item.price)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-accent/20 pt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">{formatPrice(orderDetails.total)}</span>
              </div>
            </div>
          )}

          {/* WhatsApp Order Button */}
          <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-lg mb-8">
            <h2 className="font-heading text-xl font-semibold text-text mb-4 flex items-center justify-center gap-2">
              <FaWhatsapp className="w-6 h-6 text-green-500" />
              Send Order to WhatsApp
            </h2>
            <p className="text-text/70 mb-4">
              Click the button below to send your order details to our WhatsApp for confirmation and delivery arrangements.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-6 font-medium hover:bg-green-600 transition-colors duration-300 rounded-lg"
            >
              <FaWhatsapp className="w-5 h-5" />
              Send Order to WhatsApp
            </a>
          </div>

          {/* What's Next */}
          <div className="bg-secondary/30 p-6 rounded-lg mb-8 text-left">
            <h2 className="font-heading text-xl font-semibold text-text mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              What happens next?
            </h2>
            <ul className="space-y-3 text-text/70">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">1.</span>
                <span>Send your order to WhatsApp for confirmation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">2.</span>
                <span>Our team will process your order within 24 hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">3.</span>
                <span>You will be contacted for delivery arrangements.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">4.</span>
                <span>Track your order status via WhatsApp or email.</span>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg mb-8">
            <p className="text-sm text-text">
              Have questions about your order? Contact us at{' '}
              <a href="mailto:support@cynkare.com" className="text-accent hover:underline">
                support@cynkare.com
              </a>{' '}
              or via WhatsApp.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-text text-primary py-3 px-6 font-medium hover:bg-accent transition-colors duration-300"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-accent/30 text-text py-3 px-6 font-medium hover:bg-secondary transition-colors duration-300"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
