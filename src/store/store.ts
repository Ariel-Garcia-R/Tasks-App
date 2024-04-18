import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { TaskInterface } from '@/types/taskInterface'

export const useTasksStore = defineStore('tasks', () => {
  const taskArray = ref<TaskInterface[]>([])

  const tasks = computed(() => taskArray.value)

  function increment() {
    taskArray.value.push({
      id: '1',
      title: 'title',
      body: 'body',
      formattedBody: 'formattedBody',
      isCompleted: false
    })
  }

  return { tasks, increment }
})
