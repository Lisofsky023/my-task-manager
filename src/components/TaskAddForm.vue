<template>
  <div class="task-add-form">
    <select v-model="newTaskCategory">
      <option value="Personal">Personal</option>
      <option value="Work">Work</option>
      <option value="Other">Other</option>
    </select>
    <select v-model="newTaskPriority">
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
    <input v-model="newTaskText" placeholder="Add new task" />
    <button @click="addNewTask">Add</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useTasksStore } from '@/stores/tasksStore';


export default {
  setup(_, { emit }) {
    const tasksStore = useTasksStore();
    const newTaskText = ref('');
    const newTaskCategory = ref('Personal');
    const newTaskPriority = ref('Low');

    const addNewTask = () => {
      if (newTaskText.value.trim()) {
        tasksStore.addTask(newTaskText.value, newTaskCategory.value, newTaskPriority.value);
        newTaskText.value = '';
        newTaskCategory.value = 'Personal';
        newTaskPriority.value = 'Low';
        emit('task-added');
      }
    };

    return {
      newTaskText,
      newTaskCategory,
      newTaskPriority,
      addNewTask
    };
  }
};
</script>
