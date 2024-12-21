import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import Layout from "@/components/Layout"
import { Providers } from "@/components/Providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chainborn NFT",
  description: "Mint your Chainborn NFT on the Arbitrum network",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}

