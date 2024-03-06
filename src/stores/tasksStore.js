import { defineStore } from 'pinia';

export const useTasksStore = defineStore('tasks', {
  persist: true,
  state: () => ({
    tasks: [],
  }),
  actions: {
    addTask(newTaskText, category, priority) {
      console.log(`Adding task with priority: ${priority}`);
      this.tasks.push({ 
        text: newTaskText, 
        id: crypto.randomUUID(), 
        isCompleted: false,
        category: category || 'General',
        priority: priority,
      });
    },
    deleteTask(taskId) {
      const index = this.tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    },
    editTask(taskId, newTaskText) {
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
        task.text = newTaskText;
      }
    },
    toggleTaskCompletion(taskId) {
      const index = this.tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        this.tasks[index].isCompleted = !this.tasks[index].isCompleted;
      }
    },
  },
});
