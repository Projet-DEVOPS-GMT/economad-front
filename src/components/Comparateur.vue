<template>
  <div class="comparateur">
    <h1>Comparateur de Modes de Transport</h1>

    <!-- Formulaire pour saisir la ville de départ et d'arrivée -->
    <div class="form">
      <label>Ville de départ :</label>
      <input v-model="villeDepart" type="text" placeholder="Saisir la ville de départ" />

      <label>Ville de destination :</label>
      <input v-model="villeDestination" type="text" placeholder="Saisir la ville de destination" />

      <button @click="fetchTransports" class="btn">Rechercher</button>
    </div>

    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <!-- Affichage des résultats sous forme de cards -->
    <div v-if="transports.length" class="cards-container">
      <h2>Transports disponibles (triés par coût croissant)</h2>
      <div
        v-for="transport in sortedTransports"
        :key="transport.id"
        class="card"
        @click="selectTransport(transport)"
      >
        <h3>{{ transport.type_transport }}</h3>
        <p>💰 Coût total : {{ calculateCost(transport) }} €</p>
        <p>🌱 Émissions CO₂ : {{ calculateCO2(transport) }} kg</p>
      </div>
    </div>

    <!-- Transport sélectionné -->
    <div v-if="selectedTransport" class="selection">
      <h2>Vous avez sélectionné :</h2>
      <div class="selected-card">
        <h3>{{ selectedTransport.type_transport }}</h3>
        <p>💰 Coût total : {{ calculateCost(selectedTransport) }} €</p>
        <p>🌱 Émissions CO₂ : {{ calculateCO2(selectedTransport) }} kg</p>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../apiClient';

export default {
  data() {
    return {
      villeDepart: '',
      villeDestination: '',
      transports: [],
      selectedTransport: null,
      errorMessage: '',
    };
  },
  computed: {
    // Trier les transports par coût croissant
    sortedTransports() {
      return [...this.transports].sort((a, b) => a.estimation_prix - b.estimation_prix);
    },
  },
  methods: {
    async fetchTransports() {
      if (!this.villeDepart || !this.villeDestination) {
        this.errorMessage = 'Veuillez saisir les deux villes.';
        return;
      }

      this.errorMessage = '';
      try {
        const response = await apiClient.get('/api/compare-transport', {
          params: {
            depart: this.villeDepart,
            destination: this.villeDestination,
          },
        });
        this.transports = response.data;
        if (this.transports.length === 0) {
          this.errorMessage = 'Aucun transport trouvé pour cet itinéraire.';
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des transports', error);
        this.errorMessage = 'Une erreur est survenue lors de la récupération des données.';
      }
    },
    calculateCost(transport) {
      // Calcule le coût total pour la distance donnée
      return (transport.estimation_prix * this.distance).toFixed(2);
    },
    calculateCO2(transport) {
      // Calcule les émissions CO₂ totales pour la distance donnée
      return (transport.taux_CO2 * this.distance).toFixed(2);
    },
    selectTransport(transport) {
      this.selectedTransport = transport;
    },
  },
};
</script>

<style scoped>
.comparateur {
  text-align: center;
  padding: 2rem;
}

.form {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.form input {
  padding: 0.5rem;
  width: 200px;
}

.btn {
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error {
  color: red;
  margin-bottom: 1rem;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.card {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 220px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.selection {
  margin-top: 2rem;
  text-align: center;
}

.selected-card {
  background: #d9f7be;
  border: 1px solid #b7eb8f;
  border-radius: 8px;
  padding: 1.5rem;
  display: inline-block;
}
</style>
