'use client';

import { usePathname } from 'next/navigation';
import MiniCart from './MiniCart';

export default function ConditionalMiniCart() {
  const pathname = usePathname();
  
  // Don't render the mini cart on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  return <MiniCart />;
}
