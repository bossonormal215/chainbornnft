"use client"

import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { ContractStatus } from '@/components/ContractStatus';
import { motion } from 'framer-motion';

export default function Home() {

  
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
     
      <HeroSection />
      <FeaturesSection />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-8">The Chainborn Story</h2>
            <p className="text-xl text-gray-300 mb-8">
              In the aftermath of a cosmic blockchain collapse, the digital metaverse fractured.
              Amid the chaos, hyper-intelligent beings evolved with cybernetic enhancements,
              becoming the Chainborn — primal warriors powered by Genesis Cores, destined to
              restore balance.
            </p>
            <ContractStatus />
          </motion.div>
        </div>
      </section>
    </main>
  );
}

