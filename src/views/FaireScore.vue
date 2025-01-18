<template>
  <div class="faire-score">
    <h1>Score Écologique de la Ville</h1>

    <!-- Formulaire pour saisir l'ID de la ville -->
    <div class="form-group">
      <label for="cityId">ID de la Ville :</label>
      <input type="number" v-model="cityId" id="cityId" class="form-control" placeholder="Entrez l'ID de la ville" />
      <button @click="fetchEcoScore" class="btn btn-primary">Obtenir le Score</button>
    </div>

    <!-- Affichage des informations de la ville et du score -->
    <div v-if="ecoScore !== null">
      <div v-if="villeDetails">
        <h2>{{ villeDetails.nom }}</h2>
        <p><strong>Population:</strong> {{ villeDetails.population }}</p>
        <p><strong>PIB:</strong> {{ villeDetails.pib }}</p>
        <p><strong>Taux CO₂:</strong> {{ villeDetails.tauxCo2 }}</p>
        <p><strong>Score Écologique:</strong> {{ ecoScore }}</p>
      </div>
      <div v-else>
        <p>Aucune ville trouvée avec cet ID.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cityId: null,          // ID de la ville saisi par l'utilisateur
      ecoScore: null,        // Score écologique calculé
      villeDetails: null     // Détails de la ville récupérés
    };
  },
  methods: {
    // Fonction pour récupérer le score écologique de la ville
    async fetchEcoScore() {
      try {
        const response = await axios.get(`http://localhost:8080/api/villes/${this.cityId}/eco-score`);
        if (response.status === 200) {
          // Réponse avec le score écologique
          this.ecoScore = response.data.score;
          this.villeDetails = response.data.details;
        } else {
          // Si la ville n'est pas trouvée
          this.ecoScore = null;
          this.villeDetails = null;
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
