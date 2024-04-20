<script setup lang="ts">
import type { Task } from '@/types/taskInterface'
import { useTasksStore } from '@/store/store'
import { storeToRefs } from 'pinia'
import { ref, computed, watch } from 'vue'
import IconButton from '@/components/common/IconButton.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

const taskStore = useTasksStore()
const { addTask, setCreatingTask, setIsEditingTask, updateTask, setCurrentTask, clearTasksStore } =
  taskStore
const { isEditingTask, getCurrentTask } = storeToRefs(taskStore)

const maxTitleChars = 50
const maxBodyChars = 280
const defaultTaskItem: Task = {
  id: '',
  title: '',
  body: '',
  formattedBody: '',
  isCompleted: false
}
const textarea = ref<HTMLTextAreaElement>()
const isTaskBoxOpen = ref(false)
const taskItem = ref<Task>({ ...defaultTaskItem })
const creatingNewTask = computed(
  () => (taskItem.value.body != '' || taskItem.value.title != '') && isTaskBoxOpen.value && !taskItem.value.id
)
const isEmptyTaskBody = computed(() => taskItem.value.body === '')
const isEmptyTaskTitle = computed(() => taskItem.value.title === '')
const isEmptyTask = computed(() => taskItem.value.title === '' || taskItem.value.body === '')

const toggleTaskBox = (): void => {
  isTaskBoxOpen.value = !isTaskBoxOpen.value

  setTimeout(() => {
    textarea.value?.focus()
  }, 0)
}

watch(creatingNewTask, (): void => {
  setCreatingTask(creatingNewTask.value)
})

watch(isEditingTask, (): void => {
  if (isEmptyTask.value) {
    taskItem.value = getCurrentTask.value
    isTaskBoxOpen.value = true
  }
})

const clearTaskEditor = (): void => {
  taskItem.value = { ...defaultTaskItem }
}

const saveTaskToStore = (): void => {
  if (isEmptyTask.value) {
    toggleTaskBox()
  } else if (taskItem.value.id) {
    updateTask({ ...taskItem.value })
    setIsEditingTask(false)
  } else {
    addTask(taskItem.value)
    setCreatingTask(false)
  }
  clearTaskEditor()
}

const cancel = (): void => {
  setCreatingTask(false)
  setIsEditingTask(false)
  isTaskBoxOpen.value = false
  setCurrentTask({ ...defaultTaskItem })
  taskItem.value = { ...defaultTaskItem }
}

const handleBodyInput = (event: Event): void => {
  const textarea = event.target as HTMLTextAreaElement
  if (textarea.value.length <= maxBodyChars) {
    taskItem.value.body = textarea.value
  } else {
    taskItem.value.body = textarea.value = textarea.value.substring(0, maxBodyChars)
  }
}

const handleTitletInput = (event: Event): void => {
  const input = event.target as HTMLInputElement
  if (input.value.length <= maxTitleChars) {
    taskItem.value.title = input.value
  } else {
    taskItem.value.title = input.value = input.value.substring(0, maxTitleChars)
  }
}

const addCharacter = (character: string) => {
  if (textarea.value) {
    const start = textarea.value.selectionStart
    const end = textarea.value.selectionEnd
    const textBefore = textarea.value.value.substring(0, start)
    const textAfter = textarea.value.value.substring(end, textarea.value.value.length)
    taskItem.value.body = textBefore + character + textAfter
    const newPosition = start + 1
    textarea.value.focus()
    setTimeout(() => {
      if (textarea.value) {
        textarea.value.setSelectionRange(newPosition, newPosition)
      }
    }, 1)
  }
}
</script>

<template>
  <div v-if="!isTaskBoxOpen" class="flex">
    <button class="text-[#8A94A6] flex justify-center items-center gap-2 my-5" @click="toggleTaskBox">
      <v-icon class="text-blue-600 mt-[3px]" name="pr-plus-circle" scale="1.3"></v-icon>
      {{ $t('taskPlaceholder') }}
    </button>
    <button
      class="ml-auto my-5 text-red-500 p-1 px-3 rounded border border-transparent hover:border-red-500 active:bg-red-500 active:text-white transition-colors duration-150"
      @click="clearTasksStore">
      <span class="hidden xl:inline">{{ $t('clearTasksStore') }}</span>
      <span class="xl:hidden">
        <v-icon name="gi-broom" scale="1.2"></v-icon>
      </span>
    </button>
  </div>

  <div v-else class="flex-col w-full rounded-md border border-[#F1F3F4] dark:border-gray-800 my-5 shadow-lg">
    <div class="h-40 xl:h-46 w-full max-w-[1360px] flex-col justify-center p-3">
      <form>
        <div class="rounded border border-gray-200 dark:border-slate-800 h-10 relative">
          <input :value="taskItem.title" @keyup="handleTitletInput" :placeholder="$t('taskTitlePlaceholder')"
            class="pl-2 pt-1 bg-transparent text-gray-500 caret-blue-500 placeholder:text-slate-500 rounded w-full outline-none"
            type="text" name="task-editor-title" id="task-editor-title" :max-length="maxTitleChars">
          <span class="text-right block w-12 text-[.8rem] absolute bottom-1 right-2 text-slate-400"
            :class="{ 'opacity-50': isEmptyTaskTitle }">{{ taskItem.title.length }}/{{ maxTitleChars }}</span>
        </div>
        <div class="mt-3 xl:mt-3 h-20 p-1 rounded relative border border-gray-200 dark:border-slate-800">
          <textarea :maxlength="maxBodyChars" id="task-editor" ref="textarea" :value="taskItem.body"
            name="task-editor-body"
            class="pl-1 w-full rounded resize-none dark:bg-gray-900 text-gray-500 overflow-y-auto focus:outline-none caret-blue-500 placeholder:text-slate-500"
            :placeholder="$t('taskBodyPlaceholder')" @keyup="handleBodyInput" @keydown.ctrl.enter="saveTaskToStore" />
          <span class="text-right block w-12 text-[.8rem] absolute bottom-1 right-2 text-slate-400"
            :class="{ 'opacity-50': isEmptyTaskBody }">{{ taskItem.body.length }}/{{ maxBodyChars }}</span>
        </div>
      </form>
    </div>
    <div class="flex justify-between bg-[#FAFBFB] dark:bg-slate-800 h-14 items-center px-2 rounded-md">
      <div class="flex gap-[5px] xl:gap-1">
        <IconButton @click="addCharacter('#')">
          <template #icon>
            <v-icon name="pr-tag"></v-icon> </template>{{ $t('highlightButton') }}
        </IconButton>
        <IconButton @click="addCharacter('@')">
          <template #icon>
            <v-icon name="pr-at"></v-icon> </template>{{ $t('estimationButton') }}
        </IconButton>
      </div>
      <div class="flex gap-1">
        <PrimaryButton
          class="hidden xl:block bg-[#EAF0F5] hover:bg-slate-200 active:bg-slate-300 text-gray-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500 dark:text-white"
          @click="cancel()">
          {{ $t('cancelButton') }}
        </PrimaryButton>
        <PrimaryButton class="hidden xl:block" @click="saveTaskToStore">
          {{
            isEmptyTask
              ? $t('confirmButtonEmpty')
              : isEditingTask
                ? $t('confirmSaveButton')
                : $t('confirmButton')
          }}
        </PrimaryButton>
        <PrimaryButton class="xl:hidden" @click="saveTaskToStore">
          <v-icon v-if="isEmptyTask" name="pr-times"></v-icon>
          <v-icon v-else-if="taskItem.id" name="pr-save" />
          <v-icon v-else name="pr-plus"></v-icon>
        </PrimaryButton>
      </div>
    </div>
  </div>
</template>