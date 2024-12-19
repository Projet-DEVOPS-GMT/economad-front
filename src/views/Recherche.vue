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
    <div v-if="voyages.length" class="voyages-list">
      <div v-for="voyage in voyages" :key="voyage.id" class="voyage-card">
        <h3>{{ voyage.ville_depart }} → {{ voyage.ville_destination }}</h3>
        <p>Date de départ : {{ voyage.date_depart }}</p>
        <p>Prix : {{ voyage.prix }} €</p>
        <p>Émissions CO₂ : {{ voyage.co2 }} kg</p>
      </div>
    </div>

    <div v-else>
      <p>Aucun résultat trouvé.</p>
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
      voyages: [],
    };
  },
  methods: {
    async fetchVoyages() {
      if (!this.villeDepart || !this.villeDestination || !this.dateDepart || !this.dateRetour) {
        alert('Veuillez remplir tous les champs.');
        return;
      }
      try {
        const response = await apiClient.get('/api/voyages/recherche', {
          params: {
            depart: this.villeDepart,
            destination: this.villeDestination,
            date_depart: this.dateDepart,
            date_retour: this.dateRetour,
          },
        });
        this.voyages = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des voyages', error);
      }
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

.voyages-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.voyage-card {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.voyage-card h3 {
  font-size: 1.5rem;
  color: #333;
}

.voyage-card p {
  font-size: 1rem;
  color: #666;
}
</style>
