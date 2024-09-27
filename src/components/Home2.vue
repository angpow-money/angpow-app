<template>
  <div class="w-full min-h-[100dvh] relative z-10 pt-8 pb-[6rem]">

    <!-- <ConnectWallet></ConnectWallet> -->

    <div class="w-full flex justify-center items-center p-8 flex-col">
      <div class="w-40 h-40 rounded-full shadow-xl bg-white overflow-hidden ring-[0.5rem] ring-poppy-700/50 border-4 border-white">

        <img v-if="angpao_ens_name" class="w-full h-full" :src="`https://noun-api.com/beta/pfp?name=${angpao_ens_name_prefix}.angpao.money`" alt="">

      </div>

      <template v-if="angpao_ens_name" >

          <div class="text-center py-4 pt-8">
            <p class="text-3xl font-semibold">{{angpao_ens_name_prefix}}</p>
            <p class="text-xl font-normal">.angpao.money</p>
            
          </div>
          <button class="btn border-none bg-poppy-600 text-white px-4 py-2 rounded-full font-medium text-lg">{{ $account.value.address.substring(0, 6) }}...{{ $account.value.address.substring(38) }}</button>

      </template>


      <div v-else class="w-full py-8 text-center">

        <p v-if="$account.value?.address" class="mb-4">{{ $account.value?.address.substring(0, 6) }}...{{ $account.value?.address.substring(38) }}</p>
        <p v-else class="mb-4">0x0000....0000</p>


        <button @click="showClaimName()" class="btn w-full bg-white text-black border-black/20 shadow-xl rounded-3xl p-4 max-h-full m-0 h-auto text-xl font-medium mb-2 pointer-events-auto">Claim your Name for Free</button>
        

      </div>

      
    </div>

    <div class="w-full p-4 text-center">
      <p class="text-2xl font-medium">Angpao Sent</p>
      <p>tap to view</p>
    </div>

    <div class="w-full pointer-events-auto py-8">
      <Flicking ref="flicking" class="w-full h-full" :options="{ align: 'center', circular: false }">
        
        <div v-for="(angpow, index) of angpowList?.created" :key="index" class="p-4">
          <div @click="showAngpao('sent', angpow)" class="w-[60vw] sm:w-[300px] aspect-[3/4] bg-gray-200 shadow rounded-xl">
            <!-- {{ angpow }} -->


            <div :class="[ angpow?.angpow?.gradient ]" class="rounded-3xl flex justify-center items-end h-full relative">

              <div class="absolute top-5  bg-white/10 rounded-full text-white justify-center items-center flex font-bold">
                <img class="w-16 h-16" src="/logo.png" />
              </div>

              <div class="w-full overflow-hidden flex justify-center items-center p-4  ">
                <img class="w-full rounded-3xl overflow-hidden" :src="angpow?.angpow?.design" alt="">
              </div>

            </div>


          </div>
        </div>
        <!-- <div key="2" class="p-4">
          <div @click="showAngpao('sent')" class="w-[60vw] sm:w-[300px] aspect-[3/4] bg-gray-200 shadow rounded-xl"></div>
        </div>
        <div key="3" class="p-4">
          <div @click="showAngpao('sent')" class="w-[60vw] sm:w-[300px] aspect-[3/4] bg-gray-200 shadow rounded-xl"></div>
        </div> -->

      </Flicking>
    </div>

    <hr />

    <div class="w-full p-4 text-center mt-8">
      <p class="text-2xl font-medium">Angpao Received</p>
      <p>tap to view</p>
    </div>

    <div class="w-full pointer-events-auto py-8">
      <Flicking ref="flicking" class="w-full h-full" :options="{ align: 'center', circular: false }">
        
        <div v-for="(angpow, index) of angpowList?.received" :key="index" class="p-4">
          <div @click="showAngpao('receive', angpow)" class="w-[60vw] sm:w-[300px] aspect-[3/4] bg-gray-200 shadow rounded-xl">

            <div :class="[ angpow?.angpow?.gradient ]" class="rounded-3xl flex justify-center items-end h-full relative">

              <div class="absolute top-5  bg-white/10 rounded-full text-white justify-center items-center flex font-bold">
                <img class="w-16 h-16" src="/logo.png" />
              </div>

              <div class="w-full overflow-hidden flex justify-center items-center p-4  ">
                <img class="w-full rounded-3xl overflow-hidden" :src="angpow?.angpow?.design" alt="">
              </div>

            </div>

          </div>
        </div>

        <!-- <div key="2" class="p-4">
          <div @click="showAngpao('receive')" class="w-[60vw] sm:w-[300px] aspect-[3/4] bg-gray-200 shadow rounded-xl"></div>
        </div>
        <div key="3" class="p-4">
          <div @click="showAngpao('receive')" class="w-[60vw] sm:w-[300px] aspect-[3/4] bg-gray-200 shadow rounded-xl"></div>
        </div> -->
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
                        <!-- <p class="text-2xl font-medium my-2">junyao.angpow.money</p> -->
                        
                        <p v-if="currentAngpow?.angpow?.donatorEns" class="text-2xl font-medium my-2">{{ currentAngpow?.angpow?.donatorEns }}.angpao.money</p>
                        <p v-else class="text-2xl font-medium my-2">{{ currentAngpow?.angpow?.address.substring(0, 7) }}...{{ currentAngpow?.angpow?.address.substring(37) }}</p>


                        <p class="text-xl bg-black/5 rounded-xl text-black font-medium p-2">{{ formatEther(String(currentAngpow?.token_amount)) }} ETH</p>
                   </div>

                   <div class="w-full grid grid-cols-2" v-if="angpaoType=='sent'"> 

                    <div>
                        <p class="py-4 text-2xl font-semibold">{{ currentAngpow?.angpow?.amount }}</p>
                        <p class="text-gray-600">Total ETH</p>
                    </div>

                    <div>
                        <p class="py-4 text-2xl font-semibold">{{ currentAngpow?.events?.length }}/{{ currentAngpow?.angpow?.quantity }}</p>
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

                                <tr v-for="event of currentAngpow?.events">
                                    <!-- <td class="whitespace-nowrap py-2 pl-2 pr-2 text-sm font-medium text-gray-900 sm:pl-0 text-left">hello.angpow.money</td> -->
                                    
                                    <td v-if="event?.recipientEns" class="whitespace-nowrap py-2 pl-2 pr-2 text-sm font-medium text-gray-900 sm:pl-0 text-left">{{ event?.recipientEns?.replace(".angpao.money", "") }}.angpao.money</td>
                                    <td v-else class="whitespace-nowrap py-2 pl-2 pr-2 text-sm font-medium text-gray-900 sm:pl-0 text-left">{{ event?.recipient?.substring(0, 6) }}...{{ event?.recipient?.substring(38) }}</td>

                                    <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500 text-right">{{ formatEther(String(event?.token_amount)) }}</td>

                                </tr>

                                <!-- <tr>
                                    <td class="whitespace-nowrap py-2 pl-2 pr-2 text-sm font-medium text-gray-900 sm:pl-0 text-left">0x0123..</td>
                                    <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500 text-right">0.001</td>

                                </tr> -->


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

    <div class="sticky bottom-0 w-full p-4 z-50 flex justify-center items-center">
        <button @click="goHome()" class="max-w-sm btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold pointer-events-auto">New Angpao</button>
    </div>


  </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

import Angpao from "./Angpao.vue";


import { ref, computed } from "vue";
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";

import { $zoom_far, $zoom_close, $flip_angpao, $angpao_value, $angpao_message, $angpao_design, $selectedColorClass, $selectedBgColor } from "@/stores/angpao";
import { useStore } from "@nanostores/vue";

import { Input } from "@/components/ui/input";
import { onMounted } from "vue";
import { $account } from "@/stores/wallet";
// import ConnectWallet from "@/components/ConnectWallet.vue";
import { formatEther } from "viem";

const flip_angpao = useStore($flip_angpao)

const open = ref(false);
const angpaoType = ref();

// const angpao_ens_name = ref('yikkai.angpao.money')
const angpao_ens_name = ref(null);
const angpowList = ref([]);

const show_username_modal = ref(false)
const username_input = ref()
const currentAngpow = ref(null);

const showAngpao = async (type, _angpow) => {

    $zoom_far.set(false)
    $zoom_close.set(true)

    angpaoType.value = type;
    open.value = true;
    


    const events = await fetch(`/api/angpow/${_angpow.angpow_id}/history.json`).then(res => res.json())
    // .then(res => res.event)
    // console.log('events', events)

    currentAngpow.value = _angpow;
    console.log("currentAngpow.value", currentAngpow.value);
    currentAngpow.value['events'] = events;

    $angpao_value.set(_angpow.angpow.amount)
    $angpao_design.set(_angpow.angpow.design)
    $angpao_message.set(_angpow.angpow.message)
    $selectedColorClass.set(_angpow.angpow.gradient)
    $selectedBgColor.set(_angpow.angpow.solid)


    if(type == "receive") {
      const donatorEns = await fetch(`/api/ensName.json?address=${_angpow?.angpow?.address}`)
        .then(res => res.json())
        .then(res => res.name)

      currentAngpow.value['angpow']['donatorEns'] = donatorEns.replace(".angpao.money", "");
      console.log("donatorEns", donatorEns)
    }

    if(type == "sent") {

      const addrArr = currentAngpow.value.events.map(x => x?.recipient.toLowerCase());
      console.log("addrArr", addrArr);

      if(addrArr?.length > 0) {
        const ens = await fetch(`/api/ensName.json`, {
          method: "post",
          body: JSON.stringify(addrArr)
        }).then(res => res.json())
  
        for(let i=0; i< ens.length; i++) {
          currentAngpow.value.events[i]['recipientEns'] = ens[i];
        }
        console.log("ens ens", ens);
      }


    }


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

import { setEnsName, getEnsName } from "@/pages/api/_util";
const submitUsername = async () => {

  console.log(username_input.value, $account.value?.address)

  if(!$account.value?.address || !username_input.value || username_input.value === "") return;

  const ensName = await getEnsName($account.value?.address.toLowerCase())
  if (ensName === "" || !ensName) {
    await setEnsName({
      "key": username_input.value,
      "value": {
        "addresses": {
          "60": $account.value?.address
        },
      }
    })
  }

  show_username_modal.value = false


}


onMounted( async () => {

  $account.subscribe( async () => {

    if($account.value?.address) {
      angpao_ens_name.value = await fetch(`/api/ensName.json?address=${$account.value?.address}`)
        .then(res => res.json())
        .then(res => res.name)

        console.log("angpao_ens_name", angpao_ens_name.value);


      // const addr = "0xFEA11D726A68BD86b1Fe6c0D43C5f423c4517117";
      // const addr = "0x77c9ec0e5c571d7593f9d608a3674f6057fc9a9f";
      const addr = $account.value?.address;
      angpowList.value = await fetch(`/api/wallet/${addr}.json`).then(res => res.json())
      console.log("angpowList", angpowList.value)


    }

  })
})


const goHome = () => {
  window.location.href = window.location.origin
}

</script>
