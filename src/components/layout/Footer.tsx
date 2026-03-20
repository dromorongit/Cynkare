'use client';

import Link from 'next/link';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/cynkare.gh', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/share/1TNayKdBzX/', label: 'Facebook' },
  ];

  return (
    <footer className="bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <img 
              src="/cynkarelogo.PNG" 
              alt="Cynkare" 
              className="h-20 w-auto mb-4"
            />
            <p className="text-text/70 mb-6 max-w-md">
              Premium skincare and beauty essentials for glowing, flawless skin. 
              Glow starts here with our curated collection of luxury products.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-accent/20 text-text hover:bg-accent hover:text-white transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-text mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Home', 'Shop', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-text/70 hover:text-accent transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-text mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-text/70">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Accra, Ghana</span>
              </li>
              <li className="flex items-center gap-3 text-text/70">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+233 55 488 2542</span>
              </li>
              <li className="flex items-center gap-3 text-text/70">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>hello@cynkare.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-accent/20 mt-12 pt-8">
          <p className="text-center text-text/60">
            © {new Date().getFullYear()} Cynkare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
