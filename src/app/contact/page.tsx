'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, Instagram, Facebook } from 'lucide-react';

export default function ContactPage() {
  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/cynkare.gh', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/share/1TNayKdBzX/', label: 'Facebook' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-secondary/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl font-bold text-text"
          >
            Contact Us
          </motion.h1>
          <p className="text-text/60 mt-2">We are here to help</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl font-bold text-text mb-8">
              Get in Touch
            </h2>
            
            <div className="space-y-6">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/20 flex items-center justify-center text-accent">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-text">Location</h3>
                  <p className="text-text/60">Accra, Ghana</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/20 flex items-center justify-center text-accent">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-text">Phone</h3>
                  <p className="text-text/60">+233 55 488 2542</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/20 flex items-center justify-center text-accent">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-text">Email</h3>
                  <p className="text-text/60">hello@cynkare.com</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <h3 className="font-medium text-text mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-12 p-6 bg-green-500/10 border border-green-500/20">
              <div className="flex items-start gap-4">
                <MessageCircle className="w-6 h-6 text-green-500" />
                <div>
                  <h3 className="font-medium text-text mb-2">WhatsApp Us</h3>
                  <p className="text-text/60 text-sm mb-4">
                    For quick responses, chat with us on WhatsApp
                  </p>
                  <a
                    href="https://wa.me/233554882542"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Start Chat
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-secondary/30 p-8">
              <h2 className="font-heading text-2xl font-bold text-text mb-6">
                Send us a Message
              </h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-primary border border-accent/30 focus:outline-none focus:border-accent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-primary border border-accent/30 focus:outline-none focus:border-accent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 bg-primary border border-accent/30 focus:outline-none focus:border-accent"
                    placeholder="+233 55 123 4567"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-primary border border-accent/30 focus:outline-none focus:border-accent resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-text text-primary py-3 font-medium hover:bg-accent transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
