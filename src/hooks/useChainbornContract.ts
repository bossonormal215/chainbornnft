import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CHAINBORN_CONTRACT } from '@/config/contracts';
import { useConnectWallet } from '@web3-onboard/react';

export function useChainbornContract() {
  const [{ wallet }] = useConnectWallet();
  const [contractState, setContractState] = useState({
    totalSupply: 0,
    maxSupply: 0,
    mintPrice: '0',
    isPublicSaleActive: false,
    isPresaleActive: false,
    isRevealed: false,
  });

  useEffect(() => {
    async function fetchContractState() {
      if (!wallet?.provider) return;

      const provider = new ethers.providers.Web3Provider(wallet.provider);
      console.log(`contract address: ${CHAINBORN_CONTRACT.address}`);
      // console.log(`abi : ${CHAINBORN_CONTRACT.abi}`);
      const contract = new ethers.Contract(
        CHAINBORN_CONTRACT.address,
        CHAINBORN_CONTRACT.abi,
        provider
      );

      try {
        const [
          totalSupply,
          maxSupply,
          mintPrice,
          isPublicSaleActive,
          isPresaleActive,
          isRevealed,
        ] = await Promise.all([
          contract.totalSupply(),
          contract.MAX_SUPPLY(),
          contract.MINT_PRICE(),
          contract.isPublicSaleActive(),
          contract.isPresaleActive(),
          contract.isRevealed(),
        ]);

        setContractState({
          totalSupply: totalSupply.toNumber(),
          maxSupply: maxSupply.toNumber(),
          mintPrice: ethers.utils.formatEther(mintPrice),
          isPublicSaleActive,
          isPresaleActive,
          isRevealed,
        });
      } catch (error) {
        console.error('Error fetching contract state:', error);
      }
    }

    fetchContractState();
    const interval = setInterval(fetchContractState, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, [wallet?.provider]);

  return contractState;
}

/*
//////////////////--------------------------///////////////////////
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CHAINBORN_CONTRACT } from '@/config/contracts';
import { useConnectWallet } from '@web3-onboard/react';

export function useChainbornContract() {
  const [{ wallet }] = useConnectWallet();
  const [error, setError] = useState<string | null>(null);
  const [contractState, setContractState] = useState({
    totalSupply: 0,
    maxSupply: 0,
    mintPrice: '0',
    isPublicSaleActive: false,
    isPresaleActive: false,
    isRevealed: false,
  });

  useEffect(() => {
    async function fetchContractState() {
      if (!wallet?.provider) {
        setError('No wallet connected');
        return;
      }

      try {
        const provider = new ethers.providers.Web3Provider(wallet.provider);
        const network = await provider.getNetwork();

        // Verify we're on the correct network (assuming Ethereum mainnet)
        if (network.chainId !== 1) {
          setError('Please connect to Ethereum mainnet');
          return;
        }

        const contract = new ethers.Contract(
          CHAINBORN_CONTRACT.address,
          CHAINBORN_CONTRACT.abi,
          provider
        );

        // Check if contract exists at address
        const code = await provider.getCode(CHAINBORN_CONTRACT.address);
        if (code === '0x') {
          setError('Contract not found at specified address');
          return;
        }

        // Individual try-catch blocks for each call to handle specific failures
        try {
          const totalSupply = await contract.totalSupply();
          const maxSupply = await contract.MAX_SUPPLY();
          const mintPrice = await contract.MINT_PRICE();
          const isPublicSaleActive = await contract.isPublicSaleActive();
          const isPresaleActive = await contract.isPresaleActive();
          const isRevealed = await contract.isRevealed();

          setContractState({
            totalSupply: totalSupply.toNumber(),
            maxSupply: maxSupply.toNumber(),
            mintPrice: ethers.utils.formatEther(mintPrice),
            isPublicSaleActive,
            isPresaleActive,
            isRevealed,
          });

          setError(null);
        } catch (err) {
          console.error('Contract call error:', err);
          setError(
            'Error fetching contract state. Please check console for details.'
          );
        }
      } catch (err) {
        console.error('Provider error:', err);
        setError('Error connecting to network');
      }
    }

    fetchContractState();
    const interval = setInterval(fetchContractState, 10000);

    return () => clearInterval(interval);
  }, [wallet?.provider]);

  return { ...contractState, error };
}
*/
