'use client';

import { motion } from 'framer-motion';
import { Sparkles, Star, Heart, ArrowDown } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section - Intro */}
      <section className="relative py-24 bg-gradient-to-b from-secondary/20 via-secondary/10 to-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 text-accent font-medium tracking-wider uppercase text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              Welcome to Cynkare
            </span>
            <h1 className="text-hero font-heading text-text mb-8 leading-tight">
              Where Beauty Meets Confidence
            </h1>
            <p className="text-xl md:text-2xl text-text/70 font-light leading-relaxed max-w-2xl mx-auto">
              Cynkare is a beauty and skincare brand dedicated to helping you achieve clear, radiant, and confident skin while embracing your unique beauty.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12"
          >
            <ArrowDown className="w-6 h-6 text-accent/50 mx-auto animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Brand Story Section */}
      <section className="py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-section font-heading text-text mb-6">
              Our Brand Story
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-8" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg md:text-xl text-text/70 font-light leading-loose text-center max-w-3xl mx-auto">
              We curate high quality skincare, luxurious perfumes, hair essentials, and beauty products designed to elevate both your appearance and presence. Every product at Cynkare is selected with intention to deliver visible results, long-lasting scents, and a premium experience you can trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-28 bg-secondary/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-section font-heading text-text mb-6">
              Our Philosophy
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-8" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <Heart className="w-12 h-12 text-accent mb-8" />
            <p className="text-lg md:text-xl text-text/70 font-light leading-loose text-center max-w-3xl mx-auto">
              At Cynkare, we believe beauty is more than just how you look — it&apos;s how you feel. From glowing skin to signature fragrances, our goal is to help you step out with confidence, elegance, and ease.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-section font-heading text-text mb-6">
              Our Purpose
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-8" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-10 bg-primary border border-accent/10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 text-accent mb-6 rounded-full">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-text mb-4">
                Our Mission
              </h3>
              <p className="text-text/60 leading-relaxed">
                To provide high-quality skincare, perfumes, and beauty essentials that enhance confidence, promote self-care, and deliver real, visible results.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-10 bg-primary border border-accent/10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 text-accent mb-6 rounded-full">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-text mb-4">
                Our Vision
              </h3>
              <p className="text-text/60 leading-relaxed">
                To become a leading beauty brand in Africa, known for premium skincare, captivating fragrances, and an unforgettable luxury experience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Closing Statement Section */}
      <section className="py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading text-text mb-8 leading-relaxed">
              Whether you&apos;re building your skincare routine or choosing a scent that defines you, <span className="text-accent">Cynkare</span> is your destination for beauty that speaks before you do.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/15 to-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl font-bold text-text mb-6">
              Begin Your Journey
            </h2>
            <p className="text-text/60 mb-10 max-w-xl mx-auto leading-relaxed">
              Discover our curated collection of premium skincare, luxurious fragrances, and beauty essentials.
            </p>
            <a
              href="/shop"
              className="inline-block bg-accent text-primary px-10 py-4 font-medium text-lg hover:bg-text hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Collection
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
