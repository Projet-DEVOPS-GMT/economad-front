import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import Home from '../views/Home.vue';
import RegisterPage from '../views/RegisterPage.vue';
import Historique from '../views/Historique.vue'; // Vue de l'historique
import EnregistrerConsommation from '../views/EnregistrerConsommation.vue'; // Vue pour l'enregistrement de la consommation
import Recherche from '../views/Recherche.vue'; // Import de la vue Recherche
import Profile from '../views/Profil.vue'; // Vue du profil utilisateur
import FaireScore from '../views/FaireScore.vue'; // Vue pour le Faire Score
import EcoAction from '../views/EcoAction.vue'; // Import de la vue EcoAction

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home, // La page d'accueil
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage, // Page de connexion
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage, // Page d'inscription
  },
  {
    path: '/historique',
    name: 'Historique',
    component: Historique, // Historique des trajets de l'utilisateur
  },
  {
    path: '/enregistrer-consommation',
    name: 'EnregistrerConsommation',
    component: EnregistrerConsommation, // Formulaire pour enregistrer une consommation
  },
  {
    path: '/recherche',
    name: 'Recherche',
    component: Recherche, // Vue de recherche
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile, // Profil utilisateur
  },
  {
    path: '/faire-score',
    name: 'FaireScore',
    component: FaireScore, // Vue pour le Faire Score
  },
  {
    path: '/eco-action',
    name: 'EcoAction',
    component: EcoAction, // Vue pour enregistrer et visualiser les actions écologiques
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
