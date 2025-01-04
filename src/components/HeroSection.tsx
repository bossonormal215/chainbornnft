'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import chainborn from "../app/images/chainborn2.png";

export function HeroSection() {
    return (
        <div className="relative min-h-screen flex items-center">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

            <div className="container mx-auto px-4 z-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                            Welcome to Chainborn
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            A collection of 555 unique warriors forged by destiny, merging primal power with advanced technology. Join the evolution of blockchain supremacy.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href="/mint"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105"
                            >
                                Mint Now
                            </Link>
                            <a
                                href="#learn-more"
                                className="border border-white/20 hover:border-white/40 text-white px-8 py-3 rounded-full font-bold transition-all"
                            >
                                Learn More
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative w-full aspect-square">
                            <Image
                                // src="/images/chainborn.png"
                                src={chainborn}
                                alt="Chainborn NFT Preview"
                                fill
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
} 