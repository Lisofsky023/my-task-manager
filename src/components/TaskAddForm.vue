<template>
  <div class="task-add-form">
    <div class="select-form">
      <select class="select-category" v-model="newTaskCategory">
        <option class="category" value="Personal">Personal</option>
        <option class="category" value="Work">Work</option>
        <option class="category" value="Other">Other</option>
      </select>
      <select class="select-priority" v-model="newTaskPriority">
        <option class="priority" value="Low">Low</option>
        <option class="priority" value="Medium">Medium</option>
        <option class="priority" value="High">High</option>
      </select>
    </div>
    <input
      class="input-add-task"
      v-model="newTaskText"
      placeholder="Add new task"
    />
    <div class="btn-container">
      <button class="button-add cross" @click="addNewTask">+</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useTasksStore } from "@/stores/tasksStore";

export default {
  setup(_, { emit }) {
    const tasksStore = useTasksStore();
    const newTaskText = ref("");
    const newTaskCategory = ref("Personal");
    const newTaskPriority = ref("Low");

    const addNewTask = () => {
      if (newTaskText.value.trim()) {
        tasksStore.addTask(
          newTaskText.value,
          newTaskCategory.value,
          newTaskPriority.value
        );
        newTaskText.value = "";
        newTaskCategory.value = "Personal";
        newTaskPriority.value = "Low";
        emit("task-added");
      }
    };

    return {
      newTaskText,
      newTaskCategory,
      newTaskPriority,
      addNewTask,
    };
  },
};
</script>
<style>

.task-add-form {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.select-category {
  margin-bottom: 6px;
}

.select-form {
  display: flex;
  flex-direction: column;
}

.button-add, select, .input-add-task {
  border-radius: 6px;
  box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.158);
  border: 1px solid #ddd;
  background-color: rgb(255, 255, 255);
  outline: none;
  color: rgba(0, 0, 0, 0.603);
}

.button-add {
  width: 90px;
  font-size: 30px;
  cursor: pointer;
  color: rgb(217, 221, 224);
  background-color: #055e0891;
  height: 100%;
  border: none;
  box-shadow: 0 2px 4px #055e088f;
  cursor: pointer;
  transition: 0.3s;
}

.button-add:hover {
  background-color: #45a049cc;
}

.button-add:active {
  box-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
  transform: translateY(1px);
}

select {
  width: 118px;
  height: 38px;
  outline: none;
  border: none;
  cursor: pointer;
}

.input-add-task {
  border: none;
  height: 80px;
  font-size: 28px;
}

</style>
