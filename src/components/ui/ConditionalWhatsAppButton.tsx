'use client';

import { usePathname } from 'next/navigation';
import WhatsAppButton from './WhatsAppButton';

export default function ConditionalWhatsAppButton() {
  const pathname = usePathname();
  
  // Don't render the WhatsApp button on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  return <WhatsAppButton />;
}
