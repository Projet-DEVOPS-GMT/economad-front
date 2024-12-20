<template>
  <div class="recherche-container">
    <h1>Rechercher un voyage</h1>

    <!-- Formulaire de recherche -->
    <div class="search-form">
      <div class="input-group">
        <label for="ville-depart">Ville de départ</label>
        <input v-model="villeDepart" type="text" id="ville-depart" placeholder="Entrez la ville de départ" />
      </div>

      <div class="input-group">
        <label for="ville-destination">Ville de destination</label>
        <input v-model="villeDestination" type="text" id="ville-destination" placeholder="Entrez la ville de destination" />
      </div>

      <div class="input-group">
        <label for="date-depart">Date de départ</label>
        <input v-model="dateDepart" type="date" id="date-depart" />
      </div>

      <div class="input-group">
        <label for="date-retour">Date de retour</label>
        <input v-model="dateRetour" type="date" id="date-retour" />
      </div>

      <button @click="fetchVoyages" class="btn-recherche">Rechercher</button>
    </div>

    <!-- Affichage des résultats -->
    <div v-if="transports.length" class="comparaison-container">
      <div class="filters">
        <select @change="sortBy($event.target.value)">
          <option value="price">Filtrer par prix</option>
          <option value="duration">Filtrer par rapidité</option>
          <option value="co2">Filtrer par émissions CO₂</option>
        </select>
      </div>

      <!-- Affichage des options de transport -->
      <div v-if="sortedTransports.length" class="transport-cards">
        <div v-for="transport in sortedTransports" :key="transport.id" class="transport-card">
          <h3>{{ transport.typeTransport }}</h3>
          <p><strong>Prix :</strong> {{ transport.estimationPrix }} €</p>
          <p><strong>Durée :</strong> {{ transport.duration }} heures</p>
          <p><strong>Émissions CO₂ :</strong> {{ transport.tauxCO2 }} kg</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../apiClient';  // Assurez-vous que le chemin d'importation est correct

export default {
  data() {
    return {
      villeDepart: '',
      villeDestination: '',
      dateDepart: '',
      dateRetour: '',
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
    async fetchVoyages() {
      if (!this.villeDepart || !this.villeDestination || !this.dateDepart || !this.dateRetour) {
        alert('Veuillez remplir tous les champs.');
        return;
      }
      try {
        const response = await apiClient.get('/transports/compare-transport', {
          params: {
            depart: this.villeDepart,
            destination: this.villeDestination,
            dateDepart: this.dateDepart,
            dateRetour: this.dateRetour,
          },
        });
        this.transports = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des voyages', error);
      }
    },
    sortBy(criteria) {
      this.sortCriteria = criteria;
    },
  },
};
</script>

<style scoped>
.recherche-container {
  padding: 2rem;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
}

.search-form {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 48%;
}

label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

input {
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #4CAF50; /* Bordure verte */
}

button {
  background-color: #4caf50;
  color: white;
  padding: 1rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
}

button:hover {
  background-color: #45a049;
}

.comparaison-container {
  margin-top: 2rem;
}

.filters select {
  background-color: #4caf50;
  color: white;
  font-size: 1.1rem;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;
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