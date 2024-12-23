'use client'


import React from 'react';
import Link from 'next/link';
import { useConnectWallet } from '@web3-onboard/react';
// import ConnectWallet from './ConnectButton';
// import { ConnectWallet } from '@thirdweb-dev/react/evm';
// import {  useAddress, useDisconnect } from "@thirdweb-dev/react/evm";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  
  // const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  // const wallet = useAddress()
  // const disconnect = useDisconnect()


  return (
    <div className="min-h-screen flex flex-col bg-secondary text-gray-800">
      <header className="sticky top-0 z-50 bg-primary text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Chainborn
          </Link>
          <ul className="flex space-x-4">
            {/* <li><Link href="/" className="hover:text-secondary-dark transition-colors">Home</Link></li>
            <li><Link href="/mint" className="hover:text-secondary-dark transition-colors">Mint</Link></li> */}

            <li>
              {!wallet ? (
                <button
                onClick={() => connect()}
                disabled={connecting}
                className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition-colors"
              >
                {connecting ? 'Connecting...' : 'Connect '}
              </button>
              // <ConnectWallet />
              ) : (
                <button
            onClick={() => disconnect({ label: wallet.label })}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors"
          >
            Disconnect
          </button> 
      //     <ConnectWallet 
      //     theme="dark"
      //     btnTitle="Connect Wallet"
      //   />
      // ) : (
      //   <button
      //     onClick={() => disconnect()}
      //     className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors"
      //   >
      //     Disconnect
      //   </button>
              )}
            </li>
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

