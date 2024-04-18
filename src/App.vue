<script setup lang="ts">
import { useTasksStore } from '@/store/store';
import { storeToRefs } from "pinia";
const tasksStore = useTasksStore()
const { increment } = tasksStore
const { tasks } = storeToRefs(tasksStore)
</script>

<template>
  <h1>Home view</h1>
  <span>{{ tasks }}</span>
  <button @click="increment">+1</button>
</template>
