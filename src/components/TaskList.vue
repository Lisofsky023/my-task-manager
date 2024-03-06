<template>
  <div>
    <task-form @submit-task="handleTaskSubmit" />
    <div class="filters">
      <button @click="setFilter('all')">All</button>
      <button @click="setFilter('active')">Active</button>
      <button @click="setFilter('completed')">Completed</button>
    </div>
    <ul class="list">
      <li class="item" v-for="task in filteredTasks" :key="task.id">
        <input type="checkbox" v-model="task.isCompleted" @click="() => toggleTaskCompletion(task.id)">
        <span :class="{ completed: task.isCompleted }">{{ task.text }}</span>
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

    const setFilter = (status) => {
      filterStatus.value = status;
    };

    const filteredTasks = computed(() => {
      if (filterStatus.value === 'active') {
        return tasks.filter(task => !task.isCompleted);
      } else if (filterStatus.value === 'completed') {
        return tasks.filter(task => task.isCompleted);
      }
      return tasks;
    });

    const handleTaskSubmit = ({ text, id }) => {
      if (id !== null) {
        editTask(id, text);
      } else {
        addTask(text);
      }
      currentEditIndex.value = null;
    };

    const setCurrentEditIndex = (id) => {
      currentEditIndex.value = id;
    };

    return {
      filteredTasks,
      currentEditIndex,
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
</style>
