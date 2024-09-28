import React from 'react';
import {
  DynamicContextProvider,
  DynamicWidget,
  useDynamicContext
} from '@dynamic-labs/sdk-react-core';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { createConfig, WagmiProvider, useAccount } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet, arbitrumSepolia } from 'viem/chains';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { $account, $dynamicWallet, $config } from '@/stores/wallet';

$dynamicWallet.subscribe(() => {
  const divs = window.document.querySelector("#dwallet");
  if(divs) divs.click();
})

export const config = createConfig({
  chains: [
    // mainnet, 
    arbitrumSepolia,
  ],
  multiInjectedProviderDiscovery: false,
  transports: {
    // [mainnet.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
  
});
$config.set(config);

const queryClient = new QueryClient();

export default function DynamicReactApp() {
  return (

    <div>

      <DynamicContextProvider
        style={{ display: 'none'}}
        settings={{
          environmentId: '45d5b199-299d-4819-8f62-fa2a379e192d',
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>
              <div style={{ display: 'none'}}>
                <DynamicWidget />
                <AccountInfo />
              </div>
              <ConnectButton style={{ display: 'none'}} />
            </DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
      </DynamicContextProvider>

      

    </div>



  );
}


const ConnectButton = () => {
  const { setShowAuthFlow } = useDynamicContext();
  return (
    <button
      style={{ display: 'none'}}
      id="dwallet"
      onClick={() => {
        // console.log("aaaa")
        setShowAuthFlow(true)
      }}
    >
      Connect your wallet
    </button>
  );
};


function AccountInfo() {
  const { address, isConnected, chain } = useAccount();
  // console.log("bbbbbbbbbbbbbb");
  console.log('account account', address, isConnected, chain, useAccount())

  $account.set( useAccount() );

  console.log($account.get());

  return (
    <div>
      <p>
        wagmi connected: {isConnected ? 'true' : 'false'}
      </p>
      <p>wagmi address: {address}</p>
      <p>wagmi network: {chain?.id}</p>
    </div>
  );
};





