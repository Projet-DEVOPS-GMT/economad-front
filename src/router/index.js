import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import Home from '../views/Home.vue';
import RegisterPage from '../views/RegisterPage.vue'; // Importer la page d'inscription
import Comparaison from '../views/Comparaison.vue'; // Vue du comparateur
import Historique from '../views/Historique.vue'; // Vue de l'historique
import Recherche from '../views/Recherche.vue'; // Importer Recherche 

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
    path: '/comparaison',
    name: 'Comparaison',
    component: Comparaison,
  },
  {
    path: '/historique',
    name: 'Historique',
    component: Historique,
  },
  {
    path: '/recherche',
    name: 'Recherche',
    component: Recherche,  // Assurez-vous que ce fichier est bien utilisé
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
