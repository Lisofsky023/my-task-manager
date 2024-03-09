<template>
  <div class="wrapper">
    <h1>Tasks</h1>
    <task-list></task-list>
  </div>
</template>

<script>
import TaskList from '@/components/TaskList.vue';

export default {
  components: {
    TaskList
  }
};
</script>

<style>
 .wrapper {
  max-width: 600px;
  margin: 0 auto;
 }


</style>
