import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CHAINBORN_CONTRACT } from '@/config/contracts';
import { useSigner } from '@thirdweb-dev/react';

export function useChainbornContract() {
  // const wallet = useAddress();
  const signer = useSigner();
  
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
      try {
        // Use a public RPC provider when no wallet is connected
        const provider = signer || new ethers.providers.JsonRpcProvider("https://api.testnet.abs.xyz");
        
        const contract = new ethers.Contract(
          CHAINBORN_CONTRACT.address,
          CHAINBORN_CONTRACT.abi,
          provider
        );

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
    const interval = setInterval(fetchContractState, 10000);

    return () => clearInterval(interval);
  }, [signer]);

  return contractState;
}
