<template>

    <div class="w-full h-[100dvh] flex justify-center items-center p-4 pb-2 bg-white">

        <!-- <div class="w-full max-w-sm p-4 bg-white rounded-xl flex flex-col justify-between items-center">
            
            <div class="w-full flex justify-center items-center flex-col aspect-square ">
                <div class="text-7xl text-center mb-4">🧧</div>
                <h1 class="text-center text-xl">Hello! Create New Angpao!</h1>
            </div>

            <Button class="w-full">Create New</Button>

        </div> -->

        <Angpao></Angpao>

        
        <template v-if="currentStep == 'start'">
            <div class=" w-full h-full flex flex-col justify-between items-center">
                <div class="w-full h-full flex flex-col justify-center items-center space-y-8">
                    <div class="p-4 text-center">
                        <div class="text-poppy text-5xl font-semibold mb-4">angpao.money</div>
                        <p class="text-xl text-black font-semibold">The New + Fun Way to Send Crypto!</p>
                    </div>

                    <div class="w-full flex justify-center items-center flex-col">
                        
                        <div class="w-[200px] aspect-[3/4] bg-gradient-to-b from-red-500 to-red-900 shadow-2xl rounded-xl">
                            
                        </div>

                        <div class="bg-white ring ring-black/10 text-xl font-medium rounded-full mt-4 p-1.5 px-4 shadow-2xl shadow-black">
                            what???
                        </div>

                    </div>
                </div>

                <ConnectWallet>
                    <button class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2">Create AngPao</button>
                </ConnectWallet>

            </div>
        </template>

        <!-- <template v-if="currentStep == 'connect_wallet'">
            <WalletConnect></WalletConnect>
        </template> -->

    </div>

</template>

<script setup>

    import { Button } from "@/components/ui/button"
    import { ref, computed } from "vue"
    // import WalletConnect from "@/components/WalletConnect.vue"
    import ConnectWallet from "@/components/ConnectWallet.vue"
    import Angpao from "./Angpao.vue";

    const step = ref([
        {
            name: "start",
            active: false
        },
        {
            name: "design",
            active: true
        },
        {
            name: "configure",
            active: false
        },
        {
            name: "username",
            active: false
        },
        {
            name: "result",
            active: false
        }
    ])

    const currentStep = computed(() => {
        return step.value.find((item) => item.active)?.name
    })



</script>