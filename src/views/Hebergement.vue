<template>
  <div class="hebergement-container">
    <h2>Nos hébergements</h2>

    <div class="search-filters">
      <!-- Formulaire de recherche pour filtrer les hébergements -->
      <input v-model="searchCity" placeholder="Rechercher par ville" type="text" />
      <select v-model="searchType">
        <option value="">Sélectionner un type d'hébergement</option>
        <option v-for="type in typesHebergements" :key="type" :value="type">{{ type }}</option>
      </select>
      <button @click="fetchHebergements">Rechercher</button>
    </div>

    <!-- Affichage des hébergements -->
    <div v-if="hebergements.length" class="hebergement-list">
      <div v-for="hebergement in hebergements" :key="hebergement.id" class="hebergement-card">
        <img :src="`${hebergement.photo}.jpg`" alt="Hébergement" class="hebergement-image" />
        <div class="hebergement-info">
          <h3>{{ hebergement.typeHebergement }}</h3>
          <p>{{ hebergement.description }}</p>
          <p><strong>Prix:</strong> {{ hebergement.prix }} €</p>
          <p><strong>Émissions CO₂:</strong> {{ hebergement.tauxCO2 }} kg</p>
        </div>
      </div>
    </div>

    <!-- Message quand il n'y a pas d'hébergement -->
    <div v-else class="no-results">
      <p>Aucun hébergement trouvé avec ces critères.</p>
    </div>

    <!-- Affichage des erreurs d'API -->
    <div v-if="error" class="error-message">
      <p>Erreur lors de la récupération des hébergements. Veuillez réessayer.</p>
    </div>
  </div>
</template>

<script>
import apiClient from '@/apiClient';

export default {
  data() {
    return {
      searchCity: '',
      searchType: '',
      hebergements: [],
      typesHebergements: [],
      error: false
    };
  },
  methods: {
    async fetchHebergements() {
      this.error = false;
      this.hebergements = [];

      const params = {};
      if (this.searchCity) params.ville = this.searchCity;
      if (this.searchType) params.typeHebergement = this.searchType;

      try {
        const response = await apiClient.get('/hebergements/search', { params });

        if (typeof response.data === 'string' && response.data.includes('Aucun hébergement trouvé')) {
          this.hebergements = [];
          alert(response.data);
        } else {
          this.hebergements = response.data;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des hébergements:', error);
        this.error = true;
      }
    }
  },
  async mounted() {
    try {
      const response = await apiClient.get('/hebergements/types');
      this.typesHebergements = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des types d\'hébergements:', error);
    }
  }
};
</script>

<style scoped>
.hebergement-container {
  text-align: center;
  width: 100%;

}

.search-filters {
  margin-bottom: 20px;
}

.search-filters input,
.search-filters select {
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.search-filters button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.hebergement-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
}

.hebergement-card {
  width: 30%;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.hebergement-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.hebergement-info {
  margin-top: 15px;
}

.hebergement-info h3 {
  font-size: 1.2rem;
  color: #333;
}

.hebergement-info p {
  font-size: 1rem;
  color: #666;
}

.no-results {
  text-align: center;
  color: #888;
}

.error-message {
  text-align: center;
  color: red;
  font-weight: bold;
}
</style>
