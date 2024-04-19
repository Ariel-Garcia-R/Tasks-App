<script setup lang="ts">
import type { Task } from "@/types/taskInterface";
import { useTasksStore } from "@/store/store";
import { storeToRefs } from 'pinia';
// import { useI18n } from 'vue-i18n'
import { ref, computed, watch } from "vue";
import IconButton from '@/components/common/IconButton.vue'
import Button from "@/components/common/Button.vue";


// const { t } = useI18n()
// const snackbar = useSnackbar();
const taskStore = useTasksStore();
const { addTask, setCreatingTask, setIsEditingTask, updateTask, setCurrentTask, clearTasksStore } = taskStore;
const { isEditingTask, getCurrentTask } = storeToRefs(taskStore);

const maxChars = 280
const defaultTaskItem: Task = {
  id: '',
  title: '',
  body: '',
  formattedBody: '',
  isCompleted: false
};
const textarea = ref<HTMLTextAreaElement>()
const isTaskBoxOpen = ref(false);
const taskItem = ref<Task>({ ...defaultTaskItem });
const creatingNewTask = computed(() => taskItem.value.body != '' && isTaskBoxOpen.value && !taskItem.value.id);
const isEmptyTask = computed(() => taskItem.value.body === '');

const toggleTaskBox = (): void => {
  isTaskBoxOpen.value = !isTaskBoxOpen.value;
 
  setTimeout(() => {
    textarea.value?.focus();
 }, 0);
};

watch(creatingNewTask, (): void => {
  setCreatingTask(creatingNewTask.value);
});

watch(isEditingTask, (): void => {
  if (isEmptyTask.value) {
    taskItem.value = getCurrentTask.value;
    isTaskBoxOpen.value = true
  }
});

const clearTaskEditor = (): void => {
  taskItem.value = { ...defaultTaskItem };
};

const saveTaskToStore = (): void => {
  if (isEmptyTask.value) {
    toggleTaskBox();
  } else if (taskItem.value.id) {
    updateTask({ ...taskItem.value });
    setIsEditingTask(false);
    clearTaskEditor();
  } else {
    addTask(taskItem.value);
    setCreatingTask(false);
    clearTaskEditor();
  }
};

const cancel = (): void => {
  setCreatingTask(false);
  setIsEditingTask(false);
  isTaskBoxOpen.value = false
  setCurrentTask({ ...defaultTaskItem });
  taskItem.value = { ...defaultTaskItem }
}

const handleTextInput = (event: Event): void => {
  const textarea = event.target as HTMLTextAreaElement
  if (textarea.value.length <= maxChars) {
    taskItem.value.body = textarea.value
  } else {
    taskItem.value.body = textarea.value = textarea.value.substring(0, maxChars)
  }
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(taskItem.value.body);
    // snackbar.add({
    //   title: 'Copied ✍️',
    //   text: t('copiedSuccess')
    // })
  } catch (err) {
    console.error('Error al copiar al portapapeles: ', err);
  }
}

const addCharacter = (character: string) => {
  if (textarea.value) {
    const start = textarea.value.selectionStart;
    const end = textarea.value.selectionEnd;
    const textBefore = textarea.value.value.substring(0, start);
    const textAfter = textarea.value.value.substring(end, textarea.value.value.length);
    taskItem.value.body = textBefore + character + textAfter;
    const newPosition = start + 1;
    textarea.value.focus();
    setTimeout(() => {
      if (textarea.value) {
        textarea.value.setSelectionRange(newPosition, newPosition);
      }
    }, 1);}
}

</script>

<template>
  <div 
    v-if="!isTaskBoxOpen"
    class="flex"
  >
    <button
      class="text-[#8A94A6] flex gap-4 items-center my-5"
      @click="toggleTaskBox"
    >
      <v-icon name="pr-plus-circle" fill="red"></v-icon>
      <span>{{ $t('taskPlaceholder') }}</span>
    </button>
    <button 
    class="ml-auto my-5 text-red-500 p-1 px-3 rounded border border-transparent hover:border-red-500 active:bg-red-500 active:text-white transition-colors duration-150"
    @click="clearTasksStore"
    >
    <span class="hidden xl:inline">{{ $t('clearTasksStore') }}</span>
    <span class="xl:hidden">
        <v-icon name="bi-trash3"></v-icon>
    </span>
</button>
</div>

<div
v-else
class="flex-col w-full rounded-t border border-[#F1F3F4] dark:border-gray-800 my-5"
>
<div class="h-24 xl:h-16 w-full max-w-[1360px] flex">
    <div class="mx-3 my-2">
        <v-icon name="pr-plus-circle" fill="blue"></v-icon>
      </div>
      <textarea
        id="task-editor"
        ref="textarea"
        :value="taskItem.body"
        name="task-editor"
        class="resize-none w-full dark:bg-gray-900 text-gray-500 pt-[5px] overflow-y-auto outline-none caret-blue-500 placeholder:text-slate-500"
        :placeholder="$t('taskPlaceholder')"
        @keyup="handleTextInput"
        @keydown.ctrl.enter="saveTaskToStore"
      />
      <div
        class="w-24 relative"
        :class="{ 'opacity-50': isEmptyTask }"
      >
        <span class="text-[.8rem] absolute bottom-2 right-2">{{ taskItem.body.length }}/{{ maxChars }}</span>
      </div>
    </div>
    <div class="flex justify-between bg-[#FAFBFB] dark:bg-slate-800 h-14 items-center px-2">
      <div class="flex gap-[5px] xl:gap-1">
        <IconButton
          :disabled="isEmptyTask"
          @click="copyToClipboard"
        >
          <template #icon>
            <v-icon name="pr-copy"></v-icon>
        </template>{{ $t('publicButton') }}
    </IconButton>
    <IconButton @click="addCharacter('#')">
        <template #icon>
              <v-icon name="pr-tag"></v-icon>
          </template>{{ $t('highlightButton') }}
        </IconButton>
        <IconButton @click="addCharacter('@')">
          <template #icon>
            <v-icon name="pr-at"></v-icon>
          </template>{{ $t('estimationButton') }}
        </IconButton>
      </div>
      <div class="flex gap-1">
        <Button
          class="bg-[#EAF0F5] hover:bg-slate-200 active:bg-slate-300 text-gray-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500 dark:text-white"
          @click="cancel()"
        >
          {{ $t('cancelButton') }}
        </Button>
        <Button
          class="hidden xl:block"
          @click="saveTaskToStore"
        >
          {{ isEmptyTask ?
            $t('confirmButtonEmpty') :
            (isEditingTask ? $t('confirmSaveButton') : $t('confirmButton')) }}
        </Button>
        <Button
          class="xl:hidden"
          @click="saveTaskToStore"
        >
<v-icon v-if="isEmptyTask" name="pr-times"></v-icon>
          <v-icon
            v-else-if="taskItem.id"
            name="pr-save"
          />
          <v-icon v-else name="pr-plus" ></v-icon>
        </Button>
      </div>
    </div>
  </div>
</template>