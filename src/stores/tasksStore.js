import { defineStore } from 'pinia';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    addTask(newTaskText) {
      this.tasks.push({ text: newTaskText, id: crypto.randomUUID() });
      this.$patch();
    },
    deleteTask(taskId) {
      const index = this.tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        this.$patch();
      }
    },
    editTask(taskId, newTaskText) {
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
        task.text = newTaskText;
        this.$patch();
      }
    }
  },
  persist: true
});
