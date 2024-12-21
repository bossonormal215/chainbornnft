'use client';

import { useChainbornContract } from '@/hooks/useChainbornContract';
import { motion } from 'framer-motion';

export function ContractStatus() {
    const {
        totalSupply,
        maxSupply,
        mintPrice,
        isPublicSaleActive,
        isPresaleActive,
    } = useChainbornContract();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 mt-8"
        >
            <h3 className="text-xl font-bold mb-4">Mint Status</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-gray-400">Total Minted</p>
                    <p className="text-2xl font-bold">
                        {totalSupply} / {maxSupply}
                    </p>
                </div>
                <div>
                    <p className="text-gray-400">Mint Price</p>
                    <p className="text-2xl font-bold">{mintPrice} ETH</p>
                </div>
                <div>
                    <p className="text-gray-400">Public Sale</p>
                    <p className={`font-bold ${isPublicSaleActive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPublicSaleActive ? 'Active' : 'Inactive'}
                    </p>
                </div>
                <div>
                    <p className="text-gray-400">Presale</p>
                    <p className={`font-bold ${isPresaleActive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPresaleActive ? 'Active' : 'Inactive'}
                    </p>
                </div>
            </div>
           
        </motion.div>
    );
} 