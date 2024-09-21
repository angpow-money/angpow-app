<template>
  <div class="w-full h-full flex-col flex justify-center items-center  ">
    <!-- <div class="fixed top-0 left-0 pointer-events-auto">
      <button @click="toggle_show_palette()" class="border">show_pallete</button>
      <button @click="toggle_zoom_close()" class="border">zoom_close</button>
      <button @click="toggle_zoom_far()" class="border">zoom_far</button>
      <button @click="toggle_flip()" class="border">flip</button>
      <button @click="toggle_open()" class="border">open</button>

      <button @click="toggle_pan_up()" class="border">pan_up</button>
    <button @click="toggle_pan_down()" class="border">pan_down</button>
      

    </div> -->
    

    <div :class="[ pan_up_up?'translate-y-[-40%]':'', pan_up?'translate-y-[-30%]':'', pan_down?'translate-y-[20%]':'', pan_down_open?'translate-y-[50%]':'', pan_up_palette?'translate-y-[-15%] sm:translate-y-[-3rem]':'']" class="w-[90vw] sm:w-[50vw] aspect-[2/3] flex justify-center items-start relative duration-300 transition-all pointer-events-auto  max-w-[500px]">
        <div :class="[zoom_close ? 'scale-75' : '', zoom_far ? 'scale-50' : 'scale-100', flip_angpao ? '-translate-y-[0vh]' : '', zoom_far_far?'scale-[30%]':'']" class="flex justify-center items-start relative duration-500 transition-all w-full h-full">

          

      <div :class="[!flip_angpao ? '' : '[transform:rotateY(-180deg)]', selectedColorClass ]" class="absolute w-full h-full transition-all duration-500 rounded-3xl flex justify-center items-end" style="-webkit-backface-visibility: hidden; backface-visibility: hidden">

        <div class="absolute top-10 w-24 h-24 bg-white/10 rounded-full text-white justify-center items-center flex font-bold">
          LOGO
        </div>

        <div v-if="angpao_design" class="w-full overflow-hidden flex justify-center items-center p-4  ">
            <img class="w-full rounded-3xl  overflow-hidden" :src="angpao_design" alt="">
          </div>

      </div>

      <div :class="[!flip_angpao ? 'rounded-xl [transform:rotateY(180deg)]' : 'rounded-xl rounded-t-none [transform:rotateY(0deg)]', selectedBgColor]" class="absolute w-full h-full transition-all duration-500" style="-webkit-backface-visibility: hidden; backface-visibility: hidden">


        <article class="absolute bottom-0 p-4 w-full h-auto z-[999] text-white text-center">
           <span class="sm:text-6xl">{{ angpao_message }}</span>
          
           <div class="w-full flex justify-center items-center mt-8 sm:mb-4">
            <div class="bg-red-800 text-white rounded-full p-2 px-4 text-sm sm:text-4xl">angpao.money</div>
           </div>

        </article>

        <div :class="[!flip_angpao ? '[transform:rotateY(180deg)] opacity-0' : '']" class="w-full aspect-square z-50 flex justify-center items-start transition-all duration-500 rounded-xl pointer-events-none relative">

          <div class="w-full aspect-[3/4] absolute flex justify-center items-center z-50 " :class="selectedBgColor">

          </div>

          <div :class="[token_up?'translate-y-[-100%]':'translate-y-[50%] opacity-0 ']" class="w-full aspect-square absolute flex justify-center items-center z-30 duration-1000 transition-all ">
            
            <div class="absolute flex justify-center items-center w-full max-w-[10rem]">
              <div class=" bg-white shadow-2xl shadow-black/50 rounded-full aspect-square w-full flex justify-center items-center">

                <iconify-icon class="text-[9rem]" icon="cryptocurrency-color:eth"></iconify-icon>

              </div>
              <div class="absolute bottom-[-1rem] right-[-1rem] bg-white p-2 px-2 rounded-full text-lg shadow-xl border border-black/20">{{ angpao_eth_amount }} ETH</div>
            </div>


            
          </div>

          <div id="envelopeCover" class="w-full h-[40rem] overflow-hidden origin-top z-20 border-t-2 border-t-poppy-300">
            <div :class="selectedBgColor" class=" w-full h-full translate-y-[-80%] rounded-3xl rounded-b-[3rem] brightness-90 p-2">

              <div class="w-full h-full bg-black/20 rounded-[2.5rem]">

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    </div>

    <section :class="[show_palette ? 'translate-y-0' : 'translate-y-[120%]', 'duration-300 transition-all w-full fixed bottom-[0dvh]']">
      <!-- <div class="px-4 w-full">
        <div class="bg-black rounded-t-3xl p-3 grid grid-cols-7">
          <div class="col-span-5 grid grid-cols-4 gap-3">
            <div v-for="i in 6" class="bg-white rounded-full w-10 h-10"></div>
          </div>

          <div class="w-full h-full flex justify-center items-center pr-2 pl-4 col-span-2">
            <div class="w-full aspect-square rounded-2xl bg-white"></div>
          </div>
        </div>
      </div> -->

      <div class="px-4 w-full flex flex-col justify-end items-center">

        <div class="p-2 bg-black mb-8 rounded-full flex space-x-2">
            <div class="w-8 h-8 rounded-full bg-white"></div>
            <div class="w-8 h-8 rounded-full bg-white"></div>
            <div class="w-8 h-8 rounded-full bg-white"></div>
            <div class="w-8 h-8"></div>
            
            <div class="w-8 h-8 rounded-xl bg-white"></div>


        </div>

        
        
        <button class="opacity-0 pointer-events-none btn w-full bg-black text-white rounded-xl p-4 max-h-full m-0 h-auto text-xl font-semibold mb-2">Next</button>
      </div>

    </section>
  </div>
</template>

<script setup>
import anime from "animejs";
import { watch } from "vue";
import { computed } from "vue";

import { useStore } from "@nanostores/vue";
import { $state, $show_palette, $zoom_close, $zoom_far, $flip_angpao, $open_angpao, $pan_up, $pan_up_palette, $pan_down, $pan_down_open, $selectedColorClass, $token_up, $selectedBgColor, $zoom_far_far, $pan_up_up, $angpao_message, $angpao_design, $angpao_eth_amount } from "@/stores/angpao";

const state = useStore($state);
const show_palette = useStore($show_palette);
const zoom_close = useStore($zoom_close);
const zoom_far = useStore($zoom_far);
const flip_angpao = useStore($flip_angpao);
const open_angpao = useStore($open_angpao);
const pan_up = useStore($pan_up);
const pan_down = useStore($pan_down);
const pan_up_palette = useStore($pan_up_palette);
const pan_down_open = useStore($pan_down_open);
const token_up = useStore($token_up);
const selectedBgColor = useStore($selectedBgColor);
const zoom_far_far = useStore($zoom_far_far);
const pan_up_up = useStore($pan_up_up);
const angpao_message = useStore($angpao_message)
const angpao_design = useStore($angpao_design)
const angpao_eth_amount = useStore($angpao_eth_amount)

//// FORM

const selectedColorClass = useStore($selectedColorClass);


// watch(state, () => {

//     if(state.value == 'customize_design') {

//     }

// })

const toggle_show_palette = () => {
  $show_palette.set(!show_palette.value);
};

const toggle_zoom_close = () => {
  $zoom_close.set(!zoom_close.value);
};

const toggle_zoom_far = () => {
  $zoom_far.set(!zoom_far.value);
};

const toggle_flip = async () => {
//   let now_flip_state = flip_angpao.value;

//   if (!now_flip_state) {
//     $flip_angpao.set(true);
//   }

//   // :class="[!flip_angpao?'[transform:rotateX(0deg)rotateY(180deg)]':'[transform:rotateX(180deg)rotateY(180deg)]']"

//   await new Promise((resolve) => {
//     let tl = anime.timeline({
//       easing: "easeInOutSine",
//     });

//     if (!now_flip_state) {
//       console.log("flip");

//       tl.add({
//         targets: "#envelopeCover",
//         rotateX: "180deg",
//         delay: 200,
//         duration: 500,
//       });

//       tl.play();

//       tl.complete = () => {
//         console.log("complete");
//         resolve();
//       };
//     } else {
//       console.log("unflip");

//       let tl = anime.timeline({
//         easing: "easeInOutSine",
//       });

//       tl.add({
//         targets: "#envelopeCover",
//         rotateX: "0deg",
//         duration: 300,
//         complete: () => {
//           console.log("complete");
//           resolve();
//         },
//       });

//       tl.play();
//     }
//   });

//   if (now_flip_state) {
    // $flip_angpao.set(false);
//   }
$flip_angpao.set(!flip_angpao.value);
};

const toggle_open = async () => {

//     let now_open_state = open_angpao.value;

//   if (!now_flip_state) {
//     $flip_angpao.set(true);
//   }

await new Promise((resolve) => {

    $open_angpao.set(!open_angpao.value);
    
    let tl = anime.timeline({
      easing: "easeInOutSine",
    });

    if (open_angpao.value) {
      console.log("flip");

      tl.add({
        targets: "#envelopeCover",
        rotateX: "180deg",
        delay: 200,
        duration: 500,
      });

      tl.play();

      tl.complete = () => {
        console.log("complete");
        resolve();
      };
    } else {
      console.log("unflip");

      let tl = anime.timeline({
        easing: "easeInOutSine",
      });

      tl.add({
        targets: "#envelopeCover",
        rotateX: "0deg",
        duration: 300,
        complete: () => {
          console.log("complete");
          resolve();
        },
      });

      tl.play();
    }
  });




};

const toggle_pan_up = () => {
  $pan_up.set(!pan_up.value);
};

const toggle_pan_down = () => {
  $pan_down.set(!pan_down.value);
};

watch(open_angpao, async () => {

await new Promise((resolve) => {

// $open_angpao.set(!open_angpao.value);

let tl = anime.timeline({
  easing: "easeInOutSine",
});

if (open_angpao.value) {
  console.log("flip");

  tl.add({
    targets: "#envelopeCover",
    rotateX: "180deg",
    delay: 200,
    duration: 500,
  });

  tl.play();

  tl.complete = () => {
    console.log("complete");
    resolve();
  };
} else {
  console.log("unflip");

  let tl = anime.timeline({
    easing: "easeInOutSine",
  });

  tl.add({
    targets: "#envelopeCover",
    rotateX: "0deg",
    duration: 300,
    complete: () => {
      console.log("complete");
      resolve();
    },
  });

  tl.play();
}
});
})

</script>
