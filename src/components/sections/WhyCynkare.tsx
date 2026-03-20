'use client';

import { motion } from 'framer-motion';
import { Star, Sparkles, Heart } from 'lucide-react';

const features = [
  {
    icon: Star,
    title: 'Premium Quality Products',
    description: 'Every product is carefully selected for its exceptional quality and effectiveness.',
  },
  {
    icon: Sparkles,
    title: 'Glow Enhancing Formulas',
    description: 'Our formulas are designed to bring out your natural radiance and glow.',
  },
  {
    icon: Heart,
    title: 'Trusted by Customers',
    description: 'Join thousands of satisfied customers who have transformed their skincare routine.',
  },
];

export default function WhyCynkare() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-4">
            Why Cynkare
          </h2>
          <p className="text-text/60 max-w-2xl mx-auto">
            We are committed to providing you with the best skincare experience
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              className="text-center p-8 bg-secondary/30 hover:bg-secondary/50 transition-colors duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 text-accent mb-6">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-text mb-4">
                {feature.title}
              </h3>
              <p className="text-text/60">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
