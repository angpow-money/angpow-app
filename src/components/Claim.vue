<template>
    
    
    <div class="w-full h-[100dvh] flex justify-center items-center pointer-events-none relative">

        <div class="w-full flex justify-between items-center fixed z-[10] top-0 left-0 pointer-events-none p-4">
            

            <div class="flex space-x-2">
                <div @click="goHome()"  class="pointer-events-auto w-16 h-16 sm:w-12 sm:h-12 rounded-full shadow-xl bg-poppy-500 text-white flex justify-center items-center">
                    <iconify-icon class="text-[2rem]" icon="ri:home-fill"></iconify-icon>
                </div>
    
                <div @click="openWallet()"  class="pointer-events-auto w-16 h-16 sm:w-12 sm:h-12 rounded-full shadow-xl bg-poppy-500 text-white flex justify-center items-center">
                    <iconify-icon class="text-[2rem]" icon="material-symbols-light:wallet"></iconify-icon>
                </div>
            </div>

      <p v-if="userEnsName" class="text-right"><span class="text-xl">{{userEnsName.replace('.angpao.money', '')}}</span><br><span class="opacity-25">.angpao.money</span></p>

        </div>

        <div class="fixed w-screen h-[100dvh] sm:scale-75 flex-col flex justify-center items-center pointer-events-none" >
            <Angpao @click="angpaoTap()" class="pointer-events-auto"></Angpao>
        </div>

        <!-- <ConnectWallet @connected="walletConnected()"></ConnectWallet> -->

        <div class="w-full absolute bottom-0 px-4 pb-2 flex flex-col justify-center items-center">

            <p>From</p>
            <div class="shadow-xl shadow-black/20 rounded-full px-6 py-3 text-xl border mt-4 mb-8 bg-white">
              <p>{{donatorEnsName}}</p>
            </div>

            <template v-if="!claimStart">

                            <button v-if="!canStart" @click="connectWallet()" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">
                                <div class="animate-bounce">Connect Wallet to Open</div>
                            </button>
                
        <button v-if="canStart" @click="openAngpao()" :disabled="received" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">
          <div class="animate-bounce">{{received ? "Received" : "Open!"}}</div>
                            </button>

            </template>

            <template v-else>

                <button v-if="claimBusy" class="btn w-full bg-black ring-black ring-offset-2 ring-4 ring-offset-white text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 ">
                                <div class="animate-bounce">Opening...</div>
                            </button>

                            <button @click="goBigHome()" v-if="!claimBusy && success" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto ">
                                <div class="">See all Angpao</div>
                            </button>
            </template>
            
        </div>

    </div>


</template>

<script setup>


// import VConsole from 'vconsole';
// const vConsole = new VConsole();

import { ref, onMounted  } from "vue";
import Angpao from "./Angpao.vue";

// import ConnectWallet from "@/components/ConnectWallet.vue"
// import ConnectWallet from "@/components/ConnectWallet2.vue"
import { useEventBus } from '@vueuse/core'
// const appkitBus = useEventBus('appkit')


import { useStore } from "@nanostores/vue";
import { $state, $show_palette, $zoom_close, $zoom_far, $flip_angpao, $open_angpao, $pan_up, $pan_up_palette, $pan_down, $pan_down_open, $token_up, $angpao_value, receiveAngpow, $angpao_message, $angpao_design, $selectedColorClass, $selectedBgColor } from "@/stores/angpao";
import { $account } from '@/stores/wallet';

const flip_angpao = useStore($flip_angpao);
const canStart = ref(false);

const claimStart = ref(false);
const claimBusy = ref(false);
const success = ref(false)

const received = ref(null);
const donatorEnsName = ref("");
const userEnsName = ref("");
const angpow = ref(null);

import posthog from 'posthog-js'


const angpaoTap = () => {
    console.log('angpaoTap')

    $flip_angpao.set(!flip_angpao.value);
}

$account.subscribe( async () => {
    if($account.value?.address) {

        received.value = await fetch(`/api/angpow/${props.id}/received.json?address=${$account.value.address}`)
        .then(res => res.json())
        .then(res => res.received)

        userEnsName.value = await fetch(`/api/ensName.json?address=${$account.value.address}`)
        .then(res => res.json())
        .then(res => res.name)

        canStart.value = true;
    }
})

const walletConnected = async () => {

  received.value = await fetch(`/api/angpow/${props.id}/received.json?address=${$account.value.address}`)
    .then(res => res.json())
    .then(res => res.received)

  userEnsName.value = await fetch(`/api/ensName.json?address=${$account.value.address}`)
    .then(res => res.json())
    .then(res => res.name)

    canStart.value = true;
}

const connectWallet = () => {
    console.log(1111)
    // appkitBus.emit('open')
    const divs = window.document.querySelector("#dwallet");
    if(divs) divs.click();
}

const wcverified = ref(false);
const openAngpao = async () => {

    posthog.capture('open_angpao_start', {
        angpao: angpow.value
    })

    console.log("angpow.value", angpow.value?.is_worldcoin_required);

    if(angpow.value?.is_worldcoin_required) {
        const verified = await openWorldcoin();
        // console.log("verified", verified)

        if(!wcverified.value) return;
    }

    claimStart.value = true;

    $zoom_close.set(false);

    claimBusy.value = true;
    try {
      await receiveAngpow(props.id)

      posthog.capture('open_angpao_complete', {
        angpao: angpow.value
    })

    } catch(err) {

      claimBusy.value = false;
      claimStart.value = false
      console.error(err)
      return
    }

    setTimeout(() => {
        
        $pan_down_open.set(true);
    
        $flip_angpao.set(true);
        $open_angpao.set(true);
    
        setTimeout(() => {
            $token_up.set(true);

            claimBusy.value = false;
            success.value = true;

        }, 200);

    }, 2000);
        
}

const props = defineProps({ 
        id: String
})

onMounted( async () => {

    posthog.init('phc_aB9tQxCKVNrxkD52p1sPSrhELBgquMttk9udO9J8sGV',
		{
			api_host: 'https://us.i.posthog.com',
			person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well
		}
	)


  const _angpow = await fetch(`/api/angpow/${props.id}.json`).then(res => res.json())
    angpow.value = _angpow;

    $angpao_value.set(_angpow.amount)
    $angpao_design.set(_angpow.design)
    $angpao_message.set(_angpow.message)
    $selectedColorClass.set(_angpow.gradient)
    $selectedBgColor.set(_angpow.solid)
    donatorEnsName.value = _angpow.donator_ens_name
  

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

    if(!IDKit.isInitialized) {
        IDKit.init({
            // app_id: 'app_staging_1fe6ccaa14409704f71091493087e46f',
            app_id: 'app_3fce0a48811b44d2fc3e452699a480d4',
            action: window.location.pathname.split("/").at(-1),
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
    }


})


const goHome = () => {
  window.location.href = window.location.origin
}

const goBigHome = () => {
    window.location.href = window.location.origin + "/home"
}

import '@worldcoin/idkit-standalone'
// IDKit.init({
//     // app_id: 'app_staging_1fe6ccaa14409704f71091493087e46f',
//     app_id: 'app_3fce0a48811b44d2fc3e452699a480d4',
//     action: 'stage',
//     verification_level: "device",
//     handleVerify: response => {
//         // verify the IDKIt proof, throw an error to show the error screen
//         verifyProof(response)
//     },
//     onSuccess: response => {
//         console.log(response)
//         onSuccess(response)
//     },
// })

const openWorldcoin = async () => {

    console.log("openWorldcoin openWorldcoin")
    console.log(IDKit.isInitialized)
    await IDKit.open()

}


// TODO: Calls your implemented server route
const verifyProof = async (proof) => {
    // throw new Error("TODO: verify proof server route")

    const resp = await fetch(`https://tester-quiet-breeze-2813.fly.dev/verify`, {
    //const resp = await fetch(`/api/verifyworldcoin.json`, {
        method: 'post',
        body: JSON.stringify({
            proof: proof,
            action: window.location.pathname.split("/").at(-1),
        })
    }).then(res => res.json())
    console.log('verifyProof resp', resp);
    wcverified.value = resp?.success; 

    if(!resp?.success) {
        alert("Account claimed. Claming aborted.")
        return;
    }
};

// TODO: Functionality after verifying
const onSuccess = (_response) => {
  console.log("Success", _response)
};


const openWallet = () => {
//   console.log("openWallet openWallet openWallet")
//   const walletmodal = useAppKit();
//   walletmodal.open();
    // appkitBus.emit('open');
    const divs = window.document.querySelector("#dwallet");
    if(divs) divs.click();
}


</script>
