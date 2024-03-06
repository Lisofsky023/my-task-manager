<template>
  <div>
    <task-form @submit-task="handleTaskSubmit" />
    <ul class="list">
      <li class="item" v-for="task in tasks" :key="task.id">
        {{ task.text }}
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
import { ref } from 'vue';
import TaskForm from '@/components/TaskForm.vue';
import { useTasksStore } from '@/stores/tasksStore';

export default {
  components: {
    TaskForm,
  },
  setup() {
    const { tasks, addTask, deleteTask, editTask } = useTasksStore();
    const currentEditIndex = ref(null);

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
      tasks,
      currentEditIndex,
      handleTaskSubmit,
      deleteTask,
      setCurrentEditIndex
    };
  },
};
</script>

<style>

.list {
  list-style-type: none;
}

.item {

}

.edit-button {

}

</style>