'use client'

/*
import { Web3OnboardProvider, init } from '@web3-onboard/react';
import injectedModule, { ProviderLabel } from '@web3-onboard/injected-wallets';
// import metamaskSDK from "@web3-onboard/metamask";
// import trustModule from '@web3-onboard/trust'
// import okxModule from '@web3-onboard/okx' 
// import walletConnectModule from '@web3-onboard/walletconnect'
// import coinbaseModule from '@web3-onboard/coinbase'

// const injected = injectedModule();
const injected = injectedModule({
  filter: {
    [ProviderLabel.Detected]: ['desktop', 'tablet'],
  },
});

/* const metamaskSDKWallet = metamaskSDK({options: {
  extensionOnly: false,
  dappMetadata: {
    name: 'Demo Web3Onboard'
  }
}}) 

const trustWallet = trustModule()
const okx = okxModule()
const coinbase = coinbaseModule()
// const walletConnect = walletConnectModule()

const appMetadata = {
  name: 'Connect Wallet Example',
  icon: '<svg>My App Icon</svg>',
  description: 'Example showcasing how to connect a wallet.',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
  ]
} 

const web3Onboard = init({
  wallets: [
    injected,
    // metamaskSDKWallet,
    // okx,
    // trustWallet,
    // coinbase
    // walletConnect
  ],
  chains: [
    {
      id: '11155111',  //'0xaa36a7',
      // id: '84532',
      token: 'ETH',
      label: 'Sepolia',
      // label: 'base Sepolia',
      // rpcUrl: 'https://sepolia.infura.io/v3/bc3fba1bbc6a4ab7a4ec1964d16eb8ff'
      rpcUrl: 'https://rpc.sepolia.org'
      // rpcUrl: 'base-sepolia.blockscout.com/tx/{HASH}'
    },
    {
      id: '0x2b74', //11124',
      token: 'ETH',
      label: 'Abstract Testnet',
      rpcUrl: 'https://api.testnet.abs.xyz'
    }
  ]
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      {children}
    </Web3OnboardProvider>
  )
}
*/



import { ThirdwebProvider } from "@thirdweb-dev/react/evm";
import { embeddedWallet, metamaskWallet, zerionWallet, coinbaseWallet, walletConnect, rabbyWallet, rainbowWallet } from "@thirdweb-dev/react";
// import { Sepolia } from "@thirdweb-dev/chains";
// import { abstractTestnet } from "thirdweb/chains";

const activeChain = {
  chainId: 11124, // Replace with actual Abstract testnet chain ID
  rpc: ["https://api.testnet.abs.xyz", "api.testnet.abs.xyz"],
  nativeCurrency: {
    decimals: 18,
    name: "Abstract",
    symbol: "ABS",
  },
  shortName: "abs",
  slug: "abstract",
  testnet: true,
  chain: "Abstract",
  name: "Abstract Testnet",
};

// const activeChain = 'abstractTestnet';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      // supportedChains={[abstractTestnet]}
      autoSwitch={true}
      supportedWallets={[
        embeddedWallet(),
        metamaskWallet(),
        zerionWallet(),
        coinbaseWallet(),
        walletConnect(),
        rabbyWallet(),
        rainbowWallet()
      ]}
    >
      {children}
    </ThirdwebProvider>
  )
}



