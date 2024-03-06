<template>
  <div>
    <select v-model="taskCategory">
      <option value="Personal">Personal</option>
      <option value="Work">Work</option>
      <option value="Other">Other</option>
    </select>
    <select v-model="taskPriority">
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
    <input v-model="taskText" placeholder="Add new task" />
    <button @click="submitTask">Submit</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref, watch, toRefs } from 'vue';

export default {
  props: {
    initialTask: {
    type: String,
    default: ''
  },
  initialTaskId: {
    type: [Number, String],
    default: null
  }
  },
  setup(props, { emit }) {
    const { initialTask, initialTaskId } = toRefs(props);
    const taskText = ref(initialTask.value || '');
    const taskId = ref(initialTaskId.value || null);
    const error = ref('');
    const taskCategory = ref('Personal');
    const taskPriority = ref('Low');

    watch(initialTask, (newVal) => {
      taskText.value = newVal || '';
    });

    watch(initialTaskId, (newVal) => {
      taskId.value = newVal || null;
    });

    const submitTask = () => {
      if (!taskText.value.trim()) {
        error.value = 'Please enter a task.';
        return;
      }
      error.value = '';
      emit('submit-task', { 
        text: taskText.value, 
        id: taskId.value, 
        category: taskCategory.value, 
        priority: taskPriority.value,
       });
      taskText.value = '';
      taskId.value = null;
      taskCategory.value = 'Personal';
      taskPriority.value = 'Low';
    };

    return {
      taskCategory,
      taskPriority,
      taskText,
      taskId,
      error,
      submitTask
    };
  },
};
</script>
