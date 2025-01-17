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
    whitelistMintPrice: '0',
    publicMintPrice: '0',
    isPublicSaleActive: false,
    isPresaleActive: false,
    isRevealed: false,
    totalHolders: 0,
  });

  useEffect(() => {
    async function fetchContractState() {
      try {
        // Use a public RPC provider when no wallet is connected
        const provider =
          signer ||
          new ethers.providers.JsonRpcProvider('https://api.testnet.abs.xyz');

        const contract = new ethers.Contract(
          CHAINBORN_CONTRACT.address,
          CHAINBORN_CONTRACT.abi,
          provider
        );

        const [
          totalSupply,
          maxSupply,
          whitelistMintPrice,
          publicMintPrice,
          isPublicSaleActive,
          isPresaleActive,
          isRevealed,
        ] = await Promise.all([
          contract.totalSupply(),
          contract.MAX_SUPPLY(),
          contract.WhitelistMintPrice(),
          contract.PublicMintPrice(),
          contract.isPublicSaleActive(),
          contract.isPresaleActive(),
          contract.isRevealed(),
        ]);

        const holders = await getHolders(contract);

        setContractState({
          totalSupply: totalSupply.toNumber(),
          maxSupply: maxSupply.toNumber(),
          whitelistMintPrice: ethers.utils.formatEther(whitelistMintPrice),
          publicMintPrice: ethers.utils.formatEther(publicMintPrice),
          isPublicSaleActive,
          isPresaleActive,
          isRevealed,
          totalHolders: holders.length,
        });
      } catch (error) {
        console.error('Error fetching contract state:', error);
      }
    }

    fetchContractState();
    const interval = setInterval(fetchContractState, 10000);

    return () => clearInterval(interval);
  }, [signer]);

  async function getHolders(contract: any) {
    const filter = contract.filters.Transfer(null, null);
    const events = await contract.queryFilter(filter);
    const holders = new Set<string>();
    for (const event of events) {
      const to = event.args.to;
      if (to !== ethers.constants.AddressZero) {
        holders.add(to);
      }
    }
    return Array.from(holders);
  }

  return contractState;
}
