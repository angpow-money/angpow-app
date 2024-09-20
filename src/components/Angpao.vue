<template>
  <div class="w-full h-full flex-col flex justify-center items-center">
    <!-- <div class="fixed top-0 left-0 pointer-events-auto">
      <button @click="toggle_show_palette()" class="border">show_pallete</button>
      <button @click="toggle_zoom_close()" class="border">zoom_close</button>
      <button @click="toggle_zoom_far()" class="border">zoom_far</button>
      <button @click="toggle_flip()" class="border">flip</button>
      <button @click="toggle_open()" class="border">open</button>

      <button @click="toggle_pan_up()" class="border">pan_up</button>
    <button @click="toggle_pan_down()" class="border">pan_down</button>


    </div> -->

    <div :class="[ pan_up?'translate-y-[-30%]':'', pan_down?'translate-y-[20%]':'', pan_up_palette?'translate-y-[-15%]':'']" class="w-[90vw] max-w-[500px] aspect-[2/3] flex justify-center items-start relative duration-300 transition-all pointer-events-none">
        <div :class="[zoom_close ? 'scale-75' : '', zoom_far ? 'scale-50' : 'scale-100', flip_angpao ? '-translate-y-[0vh]' : '']" class="flex justify-center items-start relative duration-500 transition-all w-full h-full">
      <div :class="[!flip_angpao ? '' : '[transform:rotateY(-180deg)]', selectedColorClass]" class="absolute w-full h-full transition-all duration-300 shadow-2xl rounded-3xl" style="-webkit-backface-visibility: hidden; backface-visibility: hidden"></div>

      <div :class="[!flip_angpao ? 'rounded-xl [transform:rotateY(180deg)]' : 'rounded-xl rounded-t-none [transform:rotateY(0deg)]']" class="absolute w-full h-full bg-red-500 transition-all duration-300" style="-webkit-backface-visibility: hidden; backface-visibility: hidden">
        <div :class="[!flip_angpao ? '[transform:rotateY(180deg)] opacity-0' : '']" class="w-full aspect-square z-50 flex justify-center items-center transition-all duration-300 rounded-xl pointer-events-none">
          <div id="envelopeCover" class="aspect-square w-full overflow-hidden origin-top z-50">
            <div class="bg-blue-500/50 w-full h-full rotate-45 translate-y-[-70%] rounded-3xl"></div>
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
import { $state, $show_palette, $zoom_close, $zoom_far, $flip_angpao, $open_angpao, $pan_up, $pan_up_palette, $pan_down, $selectedColorClass } from "@/stores/angpao";

const state = useStore($state);
const show_palette = useStore($show_palette);
const zoom_close = useStore($zoom_close);
const zoom_far = useStore($zoom_far);
const flip_angpao = useStore($flip_angpao);
const open_angpao = useStore($open_angpao);
const pan_up = useStore($pan_up);
const pan_down = useStore($pan_down);
const pan_up_palette = useStore($pan_up_palette);


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
