<template>
  <div class="comparaison-container">
    <h1>Comparer les options de transport</h1>

    <!-- Boutons de filtrage -->
    <div class="filters">
      <button @click="sortBy('price')" :class="{ active: sortCriteria === 'price' }">Filtrer par prix</button>
      <button @click="sortBy('duration')" :class="{ active: sortCriteria === 'duration' }">Filtrer par rapidité</button>
      <button @click="sortBy('co2')" :class="{ active: sortCriteria === 'co2' }">Filtrer par émissions CO₂</button>
    </div>

    <!-- Affichage des options de transport -->
    <div v-if="sortedTransports.length" class="transport-cards">
      <div v-for="transport in sortedTransports" :key="transport.id" class="transport-card">
        <h3>{{ transport.transport_type }}</h3>
        <p><strong>Prix :</strong> {{ transport.estimationPrix }} €</p>
        <p><strong>Durée :</strong> {{ transport.duration }} heures</p>
        <p><strong>Émissions CO₂ :</strong> {{ transport.tauxCO2 }} kg</p>
      </div>
    </div>

    <div v-else>
      <p>Aucune option de transport disponible.</p>
    </div>
  </div>
</template>

<script>
import apiClient from '../apiClient';

export default {
  data() {
    return {
      transports: [],
      sortCriteria: 'price',
    };
  },
  computed: {
    sortedTransports() {
      return [...this.transports].sort((a, b) => {
        if (this.sortCriteria === 'price') {
          return a.estimationPrix - b.estimationPrix;
        } else if (this.sortCriteria === 'duration') {
          return a.duration - b.duration;
        } else if (this.sortCriteria === 'co2') {
          return a.tauxCO2 - b.tauxCO2;
        }
      });
    },
  },
  methods: {
    async fetchComparisonData() {
      try {
        const response = await apiClient.get('/transports/compare-transport', {
          params: {
            depart: this.$route.query.depart,
            destination: this.$route.query.destination,
          },
        });
        this.transports = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données de comparaison', error);
      }
    },
    sortBy(criteria) {
      this.sortCriteria = criteria;
    },
  },
  mounted() {
    this.fetchComparisonData();
  },
};
</script>

<style scoped>
.comparaison-container {
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  text-align: center;
}

.filters {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.filters button {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
}

.filters button.active {
  background-color: #0056b3;
}

.transport-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.transport-card {
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.transport-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
</style>
