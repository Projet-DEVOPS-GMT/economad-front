import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import Home from '../views/Home.vue';
import RegisterPage from '../views/RegisterPage.vue'; // Importer la nouvelle page d'inscription
import Comparateur from '../views/Comparateur.vue'; // Vue du comparateur
import Historique from '../views/Historique.vue'; // Vue de l'historique

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,  
  },
  {
    path: '/comparateur',
    name: 'Comparateur',
    component: Comparateur,
  },
  {
    path: '/historique',
    name: 'Historique',
    component: () => import('@/views/Historique.vue'),
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
