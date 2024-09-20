<template>
    
    
    <div class="w-full h-[100dvh] flex justify-center items-center bg-white pointer-events-none">

        <div class="w-full flex justify-between items-center fixed top-0 left-0 pointer-events-none p-4">
            
            <div class="w-16 h-16 rounded-full shadow-xl border border-black/10 flex justify-center items-center">
                home
            </div>

            <p class="text-right"><span class="text-xl">someone</span><br><span class="opacity-25">.angpao.money</span></p>

        </div>

        <div class="fixed w-screen h-[100dvh] flex-col flex justify-center items-center pointer-events-auto" @click="angpaoTap()">
            <Angpao ></Angpao>
        </div>


        <div class="w-full absolute bottom-0 px-4 pb-2 flex flex-col justify-center items-center">

            <p>From</p>
            <div class="shadow-xl shadow-black/20 rounded-full px-6 py-3 text-xl border mt-4 mb-8 bg-white">
                <p>junyaoc.angpao.money</p>
            </div>

            <button @click="openAngpao()" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Open my Angpao!</button>
            
        </div>

    </div>


</template>

<script setup>


import { ref, onMounted  } from "vue";
import Angpao from "./Angpao.vue";

import ConnectWallet from "@/components/ConnectWallet.vue"



import { useStore } from "@nanostores/vue";
import { $state, $show_palette, $zoom_close, $zoom_far, $flip_angpao, $open_angpao, $pan_up, $pan_up_palette, $pan_down, $pan_down_open, $token_up } from "@/stores/angpao";

const flip_angpao = useStore($flip_angpao);

const angpaoTap = () => {
    console.log('angpaoTap')

    $flip_angpao.set(!flip_angpao.value);
}

const openAngpao = () => {

    // if user no wallet, no username, ask to setup

    let need_setup = false;

    if(need_setup){

    } else {


        $zoom_close.set(false);
        
        $pan_down_open.set(true);

        $flip_angpao.set(true);
        $open_angpao.set(true);

        setTimeout(() => {
            $token_up.set(true);
        }, 200);

    }
}

onMounted( () => {

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

</script>