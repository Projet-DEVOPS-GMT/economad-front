<template>
  <div>
    <!-- Formulaire de recherche -->
    <div class="recherche-container">
      <h1>Rechercher un voyage</h1>

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
    </div>

    <!-- Affichage des options de transport après recherche -->
    <div v-if="transports.length" class="comparaison-container">
      <h1>Comparer les options de transport</h1>

      <!-- Affichage des filtres -->
      <div class="filters">
        <button @click="sortBy('price')" :class="{ active: sortCriteria === 'price' }">Filtrer par prix</button>
        <button @click="sortBy('duration')" :class="{ active: sortCriteria === 'duration' }">Filtrer par rapidité</button>
        <button @click="sortBy('co2')" :class="{ active: sortCriteria === 'co2' }">Filtrer par émissions CO₂</button>
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

      <div v-else>
        <p>Aucune option de transport disponible.</p>
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
        //  récupérer les voyages avec les paramètres
        const response = await apiClient.get('/transports/compare-transport', {
          params: {
            depart: this.villeDepart,
            destination: this.villeDestination,
            dateDepart: this.dateDepart,
            dateRetour: this.dateRetour,
          },
        });

        // Stocker les résultats dans le tableau transports
        this.transports = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des voyages', error);
      }
    },
    sortBy(criteria) {
      // Changer le critère de tri
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
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.input-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

input {
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
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
}

button:hover {
  background-color: #45a049;
}

.comparaison-container {
  padding: 2rem;
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