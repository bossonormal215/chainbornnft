'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
// import { useConnectWallet } from '@web3-onboard/react';
import { ContractStatus } from '@/components/ContractStatus';
import { CHAINBORN_CONTRACT } from '@/config/contracts';
import { useChainbornContract } from '@/hooks/useChainbornContract';
import { ConnectWallet, useSigner, useAddress } from '@thirdweb-dev/react/evm';
import { Notification } from '@/components/Notification';

const CONTRACT_ADDRESS = CHAINBORN_CONTRACT.address
const ABI = CHAINBORN_CONTRACT.abi

export default function Mint() {
  // const [{ wallet, connecting }, connect] = useConnectWallet();
  const wallet = useAddress();
  const signer = useSigner();
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState('');
  const [isMintSuccess, setIsMintSuccess] = useState(false);
  const [successMintMessage, setSuccessMintMessage] = useState('')
  const { isPresaleActive, isPublicSaleActive, mintPrice } = useChainbornContract()

  const mintNFT = async (isWhitelist: boolean) => {
    if (!wallet) {
      setError('Please connect your wallet first.');
      return;
    }

    if (!signer) {
      setError('Signer not available. Please try reconnecting your wallet.');
      return;
    }

    setMinting(true);
    setError('');

    try {
      // const provider = new ethers.providers.Web3Provider(wallet.provider);
      // const signer = provider.getSigner();
      // const signer = useSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      let tx;
      const mintValue = ethers.utils.parseEther(mintPrice);
      if (isWhitelist) {
        // tx = await contract.whitelistMint(1, { value: ethers.utils.parseEther('0.03001') });
        tx = await contract.whitelistMint(1, { value: mintValue });
      } else {
        // tx = await contract.mint(1, { value: ethers.utils.parseEther('0.03001') });
        tx = await contract.mint(1, { value: mintValue });
      }

      await tx.wait(1);
      setIsMintSuccess(true);
      // {setTimeout(() => alert('NFT minted successfully!'), 5000)};
      setSuccessMintMessage('Successfully Minted A New CHAINBORN NFT');
      // setIsMintSuccess(false);
      setTimeout(() => setIsMintSuccess(false), 15000)
    } catch (err: any) {
      // setError(err.message || 'An error occurred while minting.');
      console.error('Minting error:', err);
      if (err.code === 'INSUFFICIENT_FUNDS') {
        setError('You do not have enough ETH to cover the minting cost.');
      } else if (err.message.includes('whitelist')) {
        setError('You are not whitelisted for the presale mint.');
      } else if (err.message.includes('Public sale is not active')) {
        setError('Public sale is currently inactive.');
      } else if (err.message.includes('Presale is not active')) {
        setError('Presale is currently inactive.');
      }
      else if (err.message.includes('denied') || err.code === 'ACTION_REJECTED') {
        setError('User Rejected Transaction, TRY AGAIN')
      }
      else {
        setError('An unexpected error occurred during minting. Please try again later.');
      }
    } finally {
      setMinting(false);
    }
  };


  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-screen py-2"
      >

        {/* <h1 className="text-4xl font-bold text-primary mb-8">Mint Your Chainborn NFT</h1> */}
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Mint Your Chainborn NFT</h1>
        {/* <section className="py-20"> */}
        <section className="py-20 w-full max-w-4xl mx-auto px-4">
          {/* <div className="container mx-auto px-4"> */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // className="max-w-3xl mx-auto text-center"
            className="text-center"
          >
            <ContractStatus />

            <div className="mt-8">
              {!wallet ? (
                // <button
                //   onClick={() => connect()}
                //   disabled={connecting}
                //   className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition-colors"
                // >
                //   {connecting ? 'Connecting...' : 'Connect Wallet'}
                // </button>
                <ConnectWallet
                  theme="dark"
                  btnTitle='Connect Wallet'
                  className='mx-auto'
                />
              ) : (
                // <div className="space-y-6 flex flex-col items-center">
                //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">

                    <button
                      onClick={() => mintNFT(true)}
                      disabled={!isPresaleActive || minting}
                      // className="w-full px-6 py-3 text-lg font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      // className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105"
                      className={`
                        bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 
                        rounded-full font-bold transition-all transform hover:scale-105
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                        disabled:hover:bg-blue-600
                      `}
                    >
                      {minting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Minting...
                        </span>
                      ) : 'Whitelist Mint'}

                      {/* >
                      {minting ? 'Minting...' : 'Whitelist Mint'} */}
                    </button>
                    <button
                      onClick={() => mintNFT(false)}
                      //   disabled={!isPublicSaleActive || minting}
                      //   // className="w-full px-6 py-3 text-lg font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      //   className="border border-white/20 hover:border-white/40 text-white px-8 py-3 rounded-full font-bold transition-all"
                      // >
                      //   {minting ? 'Minting...' : 'Public Mint'}
                      disabled={!isPublicSaleActive || minting}
                      className={`
                      border border-white/20 hover:border-white/40 text-white 
                      px-8 py-3 rounded-full font-bold transition-all
                      disabled:opacity-50 disabled:cursor-not-allowed
                      disabled:hover:border-white/20
                    `}
                    >
                      {minting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Minting...
                        </span>
                      ) : 'Public Mint'}
                    </button>
                  </div>
                </div>
              )}

              {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}
            </div>
            {error && (
              <Notification
                message={error}
                type="error"
                onClose={() => setError('')}
              />
            )}

            {isMintSuccess && (
              // <p className="text-green-500 mt-4">
              //   {successMintMessage}

              // </p>
              <Notification
                message={successMintMessage}
                type="success"
                onClose={() => setIsMintSuccess(false)}
              />
            )}
          </motion.div>
          {/* </div> */}
        </section>
      </motion.div>
    </main>
  );
}


// git commit -m "Deploymet"
// git push -u origin main