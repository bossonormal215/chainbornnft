'use client'

import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'

const injected = injectedModule()

const web3Onboard = init({
  wallets: [injected],
  chains: [
    {
      id: '0xaa36a7',
      // id: '84532',
      token: 'ETH',
      label: 'Sepolia',
      // label: 'base Sepolia',
      // rpcUrl: 'https://sepolia.infura.io/v3/bc3fba1bbc6a4ab7a4ec1964d16eb8ff'
      rpcUrl: 'https://rpc.sepolia.org'
      // rpcUrl: 'base-sepolia.blockscout.com/tx/{HASH}'
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

