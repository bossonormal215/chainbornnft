'use client';

import { motion } from 'framer-motion';
import {
    CubeTransparentIcon,
    SparklesIcon,
    ChartBarIcon,
    RocketLaunchIcon
} from '@heroicons/react/24/outline';

const features = [
    {
        icon: CubeTransparentIcon,
        title: 'Genesis Collection',
        description: 'Be part of the first 555 warriors in the Chainborn universe.'
    },
    {
        icon: SparklesIcon,
        title: 'Unique Artwork',
        description: 'Each warrior is uniquely generated with distinct traits and characteristics.'
    },
    {
        icon: ChartBarIcon,
        title: 'Future Utility',
        description: 'Holders will receive exclusive benefits and access to future developments.'
    },
    {
        icon: RocketLaunchIcon,
        title: 'Cross-Chain Future',
        description: 'Bridging to Abstract Chain mainnet with additional rewards for genesis holders.'
    }
];

export function FeaturesSection() {
    return (
        <section id="learn-more" className="py-20 bg-black/50">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-center mb-12"
                >
                    Why Choose Chainborn?
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-800/50 transition-all"
                        >
                            <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
} 