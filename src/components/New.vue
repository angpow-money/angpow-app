<template>
  <div class="w-full h-[100dvh] flex justify-center items-center bg-poppy-100 pointer-events-none relative">


      <button @click="openWallet()" class="pointer-events-auto z-20 w-14 h-14 rounded-full shadow-xl  flex justify-center items-center absolute sm:fixed top-4 left-4 bg-white">
        <iconify-icon class="text-[2rem]" icon="material-symbols-light:wallet"></iconify-icon>
      </button>


    <div class="fixed w-screen h-[100dvh] flex-col flex justify-center items-center" :class="[currentStep == 'summary' || currentStep == 'result' ? 'pointer-events-auto' : 'pointer-events-none', currentStep=='divide'&&copies>1?'-rotate-12 -translate-x-8':'', 'transition-all duration-300']" @click="angpaoTap()">
      <Angpao></Angpao>
    </div>

    <div :class="[currentStep=='divide'&&copies>1?'opacity-100 translate-x-[100%] ':'opacity-0 translate-x-0 ']" class="absolute bg-white px-6 py-2 mt-[-80%] rounded-full text-3xl shadow-xl pointer-events-none transition-all duration-300">
        x{{ copies }}
      </div>

      <TransitionRoot as="template" :show="show_explainer">
    <Dialog class="relative z-10" @close="show_explainer = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-visible rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-sm sm:p-6">
              
               <div class="w-full flex justify-center items-center">

                  <div class="w-[8rem] h-[8rem] bg-white border shadow-xl rounded-full mt-[-30%]">

                  </div>

                  
                </div>

                <section class="py-4 text-center">

                  <p>we're</p>
                  <p class="text-3xl mb-12">angpao.money</p>

                  <p>A new, fun and hyper-easy way to receive crypto. Think of it as a Magic Link for Receiving crypto. Works with boomers.</p>

                </section>


        <div class="w-full mt-4">
          <button @click="show_explainer=false" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Let's Go!</button>
        </div>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

      <TransitionRoot as="template" :show="show_username_modal">
    <Dialog class="relative z-10" @close="show_username_modal = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-sm sm:p-6">
              
                <div class="w-full flex flex-col justify-center items-center h-full text-black pointer-events-auto">
          <p class="text-xl mb-8">Enter a username</p>

          <div class="bg-gray-100 p-4 rounded-xl text-3xl text-center w-full">
            <!-- <input class="bg-transparent w-full text-center" type="text" placeholder="junyaoc"> -->
            <Input v-model="username_input" class="bg-gray-200 border-none text-2xl py-6 text-black text-center mb-4" placeholder="Hi! My name is..." />

            <p class="text-black">.angpao.money</p>
          </div>

          <p class="mt-8 text-center">choose your name wisely<br>your recipient will see this name!</p>
        </div>

        <div class="w-full mt-4">
          <button @click="submitUsername()" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Confirm</button>
        </div>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
    

    <Flicking class="w-full h-[100dvh] pointer-events-none" ref="flicking" :options="{ align: 'prev', circular: false, horizontal: false, disableOnInit:true }">
      <div key="0" class="w-full h-[100dvh] flex justify-center items-center p-4 pb-2">
        <div class="w-full h-full flex flex-col justify-between items-center">
         
            <div :class="[show_titles?'':'opacity-0']" class="w-full h-full flex flex-col justify-center items-center space-y-8">
            <div class="p-4 text-center sm:-mt-24 sm:mb-24">
              <div class="text-poppy text-5xl font-semibold mb-4">angpao.money</div>
              <p class="text-xl text-black font-semibold">The New + Fun Way to Send Crypto!</p>
            </div>

            <div class="w-full flex justify-center items-center flex-col">
              <div class="w-[200px] aspect-[3/4] sm:mb-12"></div>
              <button @click="show_explainer=true" class="pointer-events-auto bg-white ring ring-black/10 text-xl font-medium rounded-full mt-4 p-1.5 px-4 shadow-2xl shadow-black">what???</button>
            </div>
          </div>
        

          <div class="w-full h-[10vh] relative flex justify-end items-end">
            <Step1Button @submit="confirmAmount"></Step1Button>
          </div>
          
          <!-- <ConnectWallet @connected="walletConnected()"></ConnectWallet>
          <button @click="startWizard()" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Create AngPao</button> -->
        </div>
      </div>

      <div key="1" class="w-full h-[100dvh] flex justify-start items-start relative">
        
        

        <div class="w-full absolute bottom-[0dvh] left-0 ">
          

            <div @click="backToAmount()" class="btn ml-2 btn-sm mb-2 text-white pointer-events-auto">
              <p>back</p>
            </div>

            <div class="w-full  bg-white border border-black/20 rounded-t-xl p-4">
                <p class="w-full p-4 text-center text-2xl font-medium pb-8">How Many Angpao?</p>


                <div class="w-full grid grid-cols-3 pb-8">
              

              <div class="w-full flex justify-end items-center">
                <button @click="decreaseCopy()" class="text-xl w-10 aspect-square rounded-full bg-black text-white flex justify-center items-center pointer-events-auto">
                  <iconify-icon icon="akar-icons:minus"></iconify-icon>

                </button>
              </div>

              <div class="w-full flex justify-center items-center text-5xl">
                <div>{{ copies }}</div>
              </div>

              <div class="w-full flex justify-start items-center">
                <button @click="increaseCopy()" class="text-xl w-10 aspect-square rounded-full bg-black text-white flex justify-center items-center pointer-events-auto">
                  <iconify-icon icon="akar-icons:plus"></iconify-icon>
                </button>
              </div>
            </div>

          <button @click="goSummary()" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold pointer-events-auto">Finalize</button>

          <p class="w-full text-center pt-2">or customize away!</p>

          </div>
        </div>
      </div>

      <!-- <div key="1" class="w-full h-[100dvh] flex justify-start items-start relative">
        <p class="w-full p-4 text-center text-2xl font-medium">Select Colors & Design</p>

        <div @click="confirmDesign()" class="absolute bottom-0 left-0 w-full px-4 pb-2">
          <button class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Next</button>
        </div>
      </div> -->



      <div key="2" class="w-full h-[100dvh] flex flex-col justify-center items-start relative pointer-events-none">

        <div class="absolute top-0 right-0 p-4">
            <button @click="showCustomize()" class="btn border-none  text-xl   px-6 py-2 rounded-full shadow-xl flex justify-center items-center pointer-events-auto font-medium hover:text-white" :class="[show_customization?'bg-black-500 text-white ring-2 ring-white ring-offset-2 ring-offset-transparent animate-bounce':'text-black bg-white']" >
                <span v-if="!show_customization">🎨 Customize</span>
                <span v-else>🎨 Done</span>
            </button>
        </div>

        <div class="absolute left-0 bottom-[0dvh] px-4 pb-2 w-full">
          
          <div class="w-full flex justify-between items-center mb-2 pr-2">
            
            <div @click="backToDivide()" class="btn ml-2 btn-sm text-white pointer-events-auto">
              <p>back</p>
            </div>
            
              <p class="text-center font-medium bg-white px-3 py-2 rounded-xl">Tap AngPao to Flip!</p>

          </div>

          <div class="w-full mb-4 bg-white border border-black/20 rounded-xl">

            <template v-if="show_customization">

              <div>

                <div class="p-2 pointer-events-auto">
                  <button @click="customization_tab = 'color'" :class="[customization_tab=='color'?'text-white':'btn-ghost']" class="btn btn-sm rounded-full">Color</button>
                  <button @click="customization_tab = 'design'" :class="[customization_tab=='design'?'text-white':'btn-ghost']" class="btn btn-sm rounded-full">Nouns Art</button>
                  <button @click="customization_tab = 'message'" :class="[customization_tab=='message'?'text-white':'btn-ghost']" class="btn btn-sm rounded-full">Message</button>
                </div>

                <div class="grid grid-cols-4 justify-center items-center p-4 gap-4" v-if="customization_tab == 'color'">
                  
                  <button @click="selectAngpaoColor(color)" v-for="color in colors" class="w-full flex justify-center items-center pointer-events-auto">
                    <div class="w-12 h-12 rounded-full" :class="[color.gradient, color.selected?'ring-4 ring-black ring-offset-4':'']"></div>
                  </button>

                </div>

                <div class="px-2" v-if="customization_tab == 'design'">
                  <button @click="randomizeDesign()" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Randomize</button>
                </div>

                <div class="w-full p-4 pointer-events-auto" v-if="customization_tab == 'message'">

                  <Textarea v-model="angpao_message_input"  class="w-full h-[15vh] mb-4" placeholder="Type your message here." />
                

                </div>

              </div>



            </template>

            <template v-else>

              <div class="w-full grid grid-cols-2 p-4">
  
                  <div class="text-center border-r pb-3">
                    <div class="text-xl" >{{ eth_amount }} ETH</div>
                    <div class="font-medium text-gray-500">In Total</div>
                  </div>
  
                  <div class="text-center pb-3">
                    <div class="text-2xl font-medium" >{{ copies }}</div>
                    <div class="font-medium text-gray-500">Angpao</div>
                  </div>
  
                  
  
  
                  <div class="col-span-2 flex justify-between pointer-events-auto items-end pt-4 py-2 border-t">
                      <div>
                          <p> Humans Only</p>
                          <p class="text-sm text-gray-400" >Requires World ID upon claim</p>
                      </div>
                      
                      <Switch v-model:checked="is_worldcoin_required" />
                      
                  </div>
  
              </div>

            </template>


          </div>

          <div :class="[show_customization?'max-h-0':'max-h-[10rem]','overflow-hidden h-full duration-500 transition-all ']">
            <button @click="submitAngpaoConfig()" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Create Angpao!</button>
          </div>

        </div>
      </div>


      <div key="3" class="w-full h-[100dvh] flex flex-col justify-center items-start relative pointer-events-none">
        <div class="absolute left-0 bottom-[0dvh] px-4 pb-2 w-full">
          
          <div class="w-full flex justify-center items-center mb-4">
            <div class="bg-white px-4 py-2 rounded-xl">
            <p v-if="sendBusy" class="text-center font-medium">Please Confirm Transaction</p>
            <p v-if="!sendBusy" class="text-center font-medium">Done!</p>
          </div>
          </div>

          <div class="w-full bg-white text-black rounded-3xl p-3 flex justify-between items-center mb-4 pl-5">
            <p v-if="sendBusy" class="text-2xl w-full text-center animate-pulse">Creating Your Angpao...</p>
            <p v-if="!sendBusy" class="text-left animate-pulse text-lg font-medium">https://google.com</p>

            <div v-if="!sendBusy" class="flex justify-end items-center space-x-1 pointer-events-auto">
                <button class="btn w-12 h-12 rounded-2xl btn-ghost">share</button>
                <button class="btn w-12 h-12 bg-black rounded-2xl text-white">copy</button>

            </div>
          </div>

          <template v-if="!sendBusy">
            <!-- <div class="w-full grid grid-cols-4 gap-2">
              <button class="col-span-3 btn w-full border-2 border-black/10 bg-white text-black rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Share</button>
              <button class="btn w-full border-2 border-black/10 bg-white text-black rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Copy</button>
            </div> -->

            <button class="btn w-full bg-black text-white rounded-3xl p-4 max-h-full m-0 h-auto text-xl font-medium mb-2 pointer-events-auto">View All Angpao</button>
          </template>
        </div>
      </div>

      <!-- <div key="3" class="w-full h-[100dvh] flex justify-start items-start relative pointer-events-none bg-gradient-to-b from-transparent to-black/50">
        <div class="w-full bottom-[0dvh] absolute pointer-events-auto">
          <div class="w-full bg-white rounded-t-xl p-4 space-y-4">
            <div class="text-xl font-medium">Say Something</div>

            <div class="">
              <Textarea class="w-full h-[20vh]" placeholder="Type your message here." />
            </div>

            <button @click="submitMessage()" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Last Check</button>
          </div>
        </div>
      </div> -->

      <!--<div key="4" class="w-full h-[100dvh] flex justify-start items-start relative pointer-events-none bg-black/50 px-8">
        <div class="w-full flex flex-col justify-center items-center h-full text-white pointer-events-auto">
          <p class="text-4xl mb-8">Enter a username</p>

          <div class="bg-white p-4 rounded-xl text-3xl text-center w-full">
            <!~~ <input class="bg-transparent w-full text-center" type="text" placeholder="junyaoc"> ~~>
            <Input class="bg-gray-200 border-none text-2xl py-6 text-black text-center mb-4" placeholder="Hi! My name is..." />

            <p class="text-black">.angpao.money</p>
          </div>

          <p class="text-xl mt-8 text-center">choose your name wisely, your name will be visible to everyone sending angpao!</p>
        </div>

        <div class="absolute left-0 bottom-[0dvh] px-4 pb-2 w-full">
          <button @click="submitUsername()" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Confirm</button>
        </div>
      </div>-->

      <!-- <div key="5" class="w-full h-[100dvh] flex flex-col justify-center items-start relative pointer-events-none">
        <div class="absolute left-0 bottom-[0dvh] px-4 pb-2 w-full">
          <p class="text-center mb-4 font-medium">Tap AngPao to Flip!</p>

          <div class="w-full mb-4 bg-white border border-black/20 rounded-xl p-4">
            <p>Total ETH: 1</p>
            <p>Number of Copies: 1</p>
            <p>Random Mode: Yes</p>
            <p>Require WorldID: Yes</p>

            <br />

            <p>Each copy will have 1 ETH</p>

            <br />

            <p class="text-left">Message</p>
            <p class="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam</p>
            <p class="text-right">From: username.angpao.money</p>
          </div>

          <button @click="sendAngpao()" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2 pointer-events-auto">Send Angpao!</button>
        </div>
      </div> -->

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
import { Button } from "@/components/ui/button";
import { ref, computed, watch, onMounted } from "vue";
// import WalletConnect from "@/components/WalletConnect.vue"
// import ConnectWallet from "@/components/ConnectWallet.vue";
import Angpao from "./Angpao.vue";
import Step1Button from "./Step1Button.vue";

import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

import { useEventBus } from "@vueuse/core";
const appkitBus = useEventBus("appkit");

import { useStore } from "@nanostores/vue";
import { $state, $show_palette, $zoom_close, $zoom_far, $flip_angpao, $open_angpao, $pan_up, $zoom_far_far, $pan_up_palette, $pan_down, $pan_up_up, $selectedColorClass, $show_titles, $token_up, $angpao_design, $angpao_message, $selectedBgColor, $angpao_eth_amount } from "@/stores/angpao";

const flicking = ref(null);

const show_titles = useStore($show_titles)


const sendBusy = ref(false);

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const show_username_modal = ref(false)

import { nanoid } from 'nanoid'

const show_explainer = ref(false)

onMounted( async () => {

  $angpao_design.set(`https://noun-api.com/beta/pfp?name=${nanoid(10)}`)

})

// const startWizard = async () => {
//   if (canStart.value) {
//     setTimeout(() => {
//       step.value.forEach((item) => {
//         if (item.name == "start") {
//           item.active = false;
//         }
//       });

//       step.value[1].active = true;
//     }, 1000);

//     if (!flicking.value) {
//       await new Promise((resolve) => {
//         setTimeout(() => {
//           if (flicking.value) {
//             resolve();
//           }
//         }, 100);
//       });
//     }

//     setTimeout(() => {
//       // flicking.value.moveTo(2)
//       flicking.value.moveTo(1);
//     }, 1000);
//   } else {
//     appkitBus.emit("open");
//   }
// };

const step = ref([
  {
    name: "start",
    active: true,
  },

  {
    name: "divide",
    active: false,
  },
  {
    name: "summary",
    active: false,
  },
  {
    name: "result",
    active: false,
  },

  {
    name: "design",
    active: false,
  },
  {
    name: "asset",
    active: false,
  },
  {
    name: "message",
    active: false,
  },
  {
    name: "username",
    active: false,
  },
  
]);

const eth_amount = ref(0)
const is_random_mode = ref(false);
const is_worldcoin_required = ref(false);

const show_customization = ref(false);
const customization_tab = ref('color')

const showCustomize = () => {
  show_customization.value = !show_customization.value;
}

const currentStep = computed(() => {
  return step.value.find((item) => item.active)?.name;
});

watch(currentStep, async (newVal) => {
  console.log(newVal);

  if (currentStep.value == "start") {
    $selectedColorClass.set("bg-gradient-to-b from-red-500 to-red-900");
  }

  if (currentStep.value == "divide") {
    
    // $zoom_far.set(false);
    $zoom_close.set(false);
    // $show_palette.set(false);
    // $pan_up_palette.set(false);
    $pan_down.set(false);
    // $flip_angpao.set(false);
    // $open_angpao.set(false);
    // $pan_up.set(false);

    // $pan_up_up.set(true);
    // $zoom_far.set(true);


    

  }

  if (currentStep.value == "design") {
    setTimeout(() => {
      $zoom_far.set(false);
      $zoom_close.set(true);
      $show_palette.set(true);
      setTimeout(() => {
        $pan_up_palette.set(true);
      }, 300);
    }, 300);
  }

  if (currentStep.value == "asset") {
    $zoom_far.set(false);
    $zoom_close.set(false);
    $show_palette.set(false);
    $pan_up_palette.set(false);

    $pan_down.set(true);
    $flip_angpao.set(true);

    $open_angpao.set(true);
  }

  if (currentStep.value == "message") {
    $pan_down.set(false);
    $flip_angpao.set(false);
    $open_angpao.set(false);

    $zoom_close.set(true);
    $pan_up.set(true);
  }

  if (currentStep.value == "summary") {
    $zoom_close.set(false);
    $zoom_far.set(false);
    $show_palette.set(false);
    $pan_down.set(false);
    $pan_up.set(false);

    // $open_angpao.set(false);
    $pan_up_palette.set(false);
    $pan_up_up.set(false);
    $zoom_far_far.set(false);

    $pan_up_palette.set(true);
    $zoom_far.set(true);
  }

  if (currentStep.value == "result") {
    $pan_up.set(false);
    $zoom_far.set(false);

    sendBusy.value = true;

    await executeAngpaoCreate()

    setTimeout(() => {
      sendBusy.value = false;

      $zoom_close.set(true);
      $pan_up_palette.set(true);
    }, 3000);
  }
});

// const walletConnected = async () => {
//   canStart.value = true;
// };

const copies = ref(1);

const decreaseCopy = () => {
//   console.log("decrease");
    if (copies.value > 1) {
        copies.value -= 1;
    }
};

const increaseCopy = () => {
//   console.log("increase");
    copies.value += 1;
};

const confirmAmount = (event) => {

    eth_amount.value = event;
    
    step.value.forEach((item) => {
        if (item.name == "start") {
            item.active = false;
        }
    });

    step.value[1].active = true;

    $angpao_eth_amount.set(eth_amount.value);

   flicking.value.moveTo(1);

}

const goSummary = () => {
    step.value.forEach((item) => {
        if (item.name == "divide") {
            item.active = false;
        }
    });

    step.value[2].active = true;

    flicking.value.moveTo(2);
}


const submitAngpaoConfig = () => {

   show_username_modal.value = true;

}

const createAngpao = () => {

    // step.value.forEach((item) => {
    //     item.active = false;
    // });

    // step.value[7].active = true;

    if($flip_angpao.get() == false) $flip_angpao.set(true);

    
    $token_up.set(false);

    setTimeout(() => {


      $open_angpao.set(false);
      
      
      setTimeout(() => {
        $flip_angpao.set(false);
      
      setTimeout(() => {

        $pan_down.set(false);
        $pan_up_palette.set(false);
        $pan_up_up.set(false)
        
        $zoom_far.set(false);
        
        $pan_up.set(true);

        $zoom_close.set(true);
   
        step.value.forEach((item) => {
            if (item.name == "summary") {
                item.active = false;
            }
        });
    
        step.value[3].active = true;
    
        flicking.value.moveTo(3);
        
      }, 500);
    }, 500);

    }, 300);


}

const confirmDesign = () => {
  step.value.forEach((item) => {
    if (item.name == "design") {
      item.active = false;
    }
  });

  step.value[2].active = true;

  flicking.value.moveTo(2);
};

const submitAsset = () => {
  step.value.forEach((item) => {
    if (item.name == "asset") {
      item.active = false;
    }
  });

  step.value[3].active = true;

  flicking.value.moveTo(3);
};

const submitMessage = () => {
  step.value.forEach((item) => {
    if (item.name == "message") {
      item.active = false;
    }
  });

  /// if no username, need to ask
  let ask_username = true;

  if (ask_username) {
    step.value[4].active = true;
    flicking.value.moveTo(4);
  } else {
    step.value[5].active = true;
    flicking.value.moveTo(5);
  }
};

const submitUsername = () => {
//   step.value.forEach((item) => {
//     if (item.name == "username") {
//       item.active = false;
//     }
//   });

//   step.value[5].active = true;
//   flicking.value.moveTo(5);
    show_username_modal.value = false;

    createAngpao();
};

const angpaoTap = () => {
  console.log("TAPTAP");
  // $flip_angpao.set(!$flip_angpao.value);
  if (currentStep.value == "summary") {
    $flip_angpao.set(!$flip_angpao.value);
  }
};

const sendAngpao = () => {
  step.value.forEach((item) => {
    if (item.name == "summary") {
      item.active = false;
    }
  });

  step.value[6].active = true;
  flicking.value.moveTo(6);
};


const backToAmount = () => {

    step.value.forEach((item) => {
        if (item.name == "divide") {
            item.active = false;
        }
    });

    step.value[0].active = true;

    flicking.value.moveTo(0);
    
    $zoom_close.set(false);
    $pan_down.set(false);
    $open_angpao.set(false);
    $flip_angpao.set(false);

    $zoom_far.set(true);

    $show_titles.set(true)


}

const backToDivide = () => {

  step.value.forEach((item) => {
    if (item.name == "summary") {
      item.active = false;
    }
  });

  step.value[1].active = true;

  // $zoom_close.set(false);
    $zoom_far.set(true);
  //   // $open_angpao.set(false);
    

  //   // $zoom_far.set(false);

    

  //   // $flip_angpao.set(true);
  //   $zoom_close.set(true);
  //   $pan_down.set(true);

  flicking.value.moveTo(1);
  

  
}

const colors = ref([
  {
    gradient: 'bg-gradient-to-b from-poppy-400 to-poppy-500',
    solid: 'bg-poppy',
    selected: true
  },
  {
    gradient: 'bg-gradient-to-b from-orange-400 to-orange-500',
    solid: 'bg-orange-500',
    selected: false
  },
  {
    gradient: 'bg-gradient-to-b from-yellow-400 to-yellow-500',
    solid: 'bg-yellow-500',
    selected: false
  },
  
  {
    gradient: 'bg-gradient-to-b from-green-400 to-green-500',
    solid: 'bg-green-500',
    selected: false
  },
  {
    gradient: 'bg-gradient-to-b from-blue-400 to-blue-500',
    solid: 'bg-blue-500',
    selected: false
  },
  {
    gradient: 'bg-gradient-to-b from-indigo-400 to-indigo-500',
    solid: 'bg-indigo-500',
    selected: false
  },
  {
    gradient: 'bg-gradient-to-b from-purple-400 to-purple-500',
    solid: 'bg-purple-500',
    selected: false
  },
  {
    gradient: 'bg-gradient-to-b from-pink-400 to-pink-500',
    solid: 'bg-pink-500',
    selected: false
  }
])


watch(customization_tab, (newVal) => {
  if(customization_tab.value == 'design') {
    $flip_angpao.set(false);
  } 
})

const angpao_message_input = ref('')

watch(customization_tab, (newVal) => {
  if(customization_tab.value == 'message') {
    $flip_angpao.set(true);
  } 
})

watch(angpao_message_input, () => {
  $angpao_message.set(angpao_message_input.value)
})

const randomizeDesign = () => {
  $angpao_design.set(`https://noun-api.com/beta/pfp?name=${nanoid(10)}`)
}

const selectAngpaoColor = (color) => {
  $selectedColorClass.set(color.gradient)
  $selectedBgColor.set(color.solid)

  colors.value.forEach((item) => {
    item.selected = false;
  })

  color.selected = true;
}

const username_input = ref(undefined)

const executeAngpaoCreate = () => {
  return new Promise( (resolve) => {

    let payload = {
      eth_amount: eth_amount.value,
      copies: copies.value,
      is_worldcoin_required: is_worldcoin_required.value,
      angpao_message: angpao_message_input.value,
      angpao_design: $angpao_design.get(),
      angpao_color: colors.value.find((item) => item.selected),
      username_input: `${username_input.value}.angpao.money`
    }

    console.log(payload)

    resolve()

  })
}


import { useAppKit } from '@reown/appkit/vue'
const openWallet = () => {
  console.log("openWallet openWallet openWallet")
  const walletmodal = useAppKit();
  walletmodal.open();
}

</script>

<style>
*:focus {
  outline: 0 !important;
}
</style>
