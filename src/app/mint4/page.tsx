'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import { ConnectWallet, useSigner, useAddress } from '@thirdweb-dev/react/evm';
import { CHAINBORN_CONTRACT } from '@/config/contracts';
import { useChainbornContract } from '@/hooks/useChainbornContract';
import { Notification } from '@/components/Notification';
import Image from 'next/image';
import chainbornImage from '/src/app/images/chainborn2.png';
import { HermesClient } from '@pythnetwork/hermes-client';


const CONTRACT_ADDRESS = CHAINBORN_CONTRACT.address;
const ABI = CHAINBORN_CONTRACT.abi;

export default function Mint() {
    const wallet = useAddress();
    const signer = useSigner();
    const [minting, setMinting] = useState(false);
    const [error, setError] = useState('');
    const [isMintSuccess, setIsMintSuccess] = useState(false);
    const [successMintMessage, setSuccessMintMessage] = useState('');
    const { isPresaleActive, isPublicSaleActive, totalSupply, maxSupply, totalHolders } = useChainbornContract();

    const [quantity, setQuantity] = useState(1); // State for quantity
    const connection = new HermesClient('https://hermes.pyth.network', {});
    const priceFeedId = ['0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',];

    const mintNFT = async (isWhitelist: boolean) => {
        if (!wallet) {
            setError('Please connect your wallet first.');
            return;
        }

        if (!signer) {
            setError('Signer not available. Please try reconnecting your wallet.');
            return;
        }

        // Validate quantity
        if (isWhitelist && quantity > 2) {
            setError('Maximum mint quantity for whitelist is 2.');
            return;
        }

        setMinting(true);
        setError('');

        try {
            // Latest price updates
            const priceUpdates = await connection.getLatestPriceUpdates(priceFeedId);

            // Extract the price from the price update
            const priceFeedUpdateData1 = priceUpdates.binary.data[0];
            const formattedPrice = `0x${priceFeedUpdateData1}`; // Prefix with 0x

            // Update the price in the smart contract
            const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
            const updatePriceTx = await contract.updatePrice([formattedPrice]);
            await updatePriceTx.wait();
            console.log("Price updated successfully");

            // Determine the mint value based on the sale type
            const ethUsdPrice = await contract.getEthUsdPrice();
            const whitelistMintPrice = await contract.WhitelistMintPrice();
            const publicMintPrice = await contract.PublicMintPrice();
            const mintValue = isWhitelist ? whitelistMintPrice : publicMintPrice;
            console.log("Mint Price In USD: ", mintValue as any * 1e18); // Log in ETH
            console.log("ETH PRICE: ", ethUsdPrice.toString());

            // Calculate mint price in ETH
           const ethUsdPriceNum = parseFloat(ethers.utils.formatUnits(ethUsdPrice, 2));
           console.log("tracing: ", ethUsdPriceNum)
           const MintPriceNum = parseFloat(
           ethers.utils.formatUnits(mintValue, 2)
            );
            console.log("Tracing: ", MintPriceNum)
           const mintPriceInEth = MintPriceNum / ethUsdPriceNum;
            // Log the mint price in ETH
            console.log("Mint Price in ETH:", mintPriceInEth.toFixed(3)); // Display to 3 decimals
            const totalPriceInEth = mintPriceInEth * quantity;

            console.log(
            `Minting ${quantity} NFT(s) for ${totalPriceInEth.toFixed(3)} ETH`
             );

            // Convert to wei for the transaction
            const totalPriceInWei = ethers.utils.parseEther(totalPriceInEth.toFixed(18));
            console.log("Total Price In wei: ", totalPriceInWei.toString());

            // Proceed with the minting transaction
            const tx = await contract[isWhitelist ? 'whitelistMint' : 'mint'](quantity, { value: totalPriceInWei })//{ value: mintValue.mul(quantity) }); // Multiply mintValue by quantity
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
                            <div className="text-white text-lg">{totalHolders}</div>
                        </div>
                        <div className="bg-[#111827] p-4 rounded-lg">
                            <div className="text-[#00FF00] text-lg font-bold">Minting Period</div>
                            <div className="text-white text-sm">01.17.2024 - 01.24.2024</div>
                        </div>
                    </div>

                    {/* status message */}
                    <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${isPresaleActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                  <span className="text-gray-400">Presale: {isPresaleActive ? 'Minting' : 'Not Live'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${isPublicSaleActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                  <span className="text-gray-400">Public Sale: {isPublicSaleActive ? 'Minting' : 'Not Live'}</span>
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

                     {/* Quantity Input */}
                     <div className="flex items-center space-x-2">
                        <label htmlFor="quantity" className="text-sm">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, Math.min(10, Number(e.target.value))))} // Limit quantity between 1 and 10
                            
                            className="w-16 h-6 rounded bg-white text-black text-sm px-2 text-center "
                            min="1"
                            max="10"
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