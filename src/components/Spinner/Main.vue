<template>
    <div class="animate-spin border-4 border-t-slate-800/75  rounded-full" :class="size"></div>
</template>

<script setup>
import { computed,defineProps } from 'vue';


const props = defineProps({
    size: {
        type: String,
        default: 'h-6 w-6'
    }
});

const size = computed(() => props.size)
</script>