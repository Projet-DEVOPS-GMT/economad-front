<template>
  <div class="container">
    <!-- 🏙️ Bannière avec image -->
    <header class="header">
      <img src="@/assets/eco-friendly.png" alt="Ville écologique" class="banner-img" />
      <h1>🌱 Score Écologique des Villes 🏙️</h1>
    </header>

    <!-- 📍 Sélection de la ville -->
    <div class="form-section">
      <label for="city-select">📍 Sélectionnez une ville :</label>
      <select v-model="cityId" id="city-select">
        <option v-for="ville in villes" :key="ville.id" :value="ville.id">
          {{ ville.nom }} 🏡
        </option>
      </select>
      <button @click="fetchEcoScore">🔍 Obtenir le Score</button>
    </div>

    <!-- 🏆 Carte des résultats -->
    <div v-if="hasScore" class="result-card">
      <h2>🌍 {{ nom }}</h2>
      <img src="@/assets/destination1.jpg" alt="Ville verte" class="city-img" />
      
      <div class="city-info">
        <p>👨‍👩‍👧‍👦 <strong>Population :</strong> {{ population.toLocaleString() }} habitants</p>
        <p>💰 <strong>PIB :</strong> {{ pib.toLocaleString() }} €</p>
        <p>☁️ <strong>Taux CO₂ :</strong> {{ tauxCo2 }} ppm</p>
        <p class="eco-score">🏆 <strong>♻️ Score Écologique :</strong> {{ ecoScore.toFixed(2) }} / 100</p>
      </div>
    </div>

    <!-- 📚 Section d'information -->
    <div class="info-section">
      <h2>📊 À propos du Score Écologique 🤔</h2>
      <p>
        Ce score mesure l'impact environnemental des villes 🏙️ en analysant leur pollution, leur économie et leur population.
      </p>
      <h3>🔎 Comment est-il calculé ?</h3>
      <p>
        Une ville avec une bonne croissance économique et une faible empreinte carbone obtient un meilleur score.
      </p>
      <h3>🌿 Pourquoi c'est important ?</h3>
      <p>
        Comprendre l’impact écologique des villes aide à adopter des pratiques durables pour protéger la planète 🌍.
      </p>
    </div>
  </div>
</template>

<script>
import apiClient from "../apiClient";

export default {
  data() {
    return {
      cityId: null,
      villes: [],
      ecoScore: null,
      nom: null,
      population: null,
      pib: null,
      tauxCo2: null,
      hasScore: false,
    };
  },
  async mounted() {
    await this.fetchVilles();
  },
  methods: {
    async fetchVilles() {
      try {
        const response = await apiClient.get("http://localhost:8080/api/villes");
        if (response.status === 200) {
          this.villes = response.data;
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des villes", error);
      }
    },
    async fetchEcoScore() {
      if (!this.cityId) {
        alert("Veuillez sélectionner une ville !");
        return;
      }
      try {
        const response = await apiClient.get(`http://localhost:8080/api/villes/${this.cityId}/eco-score`);
        if (response.status === 200 && response.data) {
          this.ecoScore = response.data.score;
          this.tauxCo2 = response.data.tauxCo2;
          this.nom = response.data.city;
          this.population = response.data.population;
          this.pib = response.data.pib;
          this.hasScore = true;
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du score écologique", error);
        this.ecoScore = null;
        this.nom = null;
      }
    },
  },
};
</script>

<style scoped>
/* 🌿 Ajout d'une image de fond */
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  text-align: center;
  background-image: url('@/assets/image4.png'); /* Image légère */
  background-size: cover;
  background-position: center;
  color: #2c3e50;
  position: relative;
  color: #2c3e50;
}
.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6); /* Voile blanc semi-transparent */
  backdrop-filter: blur(8px); /* Effet flou */
  z-index: -1;
}

/* 🏙️ Bannière */
.header {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.banner-img {
  width: 100%;
  max-height: 150px;
  object-fit: cover;
  border-radius: 15px;
}

/* 📍 Formulaire */
.form-section {
  margin: 20px 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
  font-size: 22px; /* Augmentation de la taille */
  color: #f50d0dfb; /* Bleu foncé pour meilleure visibilité */
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 60%;
  font-size: 16px;
}

button {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

button:hover {
  background-color: #219150;
}

/* 🏆 Carte des résultats */
.result-card {
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.city-info {
  text-align: left;
  margin-top: 15px;
}

.city-img {
  width: 100%;
  border-radius: 10px;
  margin-top: 15px;
}

.eco-score {
  font-size: 20px;
  font-weight: bold;
  color: #27ae60;
}

/* 📚 Section info */
.info-section {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  margin-top: 30px;
  border-radius: 15px;
}

h2, h3 {
  color: #2c3e50;
}
</style>