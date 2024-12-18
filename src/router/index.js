import { createRouter, createWebHistory } from 'vue-router';
import SomeComponent from '../views/SomeComponent.vue';

const routes = [
  {
    path: '/',
    name: 'SomeComponent',
    component: SomeComponent,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
