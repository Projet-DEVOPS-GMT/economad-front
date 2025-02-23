
<template>
    
    <Header></Header>
    <div class="profile-container">
      <h1>Profil de l'utilisateur</h1>
      <div v-if="user">
        <p><strong>Nom d'utilisateur : </strong>{{ user.nom  }} </p>
        <p><strong>Email : </strong>{{ user.username }}</p>
        <p><strong>Nom complet : </strong>{{ user.nom  }} {{ user.prenom  }}</p>
      </div>
      <div v-else>
        <p>Chargement des informations utilisateur...</p>
      </div>
      <button @click="logoutUser" class="logout-button">Se déconnecter</button>
    </div>

    <Footer></Footer>
  </template>
  
  <script>
  import apiClient from '../apiClient';
  import Footer from '../components/footer.vue';
  import Header from '../components/Header.vue';

  export default {
    components: {
      Footer,
      Header
    },
    data() {
      return {
        user: null, // Contient les informations de l'utilisateur
      };
    },
    methods: {
      async fetchUserProfile() {
        try {
          const userId = localStorage.getItem('user-id'); // Récupérer l'ID de l'utilisateur depuis localStorage
          const response = await apiClient.get(`/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
            },
          });
          this.user = response.data; // Stocker les données de l'utilisateur
        } catch (error) {
          console.error('Erreur lors de la récupération des informations utilisateur :', error);
          alert("Impossible de charger le profil de l'utilisateur.");
        }
      },
      logoutUser() {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-id');
        this.$router.push('/login');
      },
    },
    mounted() {
      this.fetchUserProfile(); // Charger les informations utilisateur dès que le composant est monté
    },
  };
  </script>
  
  <style scoped>
  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
  }
  
  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.2rem;
    margin: 10px 0;
  }
  
  .logout-button {
    padding: 10px 20px;
    background-color: #27ae60;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }
  
  .logout-button:hover {
    background-color: #c0392b;
  }
  </style>
  