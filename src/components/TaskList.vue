<script setup lang="ts">
import TaskItem from './TaskItem.vue';
import { useTasksStore } from '@/store/store';
import { storeToRefs } from 'pinia'
import type { Task } from "@/types/taskInterface";

const taskStore = useTasksStore();
const { tasks } = storeToRefs(taskStore);
const typedTasks = tasks as unknown as Task[];
</script>

<template>
    <TransitionGroup name="task-list" tag="ul" class="w-full">
        <TaskItem v-for="task in typedTasks" :key="task.id" :task="task" />
    </TransitionGroup>
</template>

<style>
.task-list-enter-active {
    transition: all .2s ease-out;
}

.task-list-leave-active {
    transition: all .2s ease-in
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