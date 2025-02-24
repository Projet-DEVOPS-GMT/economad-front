<template>
  <header class="header">
    <router-link to="/" style="text-decoration: none; ">
    <div class="logo">
      <img src="@/assets/logo.png" alt="ECONOMAD Logo" class="logo-img" />
      <span class="logo-text" style="color: white;">ECONOMAD</span>
    </div>
  </router-link>
    <nav class="nav-bar">

      <div class="dropdown">
        <button class="dropbtn">Mon compte</button>
        <div class="dropdown-content">
          <router-link to="/login" class="nav-item">Se connecter</router-link>
          <router-link v-show="isAuthenticated" to="/profile" class="nav-item">Mon profil</router-link>
          <router-link  v-show="isAuthenticated"to="/historique" class="nav-item">Historiques de consommation</router-link>
          <router-link  v-show="isAuthenticated" to="/" @click="logoutUser"  class="nav-item">Se deconnecter</router-link>
        </div>
      </div>
      
      <div class="dropdown"  v-show="isAuthenticated">
        <button class="dropbtn">Consommations</button>
        <div class="dropdown-content">
          <router-link to="/enregistrer-consommation" class="nav-item">Enregistrer une consommation</router-link>
          <router-link to="/historique" class="nav-item">Afficher historique</router-link>
        </div>
      </div>
      <router-link to="/faire-score" class="nav-item">Faire score</router-link>
      <router-link to="/seuil-annuel" class="nav-item">Seuil annuel CO2</router-link>
    </nav>
  </header>
</template>

<script>
import apiClient from '../apiClient';

export default {
  
  data() {
    return {
      user: null, 
      isAuthenticated: false
    };
  },
  created() {
      const auth = localStorage.getItem('user-id'); 
      if (auth) {
        this.isAuthenticated = true;  
      }
    },
  methods: {
    // async fetchUserProfile() {
    //   try {
    //     const userId = localStorage.getItem('user-id'); // Récupérer l'ID de l'utilisateur depuis localStorage
    //     const response = await apiClient.get(`/users/${userId}`, {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    //       },
    //     });
    //     this.user = response.data; // Stocker les données de l'utilisateur
    //   } catch (error) {
    //     console.error('Erreur lors de la récupération des informations utilisateur :', error);
    //     alert("Impossible de charger le profil de l'utilisateur.");
    //   }
    // },
    logoutUser() {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user-id');
      this.$router.push('/login');
    },
  },
 
};
</script>

<style scoped>

/* En-tête */
.header {
  background-color: #4CAF50;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-bar {
  display: flex;
  align-items: center; 
}

.nav-item,
.nav-link {
  color: white; 
  font-size: 16px;
  text-decoration: none; 
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease; 
}

.nav-item:hover,
.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: white; 
}

/* Menu déroulant */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.dropdown:hover .dropbtn {
  background-color: #45a049;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #45a049;
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 8px;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.nav-item {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

</style>