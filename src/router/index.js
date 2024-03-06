import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage.vue';
import Tasks from '@/views/TasksPage.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/tasks', name: 'Tasks', component: Tasks }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
