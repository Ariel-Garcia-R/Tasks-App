// Imports
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useStoredTasks } from '@/composables/useStoredTasks'
import { useFormatTask } from '@/composables/useFormatTask'
import { generateID } from '@/helpers/generateID'
import type { Task } from '@/types/taskInterface'

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
  const taskArray = ref<Task[]>(useStoredTasks())
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

  function setEditingTask(status: boolean) {
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
      formattedBody: useFormatTask(newTask.body),
      id: generateID()
    })
    localStorage.setItem('tasks', JSON.stringify(taskArray.value))
  }

  function updateTask(task: Task) {
    const taskIndex = taskArray.value.findIndex((task) => task.id === task.id)
    if (taskIndex !== -1) {
      taskArray.value[taskIndex] = {
        ...task,
        formattedBody: useFormatTask(task.body)
      }
      localStorage.setItem('tasks', JSON.stringify(taskArray.value))
      clearCurrentTask()
    } else {
      throw new Error('Update Task index not found')
    }
  }

  function deleteTask(taskID: string) {
    const deletedTaskIndex = taskArray.value.findIndex((task) => task.id === taskID)
    if (deletedTaskIndex !== -1) {
      taskArray.value.splice(deletedTaskIndex, 1)
      localStorage.setItem('tasks', JSON.stringify(taskArray.value))
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

      localStorage.setItem('tasks', JSON.stringify(taskArray.value))
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
        localStorage.setItem('tasks', JSON.stringify(taskArray.value))
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
    setEditingTask,
    setCurrentTask,
    clearCurrentTask,
    isEditingTask,
    getCurrentTask,
    updateTask,
    deleteTask,
    clearTasksStore
  }
})
