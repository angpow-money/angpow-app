


<template>


    <div @click="openOpen()">Open $dynamicWallet</div>


</template>



<script setup>

import { $account } from "@/stores/wallet";
import { onMounted, ref } from "vue";
import { connect, getAccount } from '@wagmi/core'
import { config } from '@/components/DynamicReactApp'
import { $dynamicWallet } from "@/stores/wallet";

const openOpen = () => {
    console.log("openOpen openOpen openOpen")
    $dynamicWallet.set(!$dynamicWallet.get());
}

const openWallet = async () => {
    console.log('open wallet');
    const account = getAccount(config);
    console.log(account);
}

</script>