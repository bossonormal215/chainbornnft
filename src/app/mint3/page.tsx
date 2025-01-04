// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { ethers } from 'ethers';
// import { ConnectWallet, useSigner, useAddress } from '@thirdweb-dev/react/evm';
// import { CHAINBORN_CONTRACT } from '@/config/contracts';
// import { useChainbornContract } from '@/hooks/useChainbornContract';
// import { Notification } from '@/components/Notification';
// import Image from 'next/image';
// import chainbornImage from '/src/app/images/chainborn.png';

// const CONTRACT_ADDRESS = CHAINBORN_CONTRACT.address;
// const ABI = CHAINBORN_CONTRACT.abi;

// export default function Mint() {
//   const wallet = useAddress();
//   const signer = useSigner();
//   const [minting, setMinting] = useState(false);
//   const [error, setError] = useState('');
//   const [isMintSuccess, setIsMintSuccess] = useState(false);
//   const [successMintMessage, setSuccessMintMessage] = useState('');
//   const { isPresaleActive, isPublicSaleActive, mintPrice, totalSupply, maxSupply } = useChainbornContract();

//   const mintNFT = async (isWhitelist: boolean) => {
//     if (!wallet) {
//       setError('Please connect your wallet first.');
//       return;
//     }

//     if (!signer) {
//       setError('Signer not available. Please try reconnecting your wallet.');
//       return;
//     }

//     setMinting(true);
//     setError('');

//     try {
//       const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
//       const mintValue = ethers.utils.parseEther(mintPrice);
//       const tx = await contract[isWhitelist ? 'whitelistMint' : 'mint'](1, { value: mintValue });
//       await tx.wait(1);
//       setIsMintSuccess(true);
//       setSuccessMintMessage('Successfully Minted A New CHAINBORN NFT');
//       setTimeout(() => setIsMintSuccess(false), 15000);
//     } catch (err: any) {
//       console.error('Minting error:', err);
//       if (err.code === 'INSUFFICIENT_FUNDS') {
//         setError('You do not have enough ETH to cover the minting cost.');
//       } else if (err.message.includes('whitelist')) {
//         setError('You are not whitelisted for the presale mint.');
//       } else if (err.message.includes('Public sale is not active')) {
//         setError('Public sale is currently inactive.');
//       } else if (err.message.includes('Presale is not active')) {
//         setError('Presale is currently inactive.');
//       } else if (err.message.includes('denied') || err.code === 'ACTION_REJECTED') {
//         setError('User Rejected Transaction, TRY AGAIN');
//       } else {
//         setError('An unexpected error occurred during minting. Please try again later.');
//       }
//     } finally {
//       setMinting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col items-center">
//       <div className="container mx-auto px-4 py-12">
//         <div className="text-center mb-8">
//           {/* <Image
//             src={chainbornImage}
//             alt="Chainborn"
//             className="rounded-lg mb-6"
//             width={512}
//             height={512}
//           /> */}
//           <h1 className="text-6xl font-bold mb-4 text-[#00FF00]">MintID: Unlock your Pandora's box in Mint Ecosystem</h1>
//           <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
//             MintID is a multifunctional asset and super equity pass of Mint Blockchain, designed to explore the NFT possibilities in various application scenarios and provide holders the ongoing value within Mint Blockchain ecosystem. The initial batch of MintID will be released through a limited-time and limited-quantity sale.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Left Column */}
//           <div className="space-y-6">
//             <div className="bg-[#111827] p-6 rounded-xl">
//               <div className="text-gray-400 text-sm uppercase tracking-wider">Items</div>
//               <div className="text-[#00FF00] text-3xl font-bold mb-2">{totalSupply}/<span className='text-white'>{maxSupply}</span></div>
//             </div>
//             <div className="bg-[#111827] p-6 rounded-xl">
//               <div className="text-gray-400 text-sm uppercase tracking-wider">Price</div>
//               <div className="text-white text-3xl font-bold mb-2">{mintPrice} ETH</div>
//             </div>
//             <div className="bg-[#111827] p-6 rounded-xl">
//               <div className="text-gray-400 text-sm uppercase tracking-wider">Mint Date</div>
//               <div className="text-white text-3xl font-bold mb-2">{new Date().toLocaleDateString()}</div>
//             </div>
//             <div className="bg-gray-900 p-4 rounded-lg">
//               <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">Contract Address</div>
//               <div className="text-green-500 text-sm font-mono break-all">{CONTRACT_ADDRESS}</div>
//             </div>

//             <div className="space-y-4">
//               {!wallet ? (
//                 <ConnectWallet
//                   theme="dark"
//                   btnTitle="Connect Wallet"
//                   className="w-full !bg-green-500 hover:!bg-green-600"
//                 />
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <button
//                     onClick={() => mintNFT(true)}
//                     disabled={!isPresaleActive || minting}
//                     className={`bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full`}
//                   >
//                     {minting ? 'Minting...' : 'Whitelist Mint'}
//                   </button>
//                   <button
//                     onClick={() => mintNFT(false)}
//                     disabled={!isPublicSaleActive || minting}
//                     className={`border-2 border-green-500 text-green-500 px-8 py-3 rounded-lg font-bold transition-all hover:bg-green-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed w-full`}
//                   >
//                     {minting ? 'Minting...' : 'Public Mint'}
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="relative w-full max-w-md ml-auto">
//             <div className="bg-[#00FF00] rounded-3xl p-8 aspect-[4/5] relative overflow-hidden">
//               <div className="absolute inset-0 flex items-center justify-center text-[12rem] font-bold text-[#00FF00]/20">Min</div>
//               <div className="relative z-10">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <div className="text-4xl font-bold">#{totalSupply}</div>
//                     <div className="text-xl mt-2">{wallet ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}` : 'Connect Wallet'}</div>
//                   </div>
//                   <img src="/placeholder.svg?height=48&width=48" alt="Profile" className="w-12 h-12 rounded-full" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {error && (
//           <Notification message={error} type="error" onClose={() => setError('')} />
//         )}

//         {isMintSuccess && (
//           <Notification message={successMintMessage} type="success" onClose={() => setIsMintSuccess(false)} />
//         )}
//       </div>
//     </div>
//   );
// }

// ///////////////////---------------------////////////////////////
// 'use client';

// import { useState } from 'react';
// import { ethers } from 'ethers';
// import { ConnectWallet, useSigner, useAddress } from '@thirdweb-dev/react/evm';
// import { CHAINBORN_CONTRACT } from '@/config/contracts';
// import { useChainbornContract } from '@/hooks/useChainbornContract';
// import { Notification } from '@/components/Notification';
// import Image from 'next/image';
// import chainbornImage from '/src/app/images/chainborn.png';

// const CONTRACT_ADDRESS = CHAINBORN_CONTRACT.address;
// const ABI = CHAINBORN_CONTRACT.abi;

// export default function Mint() {
//   const wallet = useAddress();
//   const signer = useSigner();
//   const [minting, setMinting] = useState(false);
//   const [error, setError] = useState('');
//   const [isMintSuccess, setIsMintSuccess] = useState(false);
//   const [successMintMessage, setSuccessMintMessage] = useState('');
//   const { isPresaleActive, isPublicSaleActive, mintPrice, totalSupply, maxSupply } = useChainbornContract();

//   const mintNFT = async (isWhitelist: boolean) => {
//     if (!wallet) {
//       setError('Please connect your wallet first.');
//       return;
//     }

//     if (!signer) {
//       setError('Signer not available. Please try reconnecting your wallet.');
//       return;
//     }

//     setMinting(true);
//     setError('');

//     try {
//       const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
//       const mintValue = ethers.utils.parseEther(mintPrice);
//       const tx = await contract[isWhitelist ? 'whitelistMint' : 'mint'](1, { value: mintValue });
//       await tx.wait(1);
//       setIsMintSuccess(true);
//       setSuccessMintMessage('Successfully Minted A New CHAINBORN NFT');
//       setTimeout(() => setIsMintSuccess(false), 15000);
//     } catch (err: any) {
//       console.error('Minting error:', err);
//       if (err.code === 'INSUFFICIENT_FUNDS') {
//         setError('You do not have enough ETH to cover the minting cost.');
//       } else if (err.message.includes('whitelist')) {
//         setError('You are not whitelisted for the presale mint.');
//       } else if (err.message.includes('Public sale is not active')) {
//         setError('Public sale is currently inactive.');
//       } else if (err.message.includes('Presale is not active')) {
//         setError('Presale is currently inactive.');
//       } else if (err.message.includes('denied') || err.code === 'ACTION_REJECTED') {
//         setError('User Rejected Transaction, TRY AGAIN');
//       } else {
//         setError('An unexpected error occurred during minting. Please try again later.');
//       }
//     } finally {
//       setMinting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col items-center">
//       <div className="container mx-auto px-4 py-12">
//         <h1 className="text-5xl font-bold mb-4 text-[#00FF00] text-center">MintID: Unlock your Pandora's box in Mint Ecosystem</h1>
//         <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto text-center mb-8">
//           MintID is a multifunctional asset and super equity pass of Mint Blockchain, designed to explore the NFT possibilities in various application scenarios and provide holders the ongoing value within Mint Blockchain ecosystem. The initial batch of MintID will be released through a limited-time and limited-quantity sale.
//         </p>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Left Column */}
//           <div className="space-y-6">
//             <div className="bg-[#111827] p-6 rounded-xl">
//               <div className="text-[#00FF00] text-3xl font-bold mb-2">Items</div>
//               <div className="text-white text-2xl">{totalSupply}/{maxSupply}</div>
//             </div>
//             <div className="bg-[#111827] p-6 rounded-xl">
//               <div className="text-[#00FF00] text-3xl font-bold mb-2">Price</div>
//               <div className="text-white text-2xl">{mintPrice} ETH</div>
//             </div>
//             <div className="bg-[#111827] p-6 rounded-xl">
//               <div className="text-[#00FF00] text-3xl font-bold mb-2">Mint Date</div>
//               <div className="text-white text-2xl">{new Date().toLocaleDateString()}</div>
//             </div>
//             <div className="bg-gray-900 p-4 rounded-lg">
//               <div className="text-[#00FF00] text-3xl font-bold mb-2">Contract Address</div>
//               <div className="text-green-500 text-sm font-mono break-all">{CONTRACT_ADDRESS}</div>
//             </div>

//             <div className="space-y-4">
//               {!wallet ? (
//                 <ConnectWallet
//                   theme="dark"
//                   btnTitle="Connect Wallet"
//                   className="w-full !bg-green-500 hover:!bg-green-600"
//                 />
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <button
//                     onClick={() => mintNFT(true)}
//                     disabled={!isPresaleActive || minting}
//                     className={`bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full`}
//                   >
//                     {minting ? 'Minting...' : 'Whitelist Mint'}
//                   </button>
//                   <button
//                     onClick={() => mintNFT(false)}
//                     disabled={!isPublicSaleActive || minting}
//                     className={`border-2 border-green-500 text-green-500 px-8 py-3 rounded-lg font-bold transition-all hover:bg-green-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed w-full`}
//                   >
//                     {minting ? 'Minting...' : 'Public Mint'}
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column with NFT Image */}
//           <div className="relative w-full max-w-md ml-auto">
//             <div className="bg-[#00FF00] rounded-3xl p-8 aspect-[4/5] relative overflow-hidden">
//               <Image
//                 src={chainbornImage}
//                 alt="Chainborn NFT"
//                 className="rounded-lg"
//                 layout="responsive"
//                 width={512} // Adjust width as needed
//                 height={512} // Adjust height as needed
//               />
//               <div className="absolute inset-0 flex items-center justify-center text-[12rem] font-bold text-[#00FF00]/20">
//                 #{totalSupply}
//               </div>
//               <div className="relative z-10 text-center">
//                 <div className="text-xl mt-2">{wallet ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}` : 'Connect Wallet'}</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {error && (
//           <Notification message={error} type="error" onClose={() => setError('')} />
//         )}

//         {isMintSuccess && (
//           <Notification message={successMintMessage} type="success" onClose={() => setIsMintSuccess(false)} />
//         )}
//       </div>
//     </div>
//   );
// }

/////////////////////////------------------------------------/////////////////////////////////////
'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import { ConnectWallet, useSigner, useAddress } from '@thirdweb-dev/react/evm';
import { CHAINBORN_CONTRACT } from '@/config/contracts';
import { useChainbornContract } from '@/hooks/useChainbornContract';
import { Notification } from '@/components/Notification';
import Image from 'next/image';
import chainbornImage from '/src/app/images/chainborn2.png';

const CONTRACT_ADDRESS = CHAINBORN_CONTRACT.address;
const ABI = CHAINBORN_CONTRACT.abi;

export default function Mint() {
    const wallet = useAddress();
    const signer = useSigner();
    const [minting, setMinting] = useState(false);
    const [error, setError] = useState('');
    const [isMintSuccess, setIsMintSuccess] = useState(false);
    const [successMintMessage, setSuccessMintMessage] = useState('');
    const { isPresaleActive, isPublicSaleActive, mintPrice, totalSupply, maxSupply } = useChainbornContract();

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
            const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
            const mintValue = ethers.utils.parseEther(mintPrice);
            const tx = await contract[isWhitelist ? 'whitelistMint' : 'mint'](1, { value: mintValue });
            await tx.wait(1);
            setIsMintSuccess(true);
            setSuccessMintMessage('Successfully Minted A New CHAINBORN NFT');
            setTimeout(() => setIsMintSuccess(false), 15000);
        } catch (err: any) {
            console.error('Minting error:', err);
            if (err.code === 'INSUFFICIENT_FUNDS') {
                setError('You do not have enough ETH to cover the minting cost.');
            } else if (err.message.includes('whitelist')) {
                setError('You are not whitelisted for the presale mint.');
            } else if (err.message.includes('Public sale is not active')) {
                setError('Public sale is currently inactive.');
            } else if (err.message.includes('Presale is not active')) {
                setError('Presale is currently inactive.');
            } else if (err.message.includes('denied') || err.code === 'ACTION_REJECTED') {
                setError('User Rejected Transaction, TRY AGAIN');
            } else {
                setError('An unexpected error occurred during minting. Please try again later.');
            }
        } finally {
            setMinting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center">
            <div className="px-4 py-12 flex flex-col lg:flex-row">
                {/* Left Column */}
                <div className="flex-1 space-y-6 order-0 lg:order-0">
                    <h3 className="text-4xl font-bold mb-6 tracking-tight">
                        <span className="text-[#00FF00]">ChainBorn:</span> Unlock your
                        <br />Genesis NFT in the
                        <br />Abstract Ecosystem
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed">
                        ChainBorn is a genesis NFT project bridging Arbitrum and Abstract Chain,
                        designed to provide holders with exclusive benefits and future airdrops
                        when Abstract Chain launches on mainnet.
                    </p>
    
                    {/* Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#111827] p-4 rounded-lg">
                            <div className="text-[#00FF00] text-lg font-bold">Items</div>
                            <div className="text-white text-lg">{totalSupply}/{maxSupply}</div>
                        </div>
                        <div className="bg-[#111827] p-4 rounded-lg">
                            <div className="text-[#00FF00] text-lg font-bold">Holders</div>
                            <div className="text-white text-lg">{totalSupply}</div>
                        </div>
                        <div className="bg-[#111827] p-4 rounded-lg">
                            <div className="text-[#00FF00] text-lg font-bold">Minting Period</div>
                            <div className="text-white text-sm">01.17.2024 - 01.24.2024</div>
                        </div>
                    </div>
    
                    {/* NFT Image (Mobile only order adjustment) */}
                    <div className="lg:hidden order-2">
                        <Image
                            src={chainbornImage}
                            alt="Chainborn NFT"
                            className="rounded-lg"
                            layout="responsive"
                            width={150}
                            height={250}
                        />
                    </div>
    
                    <div className="bg-gray-900 p-4 rounded-lg mt-4">
                        <div className="text-[#00FF00] text-lg font-bold">Contract Address</div>
                        <div className="text-green-500 text-sm font-mono break-all">{CONTRACT_ADDRESS}</div>
                    </div>
    
                    {/* Mint Buttons */}
                    <div className="space-y-4 mt-4 order-3">
                        {!wallet ? (
                            <ConnectWallet
                                theme="dark"
                                btnTitle="Connect Wallet"
                                className="w-full !bg-green-500 hover:!bg-green-600"
                            />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => mintNFT(true)}
                                    disabled={!isPresaleActive || minting}
                                    className={`bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full`}
                                >
                                    {minting ? 'Minting...' : 'Whitelist Mint'}
                                </button>
                                <button
                                    onClick={() => mintNFT(false)}
                                    disabled={!isPublicSaleActive || minting}
                                    className={`border-2 border-green-500 text-green-500 px-8 py-3 rounded-lg font-bold transition-all hover:bg-green-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed w-full`}
                                >
                                    {minting ? 'Minting...' : 'Public Mint'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
    
                {/* Right Column with NFT Image (Desktop only) */}
                <div className="hidden lg:block flex-shrink-0 w-full max-w-xs ml-8 mr-8 mt-8">
                    <Image
                        src={chainbornImage}
                        alt="Chainborn NFT"
                        className="rounded-lg"
                        layout="responsive"
                        width={150}
                        height={250}
                    />
                </div>
            </div>
    
            {error && (
                <Notification message={error} type="error" onClose={() => setError('')} />
            )}
    
            {isMintSuccess && (
                <Notification message={successMintMessage} type="success" onClose={() => setIsMintSuccess(false)} />
            )}
        </div>
    );
    
}