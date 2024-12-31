// 'use client';

// import { useEffect, useState } from 'react';
// import { useNetwork, useSwitchChain } from '@thirdweb-dev/react';
// import { Notification } from './Notification';

// const ABSTRACT_TESTNET_CHAIN_ID = 11124; // Replace with actual Abstract testnet chain ID

// export function NetworkCheck({ children }: { children: React.ReactNode }) {
//     const [showNotification, setShowNotification] = useState(false);
//     const { chain } = useNetwork();
//     const { switchChain } = useSwitchChain();

//     useEffect(() => {
//         if (chain && chain.chainId !== ABSTRACT_TESTNET_CHAIN_ID) {
//             setShowNotification(true);
//             switchChain(ABSTRACT_TESTNET_CHAIN_ID).catch((error) => {
//                 console.error('Error switching chain:', error);
//             });
//         } else {
//             setShowNotification(false);
//         }
//     }, [chain, switchChain]);

//     return (
//         <>
//             {children}
//             {showNotification && (
//                 <Notification
//                     message="Please switch to Abstract Testnet to interact with the contract"
//                     type="info"
//                     onClose={() => setShowNotification(false)}
//                 />
//             )}
//         </>
//     );
// } 