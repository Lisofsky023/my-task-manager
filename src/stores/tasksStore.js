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
    editTask(taskId, newTaskText, newCategory, newPriority) {
      console.log(`Updating task ${taskId} with text ${newTaskText}, category ${newCategory}, and priority ${newPriority}`);      const index = this.tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
          this.tasks[index] = {
              ...this.tasks[index],
              text: newTaskText,
              category: newCategory,
              priority: newPriority
          };
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
