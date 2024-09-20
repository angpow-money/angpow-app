<template>

    <div class="fixed w-screen h-[100dvh] flex-col flex justify-center items-center">

        <div class="fixed top-0 left-0">
            <button @click="toggle_show_palette()" class="border">show_pallete</button>
            <button @click="toggle_zoom_close()" class="border">zoom_close</button>
            <button @click="toggle_zoom_far()" class="border">zoom_far</button>
            <button @click="toggle_flip()" class="border">flip</button>

        </div>
        


        <div :class="[zoom_close ? '-mt-12':'',zoom_far?'scale-50':'scale-100', flip_for_message?'scale-75 -translate-y-[0vh]':'']" class="w-[90vw] max-w-[500px] aspect-[2/3] flex justify-center items-start relative duration-300 transition-all">
            <div :class="[!flip_for_message?'':'[transform:rotateY(-180deg)]']" class="absolute w-full h-full bg-black  transition-all duration-300 rounded-3xl" style="-webkit-backface-visibility: hidden;backface-visibility: hidden;">
            </div>

           


            <div :class="[!flip_for_message?'rounded-xl [transform:rotateY(180deg)]':'rounded-xl rounded-t-none [transform:rotateY(0deg)]']" class="absolute w-full h-full bg-red-500 transition-all duration-300"  style="-webkit-backface-visibility: hidden;backface-visibility: hidden;" >

                <div :class="[!flip_for_message?'[transform:rotateY(180deg)] opacity-0':'']"   class="w-full aspect-square z-50 flex justify-center items-center transition-all duration-300 rounded-xl pointer-events-none">


                
<div id="envelopeCover" class="aspect-square w-full overflow-hidden origin-top z-50">
    <div class="bg-blue-500/50 w-full h-full rotate-45 translate-y-[-70%] rounded-3xl">

</div>


</div>
</div>


            </div>

        </div>

        
        
        <section :class=" [ show_palette ? 'translate-y-0' : 'translate-y-[120%]','duration-300 transition-all w-full fixed bottom-[0dvh]'] ">

            <div class="px-4  w-full">
                <div class="bg-black rounded-t-3xl p-3 grid grid-cols-7">
    
                    <div class="col-span-5 grid grid-cols-4 gap-3">
                        <div v-for="i in 8" class="bg-white rounded-full w-10 h-10">
    
                        </div>
                    </div>
    
    
                    <div class="w-full h-full flex justify-center items-center pr-2 pl-4 col-span-2">
                        <div class="w-full aspect-square rounded-2xl bg-white"></div>
                    </div>
    
                    
                </div>

            </div>
        </section>


    </div>
    
</template>


<script setup>

    import anime from 'animejs'
    import { watch } from 'vue'
    import { computed } from 'vue'

    import { useStore } from '@nanostores/vue'
    import { $state, $show_palette, $zoom_close, $zoom_far, $flip_for_message } from '@/stores/angpao';

    const state = useStore($state)
    const show_palette = useStore($show_palette)
    const zoom_close = useStore($zoom_close)
    const zoom_far = useStore($zoom_far)
    const flip_for_message = useStore($flip_for_message)

    // watch(state, () => {

    //     if(state.value == 'customize_design') {
            


    //     }


    // })

    const toggle_show_palette = () => {
        $show_palette.set(!show_palette.value)
    }

    const toggle_zoom_close = () => {
        $zoom_close.set(!zoom_close.value)
    }
    
    const toggle_zoom_far = () => {
        $zoom_far.set(!zoom_far.value)
    }

    const toggle_flip = async () => {
        
        let now_flip_state = flip_for_message.value

        if(!now_flip_state) {
            $flip_for_message.set(true)
        } 

        // :class="[!flip_for_message?'[transform:rotateX(0deg)rotateY(180deg)]':'[transform:rotateX(180deg)rotateY(180deg)]']"

        await new Promise( (resolve) => {
            let tl = anime.timeline({
                easing: 'easeInOutSine',
            });

        if(!now_flip_state) {
            console.log('flip')
            

            tl.add({
                targets: '#envelopeCover',
                rotateX: '180deg',
                delay: 200,
                duration: 500,
            })

            tl.play()

            tl.complete = () => {
                console.log('complete')
                resolve()
            }
    

        } else {
            console.log('unflip')
            
            let tl = anime.timeline({
                easing: 'easeInOutSine',
            });

            tl.add({
                targets: '#envelopeCover',
                rotateX: '0deg',
                duration: 300,
                complete: () => {
                    console.log('complete')
                    resolve()
                }
            })

            tl.play()

            
        }

    })
        

        if(now_flip_state) {
            $flip_for_message.set(false)
        }


    }


</script>