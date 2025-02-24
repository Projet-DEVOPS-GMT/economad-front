<template>
    <div class="eco-action-container" v-if="isAuthenticated">
      <h2>Actions écologiques</h2>
  
      <div class="eco-action-form">
        <h3>Enregistrez vos actions pour la planète</h3>
        <input v-model="description" placeholder="Description de l'action" type="text" />
        <input v-model="co2Saved" placeholder="CO2 économisé (en kg)" type="number" />
        <button @click="submitEcoAction">Enregistrer l'action</button>
      </div>
  
      <!-- Affichage des actions enregistrées -->
      <div v-if="ecoActions.length" class="eco-action-list">
        <h3>Mes Actions</h3>
        <div v-for="action in ecoActions" :key="action.id" class="eco-action-card">
          <p><strong>Description:</strong> {{ action.description }}</p>
          <p><strong>CO2 économisé:</strong> {{ action.co2Saved }} kg</p>
          <p><strong>Date:</strong> {{ action.dateAction }}</p>
        </div>
      </div>
    </div>
  
    <div v-else>
      <p>Veuillez vous connecter pour enregistrer vos actions écologiques.</p>
    </div>
  </template>
  
  <script>
  import apiClient from '@/apiClient';
  
  export default {
    data() {
      return {
        description: '',
        co2Saved: 0,
        ecoActions: [],
        isAuthenticated: false,
        userId: null, // ID de l'utilisateur connecté
      };
    },
    methods: {
      async submitEcoAction() {
        if (!this.isAuthenticated) {
          alert('Veuillez vous connecter pour enregistrer une action.');
          return;
        }
  
        const ecoAction = {
          description: this.description,
          co2Saved: this.co2Saved,
          dateAction: new Date(),
          user: { id: this.userId }, 
        };
  
        try {
          console.log(ecoAction);
          await apiClient.post('/eco-actions', ecoAction);
          this.getEcoActions();
        } catch (error) {
          console.error("Erreur lors de l'enregistrement de l'action", error);
        }
      },
  
      async getEcoActions() {
        try {
          if (this.userId) {
            const response = await apiClient.get(`/eco-actions/user/${this.userId}`); // Utiliser l'ID de l'utilisateur
            this.ecoActions = response.data;
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des actions", error);
        }
      },
    },
    created() {
      // Vérifier si l'utilisateur est connecté
      const token = localStorage.getItem('user-id'); // Remplacer par le token JWT si nécessaire
      if (token) {
        this.isAuthenticated = true;
        this.userId = localStorage.getItem('user-id'); // Remplacer par la méthode pour obtenir l'ID de l'utilisateur
        this.getEcoActions(); // Charger les actions dès que l'utilisateur est connecté
      }
    }
  };
  </script>
  
  <style scoped>
  /* Ajouter des styles pour la page d'actions écologiques */
  .eco-action-container {
    margin: 20px;
  }
  
  .eco-action-form {
    margin-bottom: 20px;
  }
  
  .eco-action-list {
    margin-top: 20px;
  }
  
  .eco-action-card {
    padding: 10px;
    background-color: #f4f4f4;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border-radius: 5px;
    border: none;
  }
  </style>
  