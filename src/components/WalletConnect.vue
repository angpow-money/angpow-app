<!-- 
<template>

    <div class="hidden">
        <w3m-button />
    </div>

</template>



<script setup>

import { createAppKit, useAppKit } from '@reown/appkit/vue'
import { mainnet } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { onMounted, ref } from 'vue';
import { getAccount, watchAccount, reconnect } from '@wagmi/core'
import { config } from '@/wagmiConfig';

import { $account } from '@/stores/wallet'

onMounted( async () => {

    // 1. Get projectId from https://cloud.reown.com
    const projectId = '403fc5eac761cd68c452a912aa15c8f8'
    
    // 2. Create a metadata object - optional
    const metadata = {
        name: 'AppKit',
        description: 'AppKit Example',
        url: 'https://web3modal.com', // origin must match your domain & subdomain
        icons: ['https://avatars.githubusercontent.com/u/179229932']
    }

    const networks = [{
        chainId: 421614,
        chainNamespace: "eip155",
        currency: "tETH",
        explorerUrl: "https://sepolia.arbiscan.io",
        id: "eip155:421614",
        name: "ARBTestnet",
        // rpcUrl: "https://endpoints.omniatech.io/v1/arbitrum/sepolia/public"
        rpcUrl: "https://arb-sepolia.g.alchemy.com/v2/cOI6YkiomPgpNGs89aF2LTMS50_vpRr2"
    }]

    // 3. Create Wagmi Adapter
    const wagmiAdapter = new WagmiAdapter({
        ssr: true,
        projectId,
        networks
    })

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
    })
    
    // 5. Use modal composable
    const walletmodal = useAppKit();
    await walletmodal.open({ view: "Connect" });


    const unwatch = watchAccount(config, {
        onChange(data) {
            console.log('Account changed!', data)
            $account.set(data);
            console.log($account.value)
        },
    })

    reconnect(config);
    // console.log("reconnect reconnect reconnect");


})


</script>
 -->
