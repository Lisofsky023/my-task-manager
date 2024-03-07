<template>
  <li class="item">
    <input type="checkbox" :checked="task.isCompleted" @change="$emit('toggle-completion', task.id)">
    <span :class="{ completed: task.isCompleted }">{{ task.text }}</span>
    <span class="priority" :class="task.priority">{{ task.priority }}</span>
    <span class="category">{{ task.category }}</span>
    <button class="edit-button" @click="$emit('set-edit', task.id)">Edit</button>
    <button class="delete-button" @click="$emit('delete-task', task.id)">Delete</button>
    <div v-show="isEditing">
      <task-form :initialTask="task.text" :initialTaskId="task.id" @submit-task="$emit('submit-edit', $event)" />
    </div>
  </li>
</template>

<script>
import TaskForm from '@/components/TaskForm.vue';

export default {
  components: {
    TaskForm,
  },
  props: ['task', 'isEditing'],
  emits: ['set-edit', 'delete-task', 'toggle-completion', 'submit-edit']
};
</script>
