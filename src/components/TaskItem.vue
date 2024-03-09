<template>
  <li class="item">
    <div class="container-description">
      <span class="priority" :class="task.priority">{{ task.priority }}</span>
      <span class="category">{{ task.category }}</span>
    </div>
    <div class="container-task">
      <input class="checkbox" type="checkbox" :checked="task.isCompleted" @change="$emit('toggle-completion', task.id)">
      <p class="task-text" :class="{ completed: task.isCompleted }">{{ task.text }}</p>
    </div>
    <div class="container-btn">
      <button class="edit-button" @click="$emit('set-edit', task.id)">Edit</button>
      <button class="delete-button" @click="$emit('delete-task', task.id)">Delete</button>
    </div>
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

<style>
ul {
  margin: 0;
  padding: 0;
}

.checkbox {
  margin-right: 10px;
}

span {

}

.item {
	width: 100%; 
  height: 120px;
  box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
  min-height: 120px;
  height: auto;
	background: #f2f9fe;
	background: linear-gradient(top, #f2f9fe 5%, #d6f0fd 100%);
	border-radius: 100px;
	position: relative;
	margin: 120px auto 20px;
}

.item:after, .item:before {
	content: '';
	position: absolute;
	background: #f2f9fe;
	z-index: -1
}

.item:after {
  width: 168px;
  height: 100px;
  top: -50px;
  left: 149px;
	border-radius: 100px;
	-webkit-border-radius: 100px;
	-moz-border-radius: 100px;
}

.item:before {
  width: 216px;
  height: 180px;
  top: -91px;
  right: 118px;
	border-radius: 200px;
	-webkit-border-radius: 200px;
	-moz-border-radius: 200px;
}

.container-description {
  margin-bottom: 10px;
}

.priority {
  margin-bottom: 10px;
  margin-right: 30px;
}

.container-task {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.edit-button {
  margin-right: 10px;
}

.edit-button, .delete-button {
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

.edit-button:active, .delete-button:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}

.edit-button:focus, .delete-button:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}



.container-btn {
  padding-bottom: 20px;
}

.task-text {
  font-size: 23px;
  overflow: hidden;
  white-space: pre-wrap;
  padding: 8px;
  line-height: 1.4;
}




</style>
