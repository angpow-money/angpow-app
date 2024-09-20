<template>

    <div class="w-full h-full min-h-screen flex justify-center items-center p-4 bg-black">

        <div class="w-full max-w-sm p-4 bg-white rounded-xl flex flex-col justify-between items-center">
            
            <div class="w-full flex justify-center items-center flex-col aspect-square ">
                <div class="text-7xl text-center mb-4">🧧</div>
                <h1 class="text-center text-xl">Hello! Create New Angpao!</h1>
            </div>

            <Button class="w-full">Create New</Button>

        </div>

    </div>

</template>

<script setup>

    import { Button } from "@/components/ui/button"
    import { ref } from "vue"

    const step = ref([
        {
            name: "start",
            active: true
        },
        {
            name: "connect_wallet",
            active: false
        },
        {
            name: "username",
            active: false
        },
        {
            name: "configure",
            active: false
        },
        {
            name: "result",
            active: false
        }
    ])

</script>