<template>
  <div>
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
    type: Number,
    default: null
  }
  },
  setup(props, { emit }) {
    const { initialTask, initialTaskId } = toRefs(props);
    const taskText = ref(initialTask.value || '');
    const taskId = ref(initialTaskId.value || null);
    const error = ref('');

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
      emit('submit-task', { text: taskText.value, id: taskId.value });
      taskText.value = '';
      taskId.value = null;
    };

    return {
      taskText,
      taskId,
      error,
      submitTask
    };
  },
};
</script>
