// 'use client';

// import { ThirdwebProvider } from "@thirdweb-dev/react";
// import { NetworkCheck } from '@/components/NetworkCheck';
// import { metamaskWallet, zerionWallet, coinbaseWallet, walletConnect, rabbyWallet, rainbowWallet } from "@thirdweb-dev/react";

// const activeChain = {
//     chainId: 11124, // Replace with actual Abstract testnet chain ID
//     rpc: ["https://api.testnet.abs.xyz", "api.testnet.abs.xyz"],
//     nativeCurrency: {
//         decimals: 18,
//         name: "Abstract",
//         symbol: "ABS",
//     },
//     shortName: "abs",
//     slug: "abstract",
//     testnet: true,
//     chain: "Abstract",
//     name: "Abstract Testnet",
// };

// export function Providers({ children }: { children: React.ReactNode }) {
//     return (
//         <ThirdwebProvider
//             activeChain={activeChain}
//             clientId="your-client-id" // Replace with your client ID
//             supportedWallets={[
//                 metamaskWallet(),
//                 zerionWallet(),
//                 coinbaseWallet(),
//                 walletConnect(),
//                 rabbyWallet(),
//                 rainbowWallet()
//             ]}
//         >
//             <NetworkCheck>
//                 {children}
//             </NetworkCheck>
//         </ThirdwebProvider>
//     );
// } 