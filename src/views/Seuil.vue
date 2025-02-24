<template>
    <Header></Header>
    <div class="container">
      <!-- 🏞️ En-tête avec image -->
      <header class="card-header">
        <img :src="headerImage" alt="Nature écologique" class="header-img" />
        <h1>🌿 Définissez Votre Seuil Annuel de CO₂ 🌍</h1>
      </header>
  
      <!-- 📚 Importance de définir un seuil annuel de CO₂ -->
      <section class="info-section">
        <h2>Pourquoi est-ce important ?</h2>
        <p>
          Définir un seuil annuel de CO₂ est essentiel pour limiter le réchauffement climatique et préserver notre planète. Réduire son empreinte carbone de 9,2 à 2,3 tonnes de CO₂ par an est un défi de taille, mais il est réalisable grâce à une combinaison d’efforts individuels et de politiques globales. :contentReference[oaicite:0]{index=0}
        </p>
        <p>
          En adoptant un mode de vie plus sobre et durable, tout en soutenant des mesures ambitieuses, nous pouvons non seulement réduire nos émissions, mais aussi améliorer notre qualité de vie et préserver la planète pour les générations futures.
        </p>
      </section>
  
      <!-- 📝 Formulaire de saisie -->
      <div class="form-section">
        <label for="co2-threshold">📊 Entrez votre seuil annuel de CO₂ (en kg) :</label>
        <input
          v-model="co2Threshold"
          type="number"
          id="co2-threshold"
          placeholder="Exemple : 5000"
          min="0"
          class="input-field"
        />
        <button @click="calculateRemainingCo2" class="action-button">Calculer</button>
      </div>
  
      <!-- 📈 Résultats dynamiques -->
      <div v-if="remainingCo2 !== null" class="result-section">
        <h2>🌍 Destinations Accessibles</h2>
        <p>Avec un seuil de {{ co2Threshold }} kg de CO₂, vous pouvez envisager les destinations suivantes :</p>
        <ul>
          <li v-for="(destination, index) in recommendedDestinations" :key="index" class="destination-item">
            <img :src="destination.image" alt="Image de la destination" class="destination-img" />
            <div class="destination-info">
              <h3>{{ destination.name }}</h3>
              <p>{{ destination.description }}</p>
              <p><strong>Score écologique :</strong> {{ destination.ecoScore }}%</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <Footer></Footer>
  </template>
  
  <script>
 import Footer from '../components/footer.vue';
 import Header from '../components/Header.vue';

  export default {
    components: {
      Footer,
      Header
    },
    data() {
      return {
        co2Threshold: null,
        remainingCo2: null,
        recommendedDestinations: [
          {
            name: 'Paris',
            description: 'Ville romantique avec une riche histoire culturelle.',
            image: require('@/assets/paris.png'),
            ecoScore: 66, // Score écologique de Paris
          },
          {
            name: 'Londres',
            description: 'Capitale dynamique connue pour ses musées et théâtres.',
            image: require('@/assets/londres.png'),
            ecoScore: 74, // Score écologique de Londres
          },
          {
            name: 'Berlin',
            description: 'Ville moderne avec une scène artistique florissante.',
            image: require('@/assets/berlin.png'),
            ecoScore: 70, // Score écologique de Berlin
          },
        ],
        headerImage: require('@/assets/travel-eco-friendly.jpg'), // Remplacez par le chemin de votre image
      };
    },
    methods: {
      calculateRemainingCo2() {
        if (this.co2Threshold && this.co2Threshold > 0) {
          this.remainingCo2 = this.co2Threshold;
        } else {
          alert('Veuillez entrer un seuil annuel de CO₂ valide.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* 🌿 Conteneur principal */
  .container {
    max-width: 900px;
    margin: auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    background-color: #f0f8ff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 5px;
    margin-bottom: 5px;
  }
  
  /* 🏞️ En-tête */
  .card-header {
    text-align: center;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .header-img {
    width: 30%;
    height: auto;
    border-radius: 10px;
  }
  
  /* 📚 Section d'information */
  .info-section {
    margin: 20px 0;
  }
  
  .info-section h2 {
    font-size: 24px;
    color: #333;
  }
  
  .info-section p {
    font-size: 16px;
    color: #666;
    line-height: 1.5;
  }
  
  /* 📝 Formulaire */
  .form-section {
    margin: 20px 0;
    text-align: center;
  }
  
  label {
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
    display: block;
  }
  
  .input-field {
    width: 60%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .action-button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .action-button:hover {
    background-color: #45a049;
  }
  
  /* 📈 Résultats */
  .result-section {
    margin-top: 30px;
  }
  
  .destination-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .destination-img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    margin-right: 20px;
  }
  
  .destination-info h3 {
    margin: 0;
    font-size: 20px;
    color: #333;
  }
  
  .destination-info p {
    margin: 5px 0 0;
    color: #666;
  }
  </style>
  