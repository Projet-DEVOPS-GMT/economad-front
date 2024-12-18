import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  // Ajoute d'autres routes si nécessaire
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
