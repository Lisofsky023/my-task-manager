<template>
  <div>
    <task-form @submit-task="handleTaskSubmit" />
    <input v-model="searchQuery" placeholder="Search tasks" type="text" class="search-input" />
    <task-filters @set-category="setFilterCategory" @set-status="setFilter"></task-filters>
    <ul class="list">
      <task-item 
        v-for="task in filteredTasks" 
        :key="task.id"
        :task="task"
        :isEditing="currentEditIndex === task.id"
        @set-edit="setCurrentEditIndex"
        @delete-task="deleteTask"
        @toggle-completion="toggleTaskCompletion"
        @submit-edit="handleTaskSubmit"
      ></task-item>
    </ul>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import TaskForm from '@/components/TaskForm.vue';
import TaskFilters from '@/components/TaskFilters.vue';
import { useTasksStore } from '@/stores/tasksStore';
import TaskItem from '@/components/TaskItem.vue';

export default {
  components: {
    TaskForm,
    TaskFilters,
    TaskItem,
  },
  setup() {
    const { tasks, addTask, deleteTask, editTask, toggleTaskCompletion } = useTasksStore();
    const currentEditIndex = ref(null);
    const filterStatus = ref('all');
    const filterCategory = ref('All');
    const searchQuery = ref('');

    const setFilter = (status) => {
      filterStatus.value = status;
    };

    const setFilterCategory = (category) => {
      filterCategory.value = category;
    };

    const filteredTasks = computed(() => {
  return tasks.filter(task => {
    const statusCondition = filterStatus.value === 'all' ||
                            (filterStatus.value === 'active' && !task.isCompleted) ||
                            (filterStatus.value === 'completed' && task.isCompleted);
    const categoryCondition = filterCategory.value === 'All' || task.category === filterCategory.value;
    const matchesSearch = task.text && typeof task.text === 'string' && task.text.toLowerCase().includes(searchQuery.value.toLowerCase());
    return statusCondition && categoryCondition && matchesSearch;
  });
});

const handleTaskSubmit = ({ text, id, category, priority }) => {
      if (id !== null) {
        editTask(id, text, category, priority);
      } else {
        addTask(text, category, priority);
      }
      currentEditIndex.value = null;
    };

    const setCurrentEditIndex = (id) => {
      currentEditIndex.value = id;
    };

    return {
      filteredTasks,
      currentEditIndex,
      searchQuery,
      setFilterCategory,
      handleTaskSubmit,
      deleteTask,
      setCurrentEditIndex,
      toggleTaskCompletion,
      setFilter
    };
  },
};
</script>

<style>

.search-input {
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
}

.filters button {
  margin-right: 5px;
}

.list {
  list-style-type: none;
}

.item {
}

.edit-button, .delete-button {
}

.completed {
  text-decoration: line-through;
}

.priority {
  margin-left: 10px;
}
.Low {
  color: green;
}
.Medium {
  color: orange;
}
.High {
  color: red;
}

.Low, .Medium, .High {
  font-weight: bold;
}
</style>
