


<template>


    <div v-for="angpow of angpowList.created" >
        <div>{{ angpow?.angpow_id }}</div>
    </div>

    <div v-for="angpow of angpowList.received" >
        <div>{{ angpow?.angpow_id }}</div>
    </div>


</template>



<script setup>

import { $account } from "@/stores/wallet";
import { onMounted, ref } from "vue";
const angpowList = ref([]);

onMounted( async () => {

    $account.subscribe( async () => {

        if($account.value?.address) {
            angpowList.value = await fetch(`/api/wallet/${$account.value?.address}.json`).then(res => res.json())
        }
        
    })



})

</script>