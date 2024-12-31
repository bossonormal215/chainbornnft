'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface NotificationProps {
    message: string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
}

export function Notification({ message, type, onClose }: NotificationProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
    }[type];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`
                        fixed top-20 left-4 right-4 md:left-1/2 md:right-auto 
                        md:transform md:-translate-x-1/2
                        ${bgColor} text-white px-3 py-2 rounded-lg shadow-lg 
                        flex items-center gap-2 z-[100] 
                        md:max-w-[400px] mx-auto
                        break-words
                    `}
                >
                    <span className="text-xs md:text-sm font-medium flex-1 text-center">
                        {message}
                    </span>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="p-1 hover:bg-white/20 rounded-full flex-shrink-0 transition-colors"
                        aria-label="Close notification"
                    >
                        <XMarkIcon className="h-3 w-3 md:h-4 md:w-4" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
} 