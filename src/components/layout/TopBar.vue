<script setup lang="ts">
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const darkMode = ref<Boolean>(true)
const { locale } = useI18n({ useScope: 'global' })
const isLenguageMenuOpen = ref<Boolean>(false)

const switchColorMode = () => {
  document.documentElement.classList.toggle('dark')
  darkMode.value = document.documentElement.classList.contains('dark')
}
</script>
<template>
  <nav class="dark:bg-slate-800 flex justify-between items-center px-4">
    <h1 class="text-center text-2xl xl:text-4xl font-black my-3 gradient-title">
      {{ $t('appTitle') }}
    </h1>
    <div class="flex">
      <PrimaryButton
        class="mx-[2px] lg:px-3 xl:mx-3 flex-col active:bg-blue-900 overflow-hidden"
        @click="switchColorMode"
      >
        <Transition name="slide-up">
          <v-icon v-if="darkMode" name="pr-sun"></v-icon>
          <v-icon v-else name="pr-moon"></v-icon>
        </Transition>
      </PrimaryButton>
      <div class="flex mx-[2px] justify-center items-center">
        <div class="relative inline-block text-left">
          <div>
            <PrimaryButton
              type="button"
              class="px-3"
              @click="isLenguageMenuOpen = !isLenguageMenuOpen"
            >
              <v-icon name="io-language"></v-icon>
            </PrimaryButton>
          </div>

          <div
            :class="{ hidden: !isLenguageMenuOpen }"
            class="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div class="py-1" role="none">
              <button
                class="w-full block px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 dark:text-white dark:bg-slate-800 dark:hover:bg-gray-900 dark:active:bg-gray-950"
                role="menuitem"
                @click="
                  () => {
                    locale = 'en'
                    isLenguageMenuOpen = false
                  }
                "
              >
                ENG
              </button>
              <button
                class="w-full block px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 dark:text-white dark:bg-slate-800 dark:hover:bg-gray-900 dark:active:bg-gray-950"
                role="menuitem"      
                @click="
                  () => {
                    locale = 'sp'
                    isLenguageMenuOpen = false
                  }
                "
              >
                ESP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<!-- <template>
  <header>
    <nav>
      <ul class="flex">
        <li>
          <h1>
            {{ $t('appTitle') }}
          </h1>
        </li>
        <li>
          <button class="bg-blue-400 mx-[2px] lg:px-3 xl:mx-3 flex-col active:bg-blue-900 overflow-hidden"
            @click="switchColorMode">
            <Transition name="slide-up">

            </Transition>
          </button>
        </li>

        <div class="relative inline-block text-left">
          <button type="button" class="relative px-3" @click="isLenguageMenuOpen = !isLenguageMenuOpen">
          </button>
          <div :class="{ 'hidden': !isLenguageMenuOpen }"
            class="z-10 origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5"
            role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div class="py-1" role="none">
              <button
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900"
                role="menuitem" @click="() => { locale = 'en'; isLenguageMenuOpen = false }">
                ENG
              </button>
              <button
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900"
                role="menuitem" @click="() => { locale = 'sp'; isLenguageMenuOpen = false }">
                ESP
              </button>
            </div>
          </div>
        </div>
      </ul>
    </nav>
  </header>
</template> -->

<style lang="postcss">
body {
  @apply min-h-screen bg-white dark:bg-gray-900 dark:text-gray-200;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    margin 0.15s ease-out,
    opacity 0.15s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  margin: 30px 0 0 0;
}

.slide-up-leave-to {
  opacity: 0;
  margin: -30px 0 0 0;
  /* transform: translateX(30px); */
}
</style>
