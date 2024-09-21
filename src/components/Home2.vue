<template>
  <div class="w-full min-h-[100dvh] relative z-10 pt-8 pb-[6rem]">

    

    <div class="w-full flex justify-center items-center p-8 flex-col">
      <div class="w-40 h-40 rounded-full shadow-xl bg-white overflow-hidden ring-[0.5rem] ring-poppy-700/50 border-4 border-white">

        <img v-if="angpao_ens_name" class="w-full h-full" :src="`https://noun-api.com/beta/pfp?name=${angpao_ens_name_prefix}.angpao.money`" alt="">

      </div>

      <template v-if="angpao_ens_name" >

          <div class="text-center py-4 pt-8">
            <p class="text-3xl font-semibold">{{angpao_ens_name_prefix}}</p>
            <p class="text-xl font-normal">.angpao.money</p>
            
          </div>
          <button class="btn border-none bg-poppy-600 text-white px-4 py-2 rounded-full font-medium text-lg">0x01234..0000</button>

      </template>


      <div v-else class="w-full py-8 text-center">

        <p class="mb-4">0x0000....0000</p>

        <button @click="showClaimName()" class="btn w-full bg-white text-black border-black/20 shadow-xl rounded-3xl p-4 max-h-full m-0 h-auto text-xl font-medium mb-2 pointer-events-auto">Claim your Name for Free</button>
        

      </div>

      
    </div>

    <div class="w-full p-4 text-center">
      <p class="text-2xl font-medium">Angpao Sent</p>
      <p>tap to view</p>
    </div>

    <div class="w-full pointer-events-auto py-8">
      <Flicking ref="flicking" :options="{ align: 'center', circular: false }">
        <div key="1" class="p-4">
          <div @click="showAngpao('sent')" class="w-[60vw] aspect-[3/4] bg-gray-200 shadow rounded-xl"></div>
        </div>

        <div key="2" class="p-4">
          <div @click="showAngpao('sent')" class="w-[60vw] aspect-[3/4] bg-gray-200 shadow rounded-xl"></div>
        </div>
        <div key="3" class="p-4">
          <div @click="showAngpao('sent')" class="w-[60vw] aspect-[3/4] bg-gray-200 shadow rounded-xl"></div>
        </div>
      </Flicking>
    </div>

    <hr />

    <div class="w-full p-4 text-center mt-8">
      <p class="text-2xl font-medium">Angpao Received</p>
      <p>tap to view</p>
    </div>

    <div class="w-full pointer-events-auto py-8">
      <Flicking ref="flicking" :options="{ align: 'center', circular: false }">
        <div key="1" class="p-4">
          <div @click="showAngpao('receive')" class="w-[60vw] aspect-[3/4] bg-gray-200 shadow rounded-xl"></div>
        </div>

        <div key="2" class="p-4">
          <div @click="showAngpao('receive')" class="w-[60vw] aspect-[3/4] bg-gray-200 shadow rounded-xl"></div>
        </div>
        <div key="3" class="p-4">
          <div @click="showAngpao('receive')" class="w-[60vw] aspect-[3/4] bg-gray-200 shadow rounded-xl"></div>
        </div>
      </Flicking>
    </div>

    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-10" @close="open = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform">

                <div>
                    <Angpao @click="angpaoTap()" class="pointer-events-auto"></Angpao>
                </div>

                <div class="w-full bg-white p-4 rounded-xl shadow-xl mb-4">

                   <div v-if="angpaoType=='receive'">
                    <p class="text-gray-500">from</p>
                        <p class="text-2xl font-medium my-2">junyao.angpow.money</p>

                        <p class="text-xl bg-black/5 rounded-xl text-black font-medium p-2">0.001 ETH</p>
                   </div>

                   <div class="w-full grid grid-cols-2" v-if="angpaoType=='sent'"> 

                    <div>
                        <p class="py-4 text-2xl font-semibold">1</p>
                        <p class="text-gray-600">Total ETH</p>
                    </div>

                    <div>
                        <p class="py-4 text-2xl font-semibold">0/5</p>
                        <p class="text-gray-600">Opened</p>
                    </div>
                    
                   </div>

                </div>

                <div v-if="angpaoType=='sent'" class="w-full bg-white p-4 rounded-xl shadow-xl mb-4">
                    <div class="px-4 sm:px-6 lg:px-8">
                        <div class="sm:flex sm:items-center">
                        <div class="sm:flex-auto">
                            <h1 class="text-base font-semibold leading-6 text-gray-900">Recipients</h1>
                            <!-- <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title, email and role.</p> -->
                        </div>
                        <!-- <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add user</button>
                        </div> -->
                        </div>
                        <div class="mt-8 flow-root">
                        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead>
                                <tr>
                                    <th scope="col" class="py-3.5 pl-2 pr-2 text-left text-sm font-semibold text-gray-900 sm:pl-0">Recipient</th>
                                    <th scope="col" class="px-2 py-3.5 text-right text-sm font-semibold text-gray-900">Amount (ETH)</th>
                                    
                                </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200">
                                <tr>
                                    <td class="whitespace-nowrap py-2 pl-2 pr-2 text-sm font-medium text-gray-900 sm:pl-0 text-left">hello.angpow.money</td>
                                    <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500 text-right">0.001</td>

                                </tr>

                                <tr>
                                    <td class="whitespace-nowrap py-2 pl-2 pr-2 text-sm font-medium text-gray-900 sm:pl-0 text-left">0x0123..</td>
                                    <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500 text-right">0.001</td>

                                </tr>


                                </tbody>
                            </table>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                
                <button @click="closeModal()" class="btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold pointer-events-auto">Close</button>
                


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

    <div class="fixed bottom-0 w-full p-4 z-50">
        <button class=" btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold pointer-events-auto">New Angpao</button>

    </div>


  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

import Angpao from "./Angpao.vue";


import { ref, computed } from "vue";
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";

import { $flip_angpao, $zoom_far, $zoom_close } from "@/stores/angpao";
import { useStore } from "@nanostores/vue";

import { Input } from "@/components/ui/input";


const flip_angpao = useStore($flip_angpao)

const open = ref(false);
const angpaoType = ref();

const angpao_ens_name = ref('yikkai.angpao.money')

const show_username_modal = ref(false)
const username_input = ref()
const showAngpao = (type) => {

    $zoom_far.set(false)
    $zoom_close.set(true)

    angpaoType.value = type;
    open.value = true;
};

const angpaoTap = () => {
    
    $flip_angpao.set(!flip_angpao.value);

}

const closeModal = () => {

    angpaoType.value = undefined;
    open.value = false;

    $zoom_far.set(false)
    $zoom_close.set(false)
    $flip_angpao.set(false)


}

const angpao_ens_name_prefix = computed( () => {

    return String(angpao_ens_name.value).replace('.angpao.money','')

})

const showClaimName = () => {

    show_username_modal.value = true

}

const submitUsername = () => {
    show_username_modal.value = false
}

</script>
