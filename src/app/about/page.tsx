'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Heart, Leaf, Users } from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'We source only the finest ingredients for all our products, ensuring exceptional results.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We are dedicated to providing excellent service.',
  },
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'Our formulas are crafted with natural and safe ingredients for your skin.',
  },
  {
    icon: Users,
    title: 'Trusted Brand',
    description: 'Join thousands of satisfied customers who have transformed their skincare routine.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">
              About Cynkare
            </h1>
            <p className="text-lg text-text/70">
              We are dedicated to helping you achieve radiant, flawless skin through 
              premium skincare products and beauty essentials.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-[4/5] bg-secondary">
                <Image
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=750&fit=crop"
                  alt="Cynkare Story"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-heading text-3xl font-bold text-text mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-text/70">
                <p>
                  Cynkare was founded with a simple mission: to provide premium skincare 
                  solutions that help people achieve their best skin. We believe that 
                  everyone deserves to feel confident and beautiful in their own skin.
                </p>
                <p>
                  Our curated collection includes whitening lotions, face creams, cleansers, 
                  black soap, perfumes, and beauty essentials - all carefully selected for 
                  their quality and effectiveness.
                </p>
                <p>
                  We work with trusted manufacturers and suppliers to ensure that every 
                  product meets our high standards. Our team personally tests and evaluates 
                  each item before adding it to our collection.
                </p>
                <p>
                  Today, Cynkare serves thousands of satisfied customers across Ghana and 
                  beyond. We continue to expand our product range while maintaining our 
                  commitment to quality and customer satisfaction.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-4">
              Our Values
            </h2>
            <p className="text-text/60 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center p-8 bg-primary"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 text-accent mb-6">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-text mb-4">
                  {value.title}
                </h3>
                <p className="text-text/60">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl font-bold text-text mb-6">
              Ready to Glow?
            </h2>
            <p className="text-text/60 mb-8 max-w-2xl mx-auto">
              Explore our collection of premium skincare products and find your perfect match.
            </p>
            <a
              href="/shop"
              className="inline-block bg-text text-primary px-8 py-3 font-medium hover:bg-accent transition-colors duration-300"
            >
              Shop Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
