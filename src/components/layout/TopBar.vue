<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from "vue";

const darkMode = ref<Boolean>(true)
const { locale } = useI18n({ useScope: 'global' })
const isLenguageMenuOpen = ref<Boolean>(false)

const switchColorMode = () => {
  document.documentElement.classList.toggle("dark")
  darkMode.value = document.documentElement.classList.contains("dark")
}
</script>

<template>
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
                <button v-if="darkMode">
                  <v-icon name="fa-sun"></v-icon>
                </button>
                <button v-else>
                  <v-icon name="fa-moon"></v-icon>
                </button>
              </Transition>
            </button>
          </li>

          <div class="relative inline-block text-left">
            <button type="button" class="relative px-3" @click="isLenguageMenuOpen = !isLenguageMenuOpen">
              <v-icon name="io-language"></v-icon>
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
</template>

<style lang="postcss">
body {
  @apply min-h-screen bg-white dark:bg-gray-900 dark:text-gray-200;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: margin 0.15s ease-out, opacity .15s ease-out;
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