<template>

<div class="w-full relative flex justify-end items-end">

    <ConnectWallet @connected="walletConnected()"></ConnectWallet>

    <div class="absolute bottom-[0dvh] flex justify-center items-center w-full">
        <div :class="[expand?'max-h-[70vh] ':'max-h-[4rem]']"  class="w-full bg-black text-white rounded-xl max-h-full m-0 text-xl font-semibold transition-all duration-500 h-[70vh] flex flex-col justify-center items-center">

            <div v-if="!expand" @click="buttonClick()"  class="w-full h-[4rem] text-center p-4 pointer-events-auto">Create AngPao</div>
            <div v-if="expand"  class="w-full flex justify-between items-center p-4 pointer-events-auto">
                <div  class="w-full">Enter ETH Amount</div>

                <button @click="reset()" class="bg-red-500/30 btn-sm text-red-300 rounded-full pointer-events-auto">back</button>

            </div>


            <div v-if="expand" class="w-full h-full flex flex-col justify-center items-center relative">

                <div class="w-full h-full p-4 flex justify-center items-center flex-col">

                    <div class="text-4xl mb-8">{{ ethAmount }} ETH</div>

                    <p class="text-sm font-normal ">balance: 0.1 ETH</p>
                    
                </div>

                <div class="w-full grid grid-cols-3 justify-center items-center text-center">
                    <div @click="keypress('1')" class="pointer-events-auto p-4 text-2xl">1</div>
                    <div @click="keypress('2')" class="pointer-events-auto p-4 text-2xl">2</div>
                    <div @click="keypress('3')" class="pointer-events-auto p-4 text-2xl">3</div>

                    <div @click="keypress('4')" class="pointer-events-auto p-4 text-2xl">4</div>
                    <div @click="keypress('5')" class="pointer-events-auto p-4 text-2xl">5</div>
                    <div @click="keypress('6')" class="pointer-events-auto p-4 text-2xl">6</div>

                    <div @click="keypress('7')" class="pointer-events-auto p-4 text-2xl">7</div>
                    <div @click="keypress('8')" class="pointer-events-auto p-4 text-2xl">8</div>
                    <div @click="keypress('9')" class="pointer-events-auto p-4 text-2xl">9</div>

                    <div @click="keypress('.')" class="p-4 pointer-events-auto  text-2xl">.</div>
                    <div @click="keypress('0')" class="pointer-events-auto p-4 text-2xl">0</div>
                    <div @click="keypress('del')" class="pointer-events-auto p-4 text-2xl">&lt;</div>
                </div>

          <div class="w-full p-4">
            <button @click="confirmAmount()" class="btn w-full bg-white text-black rounded-xl p-4 h-auto text-xl font-semibold pointer-events-auto">Next</button>
          </div>


            </div>

        </div>
    </div>

</div>

</template>

<script setup>

    import { ref, watch } from "vue";
    import ConnectWallet from "@/components/ConnectWallet.vue";
    import { Input } from '@/components/ui/input'
    import { useStore } from "@nanostores/vue";
    import { $state, $show_titles, $zoom_close, $zoom_far, $flip_angpao, $open_angpao, $pan_up, $zoom_far_far, $pan_up_palette, $pan_down, $pan_up_up, $selectedColorClass, $token_up } from "@/stores/angpao";

    import { useEventBus } from "@vueuse/core";
    const appkitBus = useEventBus("appkit");


const canStart = ref(false);


const expand = ref(false);

    const ethAmount = ref('0');

    const emit = defineEmits(["submit"])
    
const reset = () => {
  expand.value = false;
  ethAmount.value = '0';

    $show_titles.set(true)

};

const walletConnected = async () => {
  canStart.value = true;
};

const confirmAmount = () => {

    expand.value = false;

    $flip_angpao.set(true)
    $zoom_close.set(true)
    $open_angpao.set(true)
    $token_up.set(true)
    $pan_down.set(true)

    setTimeout(() => {
        emit("submit", Number(ethAmount.value));
    }, 500);
}


    const buttonClick = () => {

        if(canStart.value){
            expand.value = true;

            $show_titles.set(false)
        }else{
            appkitBus.emit("open");
        }

    }

    const keypress = (key) => {

        if(key == '.') {
            if(ethAmount.value == '0') {
                ethAmount.value = '0.';
            }
        } else {

            if(key == 'del'){

                if(ethAmount.value.length == 1){
                    ethAmount.value = '0';
                }else{
                    ethAmount.value = String(ethAmount.value).slice(0, -1);
                }

                
            }else{
                ethAmount.value = String(ethAmount.value) + key;
                ethAmount.value = Number(ethAmount.value);
            }
        }

        
    }


</script>