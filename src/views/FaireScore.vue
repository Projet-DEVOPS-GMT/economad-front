<template>
  <div class="faire-score">
    <h1>Score Écologique de la Ville</h1>

    <!-- Formulaire pour saisir l'ID de la ville -->
    <div class="form-group">
      <label for="cityId">ID de la Ville :</label>
      <input type="number" v-model="cityId" id="cityId" class="form-control" placeholder="Entrez l'ID de la ville" />
      <button @click="fetchEcoScore" class="btn btn-primary">Obtenir le Score</button>
    </div>

      <div v-show="hasScore">
        <h2>{{ nom }}</h2>
        <p><strong>Population:</strong> {{ population }}</p>
        <p><strong>PIB:</strong> {{ pib }}</p>
        <p><strong>Taux CO₂:</strong> {{ tauxCo2 }}</p>
        <p><strong>Score Écologique:</strong> {{ ecoScore }}</p>
      </div>

  </div>
</template>

<script>
import apiClient from "../apiClient";

export default {
  data() {
    return {
      cityId: null,          // ID de la ville saisi par l'utilisateur
      ecoScore: null,        // Score écologique calculé
      nom: null,     // Détails de la ville récupérés
      population: null,
      pib: null,
      ecoScorer: null,
      hasScore: false,
    };
  },
  methods: {
    // Fonction pour récupérer le score écologique de la ville
    async fetchEcoScore() {
      try {
        const response = await apiClient.get(`http://localhost:8080/api/villes/${this.cityId}/eco-score`);
        console.log("Réponse API : ", response);
        if (response.status === 200 && response.data) {
       
          this.ecoScore = response.data.score;
          this.villeDetails = response.data.details; // Details sont maintenant directement accessibles
          this.nom = response.data.nom;    // Détails de la ville récupérés
          this.population = response.data.population;
          this.pib= response.data.pib;
          this.ecoScorer = response.data.ecoScorer;
          this.hasScore = true;
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du score écologique", error);
        this.ecoScore = null;
        this.villeDetails = null;
      }
    }
  }
};
</script>

<style scoped>
.faire-score {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

button {
  margin-top: 10px;
}

h2 {
  color: #2c3e50;
}

p {
  font-size: 16px;
}

</style>
