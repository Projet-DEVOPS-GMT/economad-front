<template>
  <div class="historique-container">
    <div class="header">
  
      <img src="@/assets/easy-booking.png" alt="Logo Historique" class="logo-historique" />
      <h1 class="title">Historique des Trajets</h1>
    </div>

    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <!-- Tableau des trajets -->
    <div v-if="trajets.length" class="trajets-list">
      <div v-for="trajet in trajets" :key="trajet.id" class="trajet-card">
        <div class="trajet-details">
          <h3>{{ trajet.ville_depart }} → {{ trajet.ville_destination }}</h3>
          <p><strong>Date de départ:</strong> {{ trajet.date_depart }}</p>
          <p><strong>Coût:</strong> {{ trajet.consommation.prix }} €</p>
          <p><strong>Émissions CO₂:</strong> {{ trajet.consommation.taux_CO2 }} kg</p>
        </div>
        <div class="trajet-actions">
          <button @click="viewDetails(trajet)" class="btn-details">Voir les détails</button>
        </div>
      </div>
    </div>

    <!-- Total des coûts et émissions -->
    <div v-if="trajets.length" class="totals">
      <p><strong>Coût total:</strong> {{ totalCost }} €</p>
      <p><strong>Émissions totales:</strong> {{ totalCO2 }} kg</p>
    </div>

    <!-- Message si aucun trajet -->
    <div v-else>
      <p>Aucun trajet trouvé dans l'historique.</p>
    </div>

    <!-- Redirection vers la connexion pour l'enregistrement -->
    <div class="actions">
      <button @click="redirectToLogin" class="btn-login">Se connecter pour ajouter un trajet</button>
    </div>
  </div>
</template>

<script>
import apiClient from '../apiClient';

export default {
  data() {
    return {
      trajets: [],
      errorMessage: '',
    };
  },
  computed: {
    totalCost() {
      return this.trajets.reduce((sum, trajet) => sum + trajet.consommation.prix, 0).toFixed(2);
    },
    totalCO2() {
      return this.trajets.reduce((sum, trajet) => sum + trajet.consommation.taux_CO2, 0).toFixed(2);
    },
  },
  methods: {
    async fetchHistorique() {
      try {
        const response = await apiClient.get('/api/voyages/user/1'); // Exemple de user ID
        this.trajets = response.data;
      } catch (error) {
        this.errorMessage = 'Erreur lors de la récupération de l’historique';
      }
    },
    viewDetails(trajet) {
      // Afficher plus de détails sur un trajet, ici ça pourrait rediriger vers une page de détail
      console.log(trajet);
    },
    redirectToLogin() {
      this.$router.push('/login'); // Redirige l'utilisateur vers la page de connexion
    },
  },
  mounted() {
    this.fetchHistorique(); // Appel à l'API pour récupérer l'historique
  },
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Poppins:wght@400;700&display=swap');

.historique-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.logo-historique {
  max-width: 50px;
  height: auto;
  margin-right: 15px;
}

.title {
  font-family: 'Poppins', sans-serif;
  text-align: left;
  font-size: 2.5rem;
  color: #333;
  margin: 0;
}

.error-message {
  color: red;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.trajets-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.trajet-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.trajet-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.trajet-details {
  margin-bottom: 1.5rem;
}

.trajet-details h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.trajet-details p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.trajet-actions {
  text-align: center;
}

.btn-details {
  background-color: #4CAF50;
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-details:hover {
  background-color: #45a049;
}

.totals {
  background-color: #f1f1f1;
  padding: 1.5rem;
  text-align: center;
  border-radius: 10px;
  margin-top: 2rem;
}

.totals p {
  font-size: 1.2rem;
  color: #333;
}

.actions {
  text-align: center;
  margin-top: 2rem;
}

.btn-login {
  background-color: #007bff;
  color: white;
  padding: 0.7rem 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
}

.btn-login:hover {
  background-color: #0056b3;
}
</style>
