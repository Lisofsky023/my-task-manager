<template>
  <div class="container-edit-form">
    <div class="container-select">
      <select class="select-category-edit" v-model="taskCategory">
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Other">Other</option>
      </select>
      <select v-model="taskPriority">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
    <input class="edit-input" v-model="taskText" placeholder="Add new task" />
    <button class="submit-edit-form" @click="submitTask">Submit</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref, watch, watchEffect, toRefs } from 'vue';

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

    watchEffect(() => {
      taskText.value = initialTask.value;
      taskId.value = initialTaskId.value;
    });

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
      console.log(`Emitting task update with category ${taskCategory.value}`)
      emit('submit-task', {
        id: taskId.value, 
        text: taskText.value, 
        category: taskCategory.value, 
        priority: taskPriority.value,
       });
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

<style>
.container-edit-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 20px;
}

.select-category-edit {
  margin-bottom: 18px;
  margin-right: 18px;
}

.edit-input {
  border-radius: 6px;
  box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.158);
  border: 1px solid #ddd;
  background-color: rgb(255, 255, 255);
  outline: none;
  width: 90%;
  height: 88px;
  color: rgba(0, 0, 0, 0.603);
  margin-bottom: 20px;
  font-size: 23px;
}

.submit-edit-form {
  border-width: 2px;
  align-items: center;
  background-color: #FCFCFD;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395A;
  cursor: pointer;
  font-family: "JetBrains Mono",monospace;
  height: 34px;
  line-height: 1;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  transition: box-shadow .15s,transform .15s;
  font-size: 18px;
}

.submit-edit-form:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}

.submit-edit-form:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}
</style>