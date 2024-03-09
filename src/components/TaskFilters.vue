<template>
  <div class="filters">
    <div class="category-filters">
      <button 
        class="category-btn" 
        :class="{ active: selectedCategory === 'All' }"
        @click="setCategory('All')">
        All
      </button>
      <button 
        class="category-btn" 
        :class="{ active: selectedCategory === 'Personal' }"
        @click="setCategory('Personal')">
        Personal
      </button>
      <button 
        class="category-btn" 
        :class="{ active: selectedCategory === 'Work' }"
        @click="setCategory('Work')">
        Work
      </button>
      <button 
        class="category-btn" 
        :class="{ active: selectedCategory === 'Other' }"
        @click="setCategory('Other')">
        Other
      </button>
    </div>

    <div class="status-filters">
      <button 
        class="status-btn" 
        :class="{ active: selectedStatus === 'All' }"
        @click="setStatus('All')">
        All
      </button>
      <button 
        class="status-btn" 
        :class="{ active: selectedStatus === 'active' }"
        @click="setStatus('active')">
        Active
      </button>
      <button 
        class="status-btn" 
        :class="{ active: selectedStatus === 'completed' }"
        @click="setStatus('completed')">
        Completed
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskFilters",
  data() {
    return {
      selectedCategory: 'All',
      selectedStatus: 'All',
    };
  },
  methods: {
  setCategory(category) {
    this.selectedCategory = category;
    this.$emit('set-category', category);
  },
  setStatus(status) {
    this.selectedStatus = status;
    this.$emit('set-status', status);
  }
}
};
</script>

<style scoped>

.category-filters {
  margin-bottom: 20px;
  display: flex;
}

.status-filters {
  display: flex;
}

.status-btn, .category-btn {
  background: transparent;
  border: none;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.521);
  cursor: pointer;

  
}

.category-btn {

}

.status-btn.active, .category-btn.active {
  color: #f5f5f5;
  font-weight: bold;
  background-color: rgba(110, 78, 40, 0.616);
  border-radius: 2px;
}

.filters {
  margin-bottom: 20px;
}

</style>
