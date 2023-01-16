import { WagmiConfig, createClient, configureChains, chain } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'
 
import { alchemyProvider } from 'wagmi/providers/alchemy'


import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'



const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: 'RGl6ALYLxiuktwSl7e0LbzuNwWM8rZPB' })]);


export const client = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains }),
    
  ],
  provider,
  webSocketProvider,
})
