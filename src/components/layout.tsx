import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary text-gray-800">
      <header className="bg-primary text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Chainborn
          </Link>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-secondary-dark transition-colors">Home</Link></li>
            <li><Link href="/mint" className="hover:text-secondary-dark transition-colors">Mint</Link></li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-primary text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          &copy; 2024 Chainborn. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;

