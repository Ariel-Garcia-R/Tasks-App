<script setup lang="ts">
import TaskEditor from './TaskEditor.vue';
import TaskList from './TaskList.vue';
import TopBar from './layout/TopBar.vue';
</script>

<template>
    <TopBar />
    <TaskList />
    <TaskEditor />
</template>
