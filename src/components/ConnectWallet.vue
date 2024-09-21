<template>
  <div class="w-full" @click="openModal()">
    <slot></slot>
  </div>
</template>

<script setup>
import { createAppKit, useAppKit, useAppKitEvents } from "@reown/appkit/vue";
import { mainnet } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { walletConnect, coinbaseWallet, injected } from '@wagmi/connectors'

import { onMounted, ref } from "vue";
import { http, WagmiProvider, CreateConnectorFn } from 'wagmi'
import { getAccount, watchAccount, reconnect, connect, watchConnections } from "@wagmi/core";

import { config } from "@/wagmiConfig";

import { $account } from "@/stores/wallet";

import { useEventBus } from '@vueuse/core'
const appkitBus = useEventBus('appkit')


// const account = useStore($account)

const emit = defineEmits(["connected"])

onMounted(async () => {
  // 1. Get projectId from https://cloud.reown.com
  const projectId = "403fc5eac761cd68c452a912aa15c8f8";

  // 2. Create a metadata object - optional
  const metadata = {
    name: "AppKit",
    description: "AppKit Example",
    url: "https://web3modal.com", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/179229932"],
  };

  const networks = [
    {
      chainId: 421614,
      chainNamespace: "eip155",
      currency: "tETH",
      explorerUrl: "https://sepolia.arbiscan.io",
      id: "eip155:421614",
      name: "ARBTestnet",
      rpcUrl: "https://endpoints.omniatech.io/v1/arbitrum/sepolia/public",
    },
  ];

  // 3. Create Wagmi Adapter
  const wagmiAdapter = new WagmiAdapter({
    ssr: true,
    projectId,
    networks,
  });
  console.log("wagmiAdapter", wagmiAdapter)

  // 4. Create modal
  createAppKit({
    adapters: [wagmiAdapter],
    networks: networks,
    metadata,
    projectId,
    features: {
      analytics: true, // Optional - defaults to your Cloud configuration
      onramp: true,
    },
    defaultNetwork: networks[0]
  });

  // 5. Use modal composable
  // const walletmodal = useAppKit();
  const events = useAppKitEvents();
  console.log("events events ", events);

  // await walletmodal.open({ view: "Connect" });

  // const unwatch = watchAccount(config, {
  const unwatch = watchConnections(config, {
    onChange(data) {
      console.log("Account changed!", data);
      $account.set(data);
      console.log($account.value);
      if(data.address && data.chainId === networks[0].chainId) {
        emit('connected')
      }
    },
  });

  const acc = getAccount(config);
  console.log("acc", acc);
  if(acc?.address && acc?.chainId === networks[0].chainId) emit('connected');

  reconnect(config);
  // console.log("reconnect reconnect reconnect");
});

const openModal = async () => {

  console.log('bbbbbb');
  const walletmodal = useAppKit();
  console.log("walletmodal", walletmodal);
  // await walletmodal.open({ view: "Connect" });
  await walletmodal.open();
};

appkitBus.on( async (event) => {
  if(event === 'open'){
    console.log('aaaaaa');
    // console.log('connected')
    const walletmodal = useAppKit();
    // await walletmodal.open({ view: "Connect" });
    await walletmodal.open();
    // await connect(config, { connector: injected() })
  }
})
</script>
