<script setup lang="ts">
import TaskEditor from './TaskEditor.vue';
import TaskList from './TaskList.vue';
import TopBar from './layout/TopBar.vue';
</script>

<template>
    <TopBar class="sticky w-full" />
    <div class="p-3 max-w-[1360px] mx-auto">
        <TaskEditor class="z-50" />
        <TaskList />
    </div>
</template>
