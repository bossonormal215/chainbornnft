// import { useEffect, useState } from 'react'
// import { useConnectWallet } from '@web3-onboard/react'
// import { ethers } from 'ethers'

// export default function ConnectWallet() {
//   const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
//   const [ethersProvider, setProvider] = useState<ethers.providers.Web3Provider | null>()

//   useEffect(() => {
//     // If the wallet has a provider than the wallet is connected
//     if (wallet?.provider) {
//       setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
//     // if using ethers v6 this is:
//     // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
//     }
//   }, [wallet])

//   return (
//     <div>
//       <button
//         disabled={connecting}
//         onClick={() => connect()}
//         >
//         Connect
//       </button>
//     </div>
//   )
// }
