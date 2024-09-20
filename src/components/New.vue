<template>

    <div class="w-full h-[100dvh] flex justify-center items-center bg-white pointer-events-none">

        <!-- <div class="w-full max-w-sm p-4 bg-white rounded-xl flex flex-col justify-between items-center">
            
            <div class="w-full flex justify-center items-center flex-col aspect-square ">
                <div class="text-7xl text-center mb-4">🧧</div>
                <h1 class="text-center text-xl">Hello! Create New Angpao!</h1>
            </div>

            <Button class="w-full">Create New</Button>

        </div> -->
        <div class="fixed w-screen h-[100dvh] flex-col flex justify-center items-center" :class="[ (currentStep == 'summary' || currentStep == 'result') ? 'pointer-events-auto':'pointer-events-none']" @click="angpaoTap()">
            <Angpao ></Angpao>
        </div>


        <Flicking class="w-full h-[100dvh] pointer-events-none" ref="flicking" :options="{ align: 'prev', circular: false, horizontal:false }">
            <div key="0" class="w-full h-[100dvh] flex justify-center items-center p-4 pb-2">
                <div class=" w-full h-full flex flex-col justify-between items-center">
                <div class="w-full h-full flex flex-col justify-center items-center space-y-8">
                    <div class="p-4 text-center">
                        <div class="text-poppy text-5xl font-semibold mb-4">angpao.money</div>
                        <p class="text-xl text-black font-semibold">The New + Fun Way to Send Crypto!</p>
                    </div>

                    <div class="w-full flex justify-center items-center flex-col">
                        
                        <div class="w-[200px] aspect-[3/4] ">
                            
                        </div>

                        <div class="bg-white ring ring-black/10 text-xl font-medium rounded-full mt-4 p-1.5 px-4 shadow-2xl shadow-black">
                            what???
                        </div>

                    </div>
                </div>

                <ConnectWallet @connected="walletConnected()">
                    <button class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2">Create AngPao</button>
                </ConnectWallet>

            </div>

            </div>

            <!-- <div key="1" class="w-full h-[100dvh] flex justify-center items-center flex-col text-5xl bg-black/30">

                <div class="flex flex-col justify-center items-center font-semibold -rotate-6 text-white ">
                    <p>Colors</p>
                    <p class="p-4">&</p>
                    <p>Design</p>
                </div>

            </div> -->

            <div key="1" class="w-full h-[100dvh] flex justify-start items-start relative">

                <p class="w-full p-4 text-center text-2xl font-medium">Select Colors & Design</p>

                <div @click="confirmDesign()" class="absolute bottom-0 left-0 w-full px-4 pb-2">
                    <button class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Next</button>

                </div>


</div>


<div key="2" class="w-full h-[100dvh] flex justify-start items-start relative pointer-events-none bg-gradient-to-b from-transparent to-black/50">

    <div class="w-full bottom-[0dvh] absolute pointer-events-auto">

        <div class="w-full bg-white rounded-t-xl pt-8 p-4 space-y-4">
            
            <div class="w-full grid grid-cols-2">
                <div class="text-xl font-medium">Total ETH</div>
                <input class="bg-transparent border-b" placeholder="enter amount" type="text">
            </div>

            <div class="w-full grid grid-cols-2">
                <div class="text-xl font-medium">How many copies?</div>
                <input class="bg-transparent border-b" placeholder="enter amount" type="text">
            </div>

            <p class="py-8 text-center">Each copy will have X ETH</p>


            <button @click="submitAsset()" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Write a Message</button>

        </div>

        

            
    </div>



</div>

<div key="3" class="w-full h-[100dvh] flex justify-start items-start relative pointer-events-none bg-gradient-to-b from-transparent to-black/50">

<div class="w-full bottom-[0dvh] absolute pointer-events-auto">

    <div class="w-full bg-white rounded-t-xl pt-8 p-4 space-y-4">
        
        <div class="text-xl font-medium">Write a Message</div>
        
        <div class="h-60">

        </div>


        <button @click="submitMessage()" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Last Check</button>

    </div>

    

        
</div>



</div>

<div key="4" class="w-full h-[100dvh] flex justify-start items-start relative pointer-events-none bg-black/50">


    <div class="w-full flex flex-col justify-center items-center h-full text-white pointer-events-auto" >
    <p class="text-4xl mb-8">Enter a username</p>


<div class="bg-white  p-4 rounded-xl  text-3xl text-center">
    <input class="bg-transparent w-full text-center" type="text" placeholder="junyaoc">
    <p class="text-black">.angpao.money</p>
</div>

<p class="text-xl mt-8 text-center">choose your name wisely!</p>


 </div>

 <div class="absolute left-0 bottom-[0dvh]  px-4 pb-2 w-full">
     <button @click="submitUsername()" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Confirm</button>
    
 </div>



</div>


<div key="5" class="w-full h-[100dvh] flex flex-col justify-center items-start relative pointer-events-none">


    <div class="absolute left-0 bottom-[0dvh]  px-4 pb-2 w-full">
        
        <p class="text-center mb-4 font-medium">Tap AngPao to Flip!</p>
        
        <div class="w-full mb-4 bg-white border border-black/20 rounded-xl p-4">

            <p>Total ETH: 1</p>
            <p>Number of Copies: 1</p>

            <br>

            <p>Each copy will have 1 ETH</p>
            
            <br>

            <p class="text-left">Message</p>
            <p class="text-gray-500 " >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam</p>
            <p class="text-right">From: username.angpao.money</p>


        </div>

     <button @click="sendAngpao()" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Send Angpao!</button>
    
 </div>

</div>


<div key="6" class="w-full h-[100dvh] flex flex-col justify-center items-start relative pointer-events-none">


<div class="absolute left-0 bottom-[0dvh]  px-4 pb-2 w-full">
    
    <p v-if="sendBusy" class="text-center mb-4 font-medium">Sending Angpao, Please Confirm Transaction</p>
    <p v-if="!sendBusy" class="text-center mb-4 font-medium">Sent!</p>

    
    <div class="w-full mb-4 bg-white border border-black/20 rounded-xl p-4">

       <p v-if="sendBusy" class="text-4xl text-center animate-pulse" >Sending</p>

       <p v-if="!sendBusy" class="text-center animate-pulse" >Link: https://google.com</p>



    </div>

    <template v-if="!sendBusy">

        <div class="w-full grid grid-cols-4 gap-2">
           <button class="col-span-3 btn w-full  border-2 border-black/10 bg-white text-black rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Share</button>
           <button class="btn w-full border-2 border-black/10 bg-white text-black rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Copy</button>
       
        </div>
       
        <button class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-medium mb-2 pointer-events-auto">View All Angpao</button>

    </template>



</div>

</div>
            <!-- <div class="panel">2</div>
            <div class="panel">3</div> -->
        </Flicking>

        
<!--        <template v-if="currentStep == 'start'">
            <div class=" w-full h-full flex flex-col justify-between items-center">
                <div class="w-full h-full flex flex-col justify-center items-center space-y-8">
                    <div class="p-4 text-center">
                        <div class="text-poppy text-5xl font-semibold mb-4">angpao.money</div>
                        <p class="text-xl text-black font-semibold">The New + Fun Way to Send Crypto!</p>
                    </div>

                    <div class="w-full flex justify-center items-center flex-col">
                        
                        <div class="w-[200px] aspect-[3/4] ">
                            
                        </div>

                        <div class="bg-white ring ring-black/10 text-xl font-medium rounded-full mt-4 p-1.5 px-4 shadow-2xl shadow-black">
                            what???
                        </div>

                    </div>
                </div>

                <ConnectWallet @connected="walletConnected()">
                    <button class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2">Create AngPao</button>
                </ConnectWallet>

            </div>
        </template>

        <template v-if="currentStep == 'design'">
            <p class="w-full top-4 fixed p-4 text-center text-4xl font-medium">Select Colors & Design</p>
        </template>-->

    </div>

</template>

<script setup>

    import { Button } from "@/components/ui/button"
    import { ref, computed, watch } from "vue"
    // import WalletConnect from "@/components/WalletConnect.vue"
    import ConnectWallet from "@/components/ConnectWallet.vue"
    import Angpao from "./Angpao.vue";

    import Flicking from "@egjs/vue3-flicking";
    import "@egjs/vue3-flicking/dist/flicking.css";


    import { useStore } from "@nanostores/vue";
    import { $state, $show_palette, $zoom_close, $zoom_far, $flip_angpao, $open_angpao, $pan_up, $pan_up_palette, $pan_down, $selectedColorClass } from "@/stores/angpao";

    const flicking = ref(null)

    const sendBusy = ref(false)

    const step = ref([
        {
            name: "start",
            active: true
        },
        {
            name: "design",
            active: false
        },
        {
            name: "asset",
            active: false
        },
        {
            name: "message",
            active: false
        },
        {
            name: "username",
            active: false
        },
        {
            name: "summary",
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

    watch(currentStep, (newVal) => {
        console.log(newVal)

        if(currentStep.value == 'start') {
            $selectedColorClass.set('bg-gradient-to-b from-red-500 to-red-900')
        }

        if(currentStep.value == 'design') {
            setTimeout(() => {
                $zoom_far.set(false)
                $zoom_close.set(true)
                $show_palette.set(true)
                setTimeout(() => {
                    $pan_up_palette.set(true)
                }, 300);
            }, 300);
        }

        if(currentStep.value == 'asset') {
            $zoom_far.set(false)
            $zoom_close.set(false)
            $show_palette.set(false)
            $pan_up_palette.set(false)

            $pan_down.set(true)
            $flip_angpao.set(true)

            $open_angpao.set(true)
            
        }

        if(currentStep.value == 'message') {
            $pan_down.set(false)
            $flip_angpao.set(false)
            $open_angpao.set(false)

            $zoom_close.set(true)
            $pan_up_palette.set(true)
        }

        if(currentStep.value == 'summary') {
            $zoom_close.set(false)
            $zoom_far.set(false)
            $show_palette.set(false)
            $pan_down.set(false)
            $open_angpao.set(false)
            $pan_up_palette.set(false)

            $pan_up.set(true)
            $zoom_far.set(true)

        }

        if(currentStep.value == 'result') {
            $pan_up.set(false)
            $zoom_far.set(false)

            sendBusy.value = true

            setTimeout(() => {
                sendBusy.value = false

                $zoom_close.set(true)
                $pan_up_palette.set(true)

            }, 3000);
        }

    })

    const walletConnected = async () => {
        
        setTimeout(() => {
            step.value.forEach((item) => {
                if(item.name == 'start') {
                    item.active = false
                }
            })

            step.value[1].active = true
        }, 1000);

        

        if(!flicking.value) {
            
            await new Promise( (resolve) => {
                setTimeout(() => {
                    if(flicking.value) {
                        resolve()
                    }
                }, 100);
            })

        }


        setTimeout(() => {
            // flicking.value.moveTo(2)
            flicking.value.moveTo(1)
        }, 1000);

    }

    const confirmDesign = () => {
        step.value.forEach((item) => {
            if(item.name == 'design') {
                item.active = false
            }
        })

        step.value[2].active = true

        flicking.value.moveTo(2)
    }

    const submitAsset = () => {

        step.value.forEach((item) => {
            if(item.name == 'asset') {
                item.active = false
            }
        })

        step.value[3].active = true

        flicking.value.moveTo(3)

    }

    const submitMessage = () => {

        step.value.forEach((item) => {
            if(item.name == 'message') {
                item.active = false
            }
        })


        /// if no username, need to ask
        let ask_username = true

        if(ask_username) {
            step.value[4].active = true
            flicking.value.moveTo(4)
        } else {
            step.value[5].active = true
            flicking.value.moveTo(5)
        }


    }

    const submitUsername = () => {

        step.value.forEach((item) => {
            if(item.name == 'username') {
                item.active = false
            }
        })

        step.value[5].active = true
        flicking.value.moveTo(5)


    }

    const angpaoTap = () => {

        console.log("TAPTAP")
        // $flip_angpao.set(!$flip_angpao.value);
        if(currentStep.value == 'summary') {
            $flip_angpao.set(!$flip_angpao.value);
        }
    }

    const sendAngpao = () => {
        step.value.forEach((item) => {
            if(item.name == 'summary') {
                item.active = false
            }
        })

        step.value[6].active = true
        flicking.value.moveTo(6)
    }

</script>

