<template>
  <div class="container">
    <div class="container-sun">
      <svg class="svg-sun" version="1.1" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet">
      <circle cx="50" cy="50" r="35" id="sun"></circle>
      </svg>
      </div>
    <task-add-form />
    <input v-model="searchQuery" placeholder="Search tasks" type="text" class="search-input" />
    <task-filters @set-category="setFilterCategory" @set-status="setFilter"></task-filters>
    <ul class="list">
      <task-item 
        v-for="task in filteredTasks" 
        :key="task.id"
        :task="task"
        :isEditing="currentEditIndex === task.id"
        @set-edit="setCurrentEditIndex"
        @delete-task="deleteTask"
        @toggle-completion="toggleTaskCompletion"
        @submit-edit="handleTaskSubmit"
      ></task-item>
    </ul>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import TaskAddForm from '@/components/TaskAddForm.vue';
import TaskFilters from '@/components/TaskFilters.vue';
import { useTasksStore } from '@/stores/tasksStore';
import TaskItem from '@/components/TaskItem.vue';

export default {
  components: {
    TaskAddForm,
    TaskFilters,
    TaskItem,
  },
  setup() {
    const { tasks, addTask, deleteTask, editTask, toggleTaskCompletion } = useTasksStore();
    const currentEditIndex = ref(null);
    const filterStatus = ref('all');
    const filterCategory = ref('All');
    const searchQuery = ref('');

    const setFilter = (status) => {
      filterStatus.value = status;
    };

    const setFilterCategory = (category) => {
      filterCategory.value = category;
    };

    const filteredTasks = computed(() => {
  return tasks.filter(task => {
    const statusCondition = filterStatus.value === 'all' ||
                            (filterStatus.value === 'active' && !task.isCompleted) ||
                            (filterStatus.value === 'completed' && task.isCompleted);
    const categoryCondition = filterCategory.value === 'All' || task.category === filterCategory.value;
    const matchesSearch = task.text && typeof task.text === 'string' && task.text.toLowerCase().includes(searchQuery.value.toLowerCase());
    return statusCondition && categoryCondition && matchesSearch;
    
  });
});

const handleTaskSubmit = ({ text, id, category, priority }) => {
      if (id !== null) {
        editTask(id, text, category, priority);
      } else {
        addTask(text, category, priority);
      }
      currentEditIndex.value = null;
    };

    const setCurrentEditIndex = (id) => {
      currentEditIndex.value = id;
    };

    return {
      filteredTasks,
      currentEditIndex,
      searchQuery,
      setFilterCategory,
      handleTaskSubmit,
      deleteTask,
      setCurrentEditIndex,
      toggleTaskCompletion,
      setFilter,
    };
  },
};
</script>

<style>

.container {
  position: relative;
}

.search-input {
  border-radius: 6px;
  box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.158);
  border: 1px solid #ddd;
  background-color: rgb(255, 255, 255);
  outline: none;
  width: 100%;
  height: 38px;
  color: rgba(0, 0, 0, 0.603);
  margin-bottom: 20px;
}

.filters button {
  margin-right: 5px;
}

.list {
  list-style-type: none;
}

.item {
}

.edit-button, .delete-button {
}

.completed {
  text-decoration: line-through;
  text-decoration-color: rgba(255, 0, 0, 0.979);
}

.priority {
  margin-left: 10px;
}
.Low {
  color: green;
}
.Medium {
  color: orange;
}
.High {
  color: red;
}

.Low, .Medium, .High {
  font-weight: bold;
}

.container-sun{
  text-align:center;
}

.svg-sun{
  width:300px;
  height:300px;
  position: absolute;
  top: -207px;
  left: -151px;
  z-index: -100;
  -webkit-transform-origin: center center;
  -moz-transform-origin: 50% 50%;
  -o-transform-origin: center center;
  -ms-transform-origin: center center;
  transform-origin:50% 50%;
  animation: spin 85s linear infinite,sun-glow 3s 0s linear infinite;
}

#sun{
  stroke-width:18;
  stroke-dasharray:2;
  stroke-dashoffset:2;
}

@-webkit-keyframes sun-glow { 
	0% { fill: #f1c40f8e; stroke:#f1c40f91;}
	50% { fill: #fffb008a; stroke:#fffb0080;}
	100% { fill: #f1c40f88; stroke:#f1c40f8e;}
}
@-moz-keyframes sun-glow { 
	0% { fill: #f1c40f; stroke:#f1c40f;}
	50% {  stroke:#fffb00;}
	100% { fill: #f1c40f; stroke:#f1c40f;}
}
@-o-keyframes sun-glow { 
	0% { fill: #f1c40f; stroke:#f1c40f;}
	50% { fill: #fffb00; stroke:#fffb00;}
	100% { fill: #f1c40f; stroke:#f1c40f;}
}
@-ms-keyframes sun-glow { 
	0% { fill: #f1c40f; stroke:#f1c40f;}
	50% { fill: #fffb00; stroke:#fffb00;}
	100% { fill: #f1c40f; stroke:#f1c40f;}
}
@keyframes sun-glow { 
	0% { fill: #f1c40f; stroke:#f1c40f;}
	50% { fill: #fffb00; stroke:#fffb00;}
	100% { fill: #f1c40f; stroke:#f1c40f;}
}

@-webkit-keyframes spin{
	100% {
		-webkit-transform: rotate(360deg);
	}
}
@-moz-keyframes spin{
	100% {
		-moz-transform: rotate(360deg);
	}
}
@-o-keyframes spin{
	100% {
		-o-transform: rotate(360deg);
	}
}
@-ms-keyframes spin{
	100% {
		-ms-transform: rotate(360deg);
	}
}
@keyframes spin{
	100% {
		transform: rotate(360deg);
	}
}




</style>
