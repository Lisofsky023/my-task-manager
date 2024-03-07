<template>
  <div class="search-container">
    <input
      v-model="localQuery"
      @input="updateSearchQuery"
      placeholder="Search tasks"
      type="text"
      class="search-input"
    />
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  emits: ['update:query'],
  setup(props, { emit }) {
    const localQuery = ref('');

    const updateSearchQuery = () => {
      emit('update:query', localQuery.value);
    };

    return {
      localQuery,
      updateSearchQuery,
    };
  },
};
</script>

<style scoped>
.search-container {
  margin-bottom: 10px;
}

.search-input {
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
}
</style>
