<script setup lang="ts">

const props = defineProps({
    class: {
        type: String,
        required: false,
        default: '', 
    },
    iconClass: {
        type: String,
        required: false,
        default: '', 
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false, 
    },
});
</script>

<template>
  <button
    :disabled="props.disabled"
    class="py-2 px-3 xl:pr-6 xl:pl-4 xl:border xl:border-[#C6CDD2] dark:xl:border-gray-700 rounded text-[14px] flex place-items-center gap-2 h-10"
    :class="`${props.disabled ? 'text-[#C6CDD2] dark:text-slate-700' : 'text-[#8A94A6] dark:text-slate-500 dark:xl:border-gray-600'} ${props.class}`"
  >
    <!-- Use the iconClass prop to dynamically set classes for the icon button -->
    <button
      :disabled="props.disabled"
      :class="`${props.iconClass}`"
    >
      <slot name="icon" />
    </button>
    <!-- Use the default slot for the button's text -->
    <span class="hidden xl:block">
      <slot name="default" />
    </span>
  </button>
</template>
