<script setup lang="ts">
import TaskItem from './TaskItem.vue'
import { useTasksStore } from '@/store/store'
import { storeToRefs } from 'pinia'
import type { Task } from '@/types/taskInterface'
import { ref } from "vue";

const taskStore = useTasksStore()
const { tasks, getUncompletedTasks, getCompletedTasks } = storeToRefs(taskStore)
// const typedTasks = tasks as unknown as Task[]

// Crea una variable reactiva para almacenar el arreglo de tareas seleccionado
const selectedTasks = ref<Task[]>(tasks.value)
const selection = ref<'all' | 'done' | 'pending'>('all')
// Función para actualizar selectedTasks basado en la decisión del usuario
const updateSelectedTasks = (filter: 'all' | 'done' | 'pending') => {
 switch (filter) {
    case 'all':
      selection.value = 'all'
      selectedTasks.value = tasks.value
      break
    case 'done':
      selection.value = 'done'
      selectedTasks.value = getCompletedTasks.value
      break
    case 'pending':
      selection.value = 'pending'
      selectedTasks.value = getUncompletedTasks.value
      break
 }
}
</script>

<template>
 <TransitionGroup name="task-list" tag="ul" class="w-full">
    <TaskItem v-for="task in selectedTasks" :key="task.id" :task="task" />
 </TransitionGroup>
 <div class="fixed bottom-2 rounded h-10 w-48 bg-[#0D55CF] left-0 right-0 mr-auto ml-auto flex justify-evenly">
    <button :class="{'bg-blue-800': selection === 'all'}" class="transition-all duration-300 rounded my-1 px-2" @click="updateSelectedTasks('all')" >All</button>
    <button :class="{'bg-blue-800': selection === 'pending'}" class="transition-all duration-300 rounded my-1 px-2" @click="updateSelectedTasks('pending')" >Pending</button>
    <button :class="{'bg-blue-800': selection === 'done'}" class="transition-all duration-300 rounded my-1 px-2" @click="updateSelectedTasks('done')" >Done</button>
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
