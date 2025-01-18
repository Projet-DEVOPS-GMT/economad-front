import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import Home from '../views/Home.vue';
import RegisterPage from '../views/RegisterPage.vue';
import Historique from '../views/Historique.vue';
import EnregistrerConsommation from '../views/EnregistrerConsommation.vue';
import Recherche from '../views/Recherche.vue';
import Hebergement from '../views/Hebergement.vue';  // Import de la page Hebergement

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/historique', name: 'Historique', component: Historique },
  { path: '/enregistrer-consommation', name: 'EnregistrerConsommation', component: EnregistrerConsommation },
  { path: '/recherche', name: 'Recherche', component: Recherche },
  { path: '/hebergement', name: 'Hebergement', component: Hebergement }  // Nouvelle route pour la page d'hébergement
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
