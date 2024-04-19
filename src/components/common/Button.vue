<script setup lang="ts">

const props = defineProps({
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
    class: {
        type: String,
        required: false,
        default: '', 
    },
});
</script>

<template>
  <button 
    :disabled="props.disabled" 
    class="py-2 px-3 lg:px-6 rounded text-[14px] flex place-items-center gap-2 h-10 font-medium bg-[#0D55CF] hover:bg-blue-800 active:bg-blue-900 text-white"
    :class="`${props.class}`"
  >
    <slot />
  </button>
</template>
