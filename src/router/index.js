import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/test',
    component: { template: '<h1>Test Page</h1>' } // Une page simple pour tester le routage
  }
];


export default router;
