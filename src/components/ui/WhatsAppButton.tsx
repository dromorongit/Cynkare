'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
  productName?: string;
}

export default function WhatsAppButton({ productName }: WhatsAppButtonProps) {
  const phoneNumber = '233554882542';
  const baseMessage = 'Hi, I want to order from Cynkare';
  const message = productName 
    ? `Hi, I want to order ${productName} from Cynkare` 
    : baseMessage;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {/* Pulse Animation */}
        <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
        
        {/* Button */}
        <div className="relative bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300">
          <FaWhatsapp className="w-6 h-6" />
        </div>
      </div>
    </motion.a>
  );
}
