<script setup lang="ts">
import TaskItem from './TaskItem.vue'
import { useTasksStore } from '@/store/store'
import { storeToRefs } from 'pinia'
import type { Task } from '@/types/taskInterface'
import { ref, watch } from "vue";


const taskStore = useTasksStore()
const { tasks, getUncompletedTasks, getCompletedTasks } = storeToRefs(taskStore)

const selectedTasks = ref<Task[]>(tasks.value)
const selection = ref<'all' | 'done' | 'pending'>('all')

const updateSelectedTasks = (filter: 'all' | 'done' | 'pending') => {
  selectedTasks.value = []
  selection.value = filter
  setTimeout(() => {
    updateTasks()
  }, 300);

  const updateTasks = (): void => {
    switch (selection.value) {
      case 'all':
        selectedTasks.value = tasks.value
        break
      case 'done':
        selectedTasks.value = getCompletedTasks.value
        break
      case 'pending':
        selectedTasks.value = getUncompletedTasks.value
        break
    }
  }

  watch([tasks, getCompletedTasks, getUncompletedTasks], () => {
    updateTasks()
  })
}
</script>

<template>
  <TransitionGroup name="task-list" tag="ul" class="w-full">
    <TaskItem v-for="task in selectedTasks" :key="task.id" :task="task" />
  </TransitionGroup>
  <div
    class="fixed bottom-3 rounded h-10 w-2/3 max-w-72 bg-[#0D55CF] left-0 right-0 mr-auto ml-auto flex justify-evenly">
    <button data-testid="show-all-task-button" :class="{ 'bg-blue-800': selection === 'all' }"
      class="w-[32%] text-white transition-all duration-300 rounded my-1" @click="updateSelectedTasks('all')">{{
        $t('allTasks') }}</button>
    <button data-testid="show-pending-task-button" id="show-pending-tasks-button" :class="{ 'bg-blue-800': selection === 'pending' }"
      class="w-[32%] text-white transition-all duration-300 rounded my-1" @click="updateSelectedTasks('pending')">{{
        $t('pendingTasks') }}</button>
    <button data-testid="show-done-task-button" id="show-done-tasks-button" :class="{ 'bg-blue-800': selection === 'done' }"
      class="w-[32%] text-white transition-all duration-300 rounded my-1" @click="updateSelectedTasks('done')">{{
        $t('doneTasks') }}</button>
  </div>
</template>

<style>
.task-list-enter-active {
  transition: all 0.2s ease-out;
}

.task-list-leave-active {
  transition: all 0.2s ease-in;
}

.task-list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.task-list-leave-to {
  opacity: 0;
  margin-left: 30px;
}
</style>
