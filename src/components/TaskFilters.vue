<template>
  <div>
    <div class="category-filters">
      <button @click="$emit('set-category', 'All')">All</button>
      <button @click="$emit('set-category', 'Personal')">Personal</button>
      <button @click="$emit('set-category', 'Work')">Work</button>
      <button @click="$emit('set-category', 'Other')">Other</button>
    </div>
    <div class="status-filters">
      <button @click="$emit('set-status', 'all')">All</button>
      <button @click="$emit('set-status', 'active')">Active</button>
      <button @click="$emit('set-status', 'completed')">Completed</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskFilters"
};
</script>

<style scoped>

.filters button {
  margin-right: 5px;
}
</style>
