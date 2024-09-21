<template>
    
    
    <div class="w-full h-[100dvh] flex justify-center items-center bg-white pointer-events-none">

        <div class="w-full flex justify-between items-center fixed top-0 left-0 pointer-events-none p-4">
            
            <div class="w-16 h-16 rounded-full shadow-xl border border-black/10 flex justify-center items-center">
                home
            </div>

      <p v-if="userEnsName" class="text-right"><span class="text-xl">{{userEnsName}}</span><br><span class="opacity-25">.angpao.money</span></p>

        </div>

        <div class="fixed w-screen h-[100dvh] flex-col flex justify-center items-center pointer-events-auto" @click="angpaoTap()">
            <Angpao ></Angpao>
        </div>

        <ConnectWallet @connected="walletConnected()"></ConnectWallet>


        <div class="w-full absolute bottom-0 px-4 pb-2 flex flex-col justify-center items-center">

            <p>From</p>
            <div class="shadow-xl shadow-black/20 rounded-full px-6 py-3 text-xl border mt-4 mb-8 bg-white">
              <p>{{donatorEnsName}}.angpao.money</p>
            </div>

            <template v-if="!claimStart">

                
                            <button v-if="!canStart" @click="connectWallet()" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">
                                <div class="animate-bounce">Connect Wallet to Open</div>
                            </button>
                
        <button v-if="canStart" @click="openAngpao()" :disabled="angpow.received" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">
          <div class="animate-bounce">{{angpow.received ? "Received" : "Open!"}}</div>
                            </button>

            </template>

            <template v-else>

                <button v-if="claimBusy" class="btn w-full bg-black ring-black ring-offset-2 ring-4 ring-offset-white text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 ">
                                <div class="animate-bounce">Opening...</div>
                            </button>

                            <button v-if="!claimBusy" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto ">
                                <div class="">See all Angpao</div>
                            </button>
            </template>
            
        </div>

    </div>


</template>

<script setup>


import { ref, onMounted  } from "vue";
import Angpao from "./Angpao.vue";

import ConnectWallet from "@/components/ConnectWallet.vue"
import { useEventBus } from '@vueuse/core'
const appkitBus = useEventBus('appkit')


import { useStore } from "@nanostores/vue";
import { $state, $show_palette, $zoom_close, $zoom_far, $flip_angpao, $open_angpao, $pan_up, $pan_up_palette, $pan_down, $pan_down_open, $token_up, $angpao_value, receiveAngpow, $angpao_message, $angpao_design, $selectedColorClass, $selectedBgColor } from "@/stores/angpao";
import { $account } from '@/stores/wallet';

const flip_angpao = useStore($flip_angpao);
const canStart = ref(false);

const claimStart = ref(false);
const claimBusy = ref(false);

const donatorEnsName = ref("");
const userEnsName = ref("");
const angpow = ref(null);

const angpaoTap = () => {
    console.log('angpaoTap')

    $flip_angpao.set(!flip_angpao.value);
}

const walletConnected = async () => {
  userEnsName.value = await fetch(`/api/ensName.json?address=${$account.value.address}`)
    .then(res => res.json())
    .then(res => res.name)
    canStart.value = true;
}

const connectWallet = () => {
    appkitBus.emit('open')
}

const openAngpao = async () => {

    const verified = await openWorldcoin();
    if(!verified?.success) return;

    claimStart.value = true;

    $zoom_close.set(false);

    claimBusy.value = true;
    await receiveAngpow(angpow.value.id)

    setTimeout(() => {
        
        $pan_down_open.set(true);
    
        $flip_angpao.set(true);
        $open_angpao.set(true);
    
        setTimeout(() => {
            $token_up.set(true);

            claimBusy.value = false;

        }, 200);

    }, 2000);
        
}

const props = defineProps({ 
        id: String
})

onMounted( async () => {


    const angpow = await fetch(`/api/angpow/${props.id}.json`).then(res => res.json())

  console.log(142, angpow)
    $angpao_value.set(angpow.amount)
    $angpao_design.set(angpow.design)
    $angpao_message.set(angpow.message)
    $selectedColorClass.set(angpow.gradient)
    $selectedBgColor.set(angpow.solid)
    angpow.value = angpow
    donatorEnsName.value = angpow.donator_ens_name

    setTimeout(() => {
        $zoom_far.set(false);
        $zoom_close.set(true);

        // setTimeout(() => {
            $flip_angpao.set(true);

            // setTimeout(() => {
                
                $flip_angpao.set(false);

                setTimeout(() => {
                    
                    $pan_up_palette.set(true);

                }, 200);

            // }, 200);

        // }, 200);
        
    }, 200);

})




import '@worldcoin/idkit-standalone'
IDKit.init({
    app_id: 'app_staging_1fe6ccaa14409704f71091493087e46f',
    action: 'testverify',
    verification_level: "device",
    handleVerify: response => {
        // verify the IDKIt proof, throw an error to show the error screen
        verifyProof(response)
    },
    onSuccess: response => {
        console.log(response)
        onSuccess(response)
    },
})

const openWorldcoin = async () => {

    console.log("openWorldcoin openWorldcoin")
    console.log(IDKit.isInitialized)
    await IDKit.open()

}


// TODO: Calls your implemented server route
const verifyProof = async (proof) => {
    // throw new Error("TODO: verify proof server route")
    const resp = await fetch(`/api/verifyworldcoin.json`, {
        method: 'post',
        body: JSON.stringify({
            proof: proof,
        })
    }).then(res => res.json())
    console.log('verifyProof resp', resp);
};

// TODO: Functionality after verifying
const onSuccess = (_response) => {
  console.log("Success", _response)
};


</script>
