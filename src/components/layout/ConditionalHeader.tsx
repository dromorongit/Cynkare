'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Don't render the main header on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  return <Header />;
}
