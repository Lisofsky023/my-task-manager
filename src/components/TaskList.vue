<template>
  <div>
    <task-form @submit-task="handleTaskSubmit" />
    <div class="category-filters">
      <button @click="setFilterCategory('All')">All</button>
      <button @click="setFilterCategory('Personal')">Personal</button>
      <button @click="setFilterCategory('Work')">Work</button>
      <button @click="setFilterCategory('Other')">Other</button>
    </div>
    <div class="filters">
      <button @click="setFilter('all')">All</button>
      <button @click="setFilter('active')">Active</button>
      <button @click="setFilter('completed')">Completed</button>
    </div>
    <ul class="list">
      <li class="item" v-for="task in filteredTasks" :key="task.id">
        
        <input type="checkbox" v-model="task.isCompleted" @click="() => toggleTaskCompletion(task.id)">

        <span :class="{ completed: task.isCompleted }">{{ task.text }}</span>
        <span class="priority" :class="task.priority">{{ task.priority }}</span>
        <span class="category">{{ task.category }}</span>
        
        
        <button class="edit-button" @click="() => setCurrentEditIndex(task.id)">Edit</button>
        <button class="delete-button" @click="() => deleteTask(task.id)">Delete</button>
        <div v-show="currentEditIndex === task.id">
          <task-form :initialTask="task.text" :initialTaskId="task.id" @submit-task="handleTaskSubmit" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import TaskForm from '@/components/TaskForm.vue';
import { useTasksStore } from '@/stores/tasksStore';

export default {
  components: {
    TaskForm,
  },
  setup() {
    const { tasks, addTask, deleteTask, editTask, toggleTaskCompletion } = useTasksStore();
    const currentEditIndex = ref(null);
    const filterStatus = ref('all');
    const filterCategory = ref('All');

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
    return statusCondition && categoryCondition;
  });
});

    const handleTaskSubmit = ({ text, id, category, priority }) => {
      if (id !== null) {
        editTask(id, text);
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
