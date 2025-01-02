'use client'

import React from 'react';
import Link from 'next/link';
import { ConnectWallet } from "@thirdweb-dev/react";
import chainborn from "../app/images/chainborn.png";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const address = useAddress();

  return (
    <div className="min-h-screen flex flex-col bg-black text-gray-800">
      <header className="sticky top-0 z-50 bg-primary text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Chainborn
          </Link>
          <ul className="flex items-center space-x-6">
            
            <li>
              <ConnectWallet
                theme="dark"
                btnTitle="Connect Wallet"
                className="!bg-white-600 hover:!bg-white-700 !transition-all !duration-300"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '9999px',
                  padding: '0.5rem 1rem',
                }}
                modalSize="wide"
                welcomeScreen={{
                  title: "Welcome to Chainborn",
                  subtitle: "Connect your wallet to get started",
                  img: {
                    // src: "/images/chainborn.png",
                    src: "../app/images/chainborn.png",
                    width: 150,
                    height: 150,
                  },
                }}
                modalTitleIconUrl="/images/chainborn.png"
              // displayBalance={false}
              />
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-primary text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <a
              href="https://x.com/ChainBornAb"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://discord.gg/chainborn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
            >
              Discord
            </a>
            <a
              href="https://opensea.io/collection/chainborn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
            >
              OpenSea
            </a>
          </div>
          <p className="text-sm text-gray-400">
            &copy; 2024 Chainborn. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

