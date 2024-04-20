// Imports
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useStoredTasks } from '@/composables/useStoredTasks'
import { formatTask } from '@/helpers/formatTask'
import { generateID } from '@/helpers/generateID'
import type { Task } from '@/types/taskInterface'

const { getTasksFromStorage, saveTasksToStorage } = useStoredTasks()
const defaultEmptyTask = {
  id: '',
  title: '',
  body: '',
  formattedBody: '',
  isCompleted: false
}

export const useTasksStore = defineStore('tasks', () => {
  // State
  const editingTask = ref(false)
  const creatingTask = ref(false)
  const tasks = computed(() => taskArray.value)
  const taskArray = ref<Task[]>(getTasksFromStorage())
  const currentTask = ref<Task>({ ...defaultEmptyTask })

  // Getters
  const getCurrentTask = computed(() => currentTask.value)
  const isCreatingTask = computed(() => creatingTask.value)
  const isEditingTask = computed(() => editingTask.value)
  const tasksNumber = computed(() => taskArray.value.length)
  const getCompletedTasks = computed(() =>
    taskArray.value.filter((task) => task.isCompleted === true)
  )
  const getUncompletedTasks = computed(() =>
    taskArray.value.filter((task) => task.isCompleted === false)
  )

  // Setters
  function setCreatingTask(status: boolean) {
    creatingTask.value = status
  }

  function setIsEditingTask(status: boolean) {
    editingTask.value = status
  }

  function setCurrentTask(task: Task) {
    currentTask.value = task
  }

  function clearCurrentTask() {
    currentTask.value = { ...defaultEmptyTask }
  }

  function addTask(newTask: Task) {
    taskArray.value.push({
      ...newTask,
      formattedBody: formatTask(newTask.body),
      id: generateID()
    })
    saveTasksToStorage(taskArray.value)
  }

  function updateTask(updatedTask: Task) {
    const taskIndex = taskArray.value.findIndex((task) => task.id === updatedTask.id)
    if (taskIndex !== -1) {
      taskArray.value[taskIndex] = {
        ...updatedTask,
        formattedBody: formatTask(updatedTask.body)
      }
      saveTasksToStorage(taskArray.value)
      clearCurrentTask()
    } else {
      throw new Error('Update Task index not found')
    }
  }

  function deleteTask(taskID: string) {
    const deletedTaskIndex = taskArray.value.findIndex((task) => task.id === taskID)
    if (deletedTaskIndex !== -1) {
      taskArray.value.splice(deletedTaskIndex, 1)
      saveTasksToStorage(taskArray.value)
    } else {
      throw new Error('Task index not found')
    }
  }

  function completeTask(taskID: string, isCompleted: boolean) {
    const taskIndex = taskArray.value.findIndex((task) => task.id === taskID)
    if (taskIndex !== -1) {
      taskArray.value[taskIndex].isCompleted = isCompleted

      if (isCompleted) {
        const completedTask = taskArray.value[taskIndex]
        taskArray.value.splice(taskIndex, 1)
        taskArray.value.push(completedTask)
      } else {
        const uncompletedTask = taskArray.value[taskIndex]
        taskArray.value.splice(taskIndex, 1)
        taskArray.value.unshift(uncompletedTask)
      }

      saveTasksToStorage(taskArray.value)
    } else {
      throw new Error('Task not found')
    }
  }

  function clearTasksStore(): void {
    function removeTask() {
      if (taskArray.value.length > 0) {
        setTimeout(() => {
          taskArray.value.pop()
          removeTask()
        }, 30)
      } else {
        saveTasksToStorage(taskArray.value)
      }
    }
    removeTask()
  }

  return {
    tasks,
    tasksNumber,
    addTask,
    isCreatingTask,
    completeTask,
    getCompletedTasks,
    getUncompletedTasks,
    setCreatingTask,
    setIsEditingTask,
    setCurrentTask,
    clearCurrentTask,
    isEditingTask,
    getCurrentTask,
    updateTask,
    deleteTask,
    clearTasksStore
  }
})
