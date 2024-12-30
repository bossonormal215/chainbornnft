'use client';

import {  useState } from 'react';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
import { useConnectWallet } from '@web3-onboard/react';
import { ContractStatus } from '@/components/ContractStatus';
import { CHAINBORN_CONTRACT } from '@/config/contracts';
import { useChainbornContract } from '@/hooks/useChainbornContract';


 /*const CONTRACT_ADDRESS = '0x196F7638B53c2a1adA87e7689e67fd510350e744';
// const CONTRACT_ADDRESS = '0xb013C49AB955770B8dDdc3DFF627879998c809a6';
const ABI = [
  'function mint(uint256 quantity) external payable',
  'function whitelistMint() external payable',
  'function isPresaleActive() public view returns (bool)',
  'function isPublicSaleActive() public view returns (bool)',
  'function whitelist(address) public view returns (bool)'
];  */

const CONTRACT_ADDRESS = CHAINBORN_CONTRACT.address
const ABI = CHAINBORN_CONTRACT.abi

export default function Mint() {
  const [{ wallet, connecting }, connect] = useConnectWallet();
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState('');
  const [isMintSuccess, setIsMintSuccess] = useState(false);
  const [successMintMessage, setSuccessMintMessage] = useState('')
  const  {isPresaleActive, isPublicSaleActive} = useChainbornContract()

  const mintNFT = async (isWhitelist: boolean) => {
    if (!wallet) {
      setError('Please connect your wallet first.');
      return;
    }

    setMinting(true);
    setError('');

    try {
      const provider = new ethers.providers.Web3Provider(wallet.provider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      let tx;
      if (isWhitelist) {
        tx = await contract.whitelistMint(1, { value: ethers.utils.parseEther('0.03001') });
      } else {
        tx = await contract.mint(1, { value: ethers.utils.parseEther('0.03001') });
      }

      await tx.wait(1);
      setIsMintSuccess(true);
      // {setTimeout(() => alert('NFT minted successfully!'), 5000)};
      setSuccessMintMessage('Successfully Minted A New CHAINBORN NFT');
      // setIsMintSuccess(false);
      {setTimeout(() => setIsMintSuccess(false), 15000)}
    } catch (err: any) {
      // setError(err.message || 'An error occurred while minting.');
      if (err.code === 'INSUFFICIENT_FUNDS') {
        {setTimeout(() => setError('You do not have enough ETH to cover the minting cost.'), 5000)};
      } else if (err.message.includes('whitelist')) {
        {setTimeout(() => setError('You are not whitelisted for the presale mint.'), 5000)};
      } else if (err.message.includes('Public sale is not active')) {
        {setTimeout(() => setError('Public sale is currently inactive.'), 5000)};
      } else if (err.message.includes('Presale is not active')) {
        {setTimeout(() => setError('Presale is currently inactive.'), 5000)};
      } 
      else if (err.message.includes('denied')){
        {setTimeout(() => setError('Transaction Denied by YOU, TRY AGAIN'), 5000)}
      }
      else {
        {setTimeout(() => setError('An unexpected error occurred during minting. Please try again later.'), 5000)};
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
      
      <h1 className="text-4xl font-bold text-primary mb-8">Mint Your Chainborn NFT</h1>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
      <ContractStatus />
      {!wallet ? (
        <button
          onClick={() => connect()}
          disabled={connecting}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition-colors"
        >
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="space-y-6 flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
          <button
            onClick={() => mintNFT(true)}
            disabled={!isPresaleActive || minting}
            // className="w-full px-6 py-3 text-lg font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105"
          >
            {minting ? 'Minting...' : 'Whitelist Mint'}
          </button>
          <button
            onClick={() => mintNFT(false)}
            disabled={!isPublicSaleActive || minting }
            // className="w-full px-6 py-3 text-lg font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            className="border border-white/20 hover:border-white/40 text-white px-8 py-3 rounded-full font-bold transition-all"
          >
            {minting ? 'Minting...' : 'Public Mint'}
          </button>
        </div>
      </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {isMintSuccess && (
        <p className="text-green-500 mt-4">
          {successMintMessage}
    
          </p>
       )}
         </motion.div>
        </div>
       </section>
      </motion.div>
    </main>
  );
}

