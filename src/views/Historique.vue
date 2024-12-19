<template>
  <div class="historique">
    <h1>Historique des Trajets</h1>

    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <!-- Tableau des trajets -->
    <table v-if="trajets.length">
      <thead>
        <tr>
          <th>Départ</th>
          <th>Destination</th>
          <th>Date de départ</th>
          <th>Coût (€)</th>
          <th>Émissions CO₂ (kg)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trajet in trajets" :key="trajet.id">
          <td>{{ trajet.ville_depart }}</td>
          <td>{{ trajet.ville_destination }}</td>
          <td>{{ trajet.date_depart }}</td>
          <td>{{ trajet.consommation.prix }} €</td>
          <td>{{ trajet.consommation.taux_CO2 }} kg</td>
        </tr>
      </tbody>
    </table>

    <!-- Total des coûts et émissions -->
    <div v-if="trajets.length" class="totals">
      <p><strong>Coût total :</strong> {{ totalCost }} €</p>
      <p><strong>Émissions totales :</strong> {{ totalCO2 }} kg</p>
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
    // Fonction pour vérifier si l'utilisateur est connecté
    checkAuthentication() {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        this.$router.push('/login');  // Redirige vers la page de connexion si non authentifié
      }
    },

    async fetchHistorique() {
      // Vérification de l'authentification avant de récupérer l'historique
      this.checkAuthentication();

      try {
        const userId = 1; // Récupère l'ID utilisateur à partir du token JWT ou de l'état global si nécessaire
        const token = localStorage.getItem('auth-token');

        const response = await apiClient.get(`/api/voyages/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Ajout du token dans les en-têtes de la requête
          },
        });

        this.trajets = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération de l’historique', error);
        this.errorMessage = 'Une erreur est survenue lors de la récupération des trajets.';
      }
    },
  },
  mounted() {
    this.fetchHistorique();
  },
};
</script>

<style scoped>
.historique {
  padding: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 1rem;
  text-align: center;
}

th {
  background-color: #4caf50;
  color: white;
}

.totals {
  margin-top: 2rem;
  text-align: center;
}

.error {
  color: red;
  margin-bottom: 1rem;
}
</style>
