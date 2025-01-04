
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
                        {/* <div className="text-green-500 text-sm font-mono break-all">{CONTRACT_ADDRESS}</div> */}
                        <a 
                  href="https://explorer.testnet.abs.xyz/address/0xF49E5C2A581baE5f849971cfE927C7619374Fc97"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-400 text-sm font-mono break-all transition-colors"
                >
                  {CONTRACT_ADDRESS}
                </a>
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