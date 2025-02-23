<template>
    <Header></Header>
  <div class="historique-container">
  <!-- Header Section with Image -->
  <div class="historique-header-section">
    <img src="@/assets/easy-booking.png" alt="Historique" class="header-image" />
    <div class="header-text">
      <h1>Historique des consommations</h1>
    </div>
  </div>

  <!-- Main Content -->
  <div v-if="consommations.length" class="historique-content">
    <div class="historique-cards">
      <!-- Display each consumption as a card -->
      <div class="historique-card" v-for="item in consommations" :key="item.id">
        <div class="card-header">
          <h3>{{ item.type }} - {{ item.ville }}</h3>
          <p class="card-dates">{{ item.dateDepart }} - {{ item.dateArrivee }}</p>
        </div>
        <div class="card-body">
          <p><strong>Montant:</strong> {{ item.montant }} €</p>
          <p><strong>Émissions CO₂:</strong> {{ item.co2 }} kg</p> <!-- Affichage de l'émission CO₂ -->
        </div>
      </div>
    </div>

    <div class="total-emissions">
      <h3>Total des émissions CO₂ : {{ totalCO2 }} kg</h3>
    </div>
  </div>

  <div v-else class="no-consommations">
    <p>Aucune consommation enregistrée.</p>
  </div>
</div>
<Footer></Footer>

</template>

<script>
import apiClient from '../apiClient';
import Footer from '../components/footer.vue';
import Header from '../components/Header.vue';
export default {
  components: {
    Footer,
    Header
  },
  data() {
    return {
      consommations: [],
      totalCO2: 0,
    };
  },
  mounted() {
    this.fetchConsommations();
  },
  methods: {
    async fetchConsommations() {
  try {
    const response = await apiClient.get('/consommations');  // Test avec une route plus simple
    console.log(response.data);
    this.consommations = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des consommations:', error);
  }
}

  },
};

</script>

<style scoped>
/* Container for the entire page */
.historique-container {
  padding: 3rem 2rem;
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f7f7f7;
}

/* Header Section */
.historique-header-section {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-text h1 {
  font-size: 2.5rem;
  color: #333;
  font-weight: 600;
  margin: 0;
  padding-left: 10px;
}

/* Cards Section */
.historique-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.historique-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.historique-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-header {
  border-bottom: 2px solid #ddd;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.card-header h3 {
  font-size: 1.6rem;
  color: #4CAF50;
  font-weight: 600;
}

.card-dates {
  color: #777;
  font-size: 0.95rem;
  margin-top: 0.5rem;
}

.card-body {
  font-size: 1.1rem;
  color: #555;
}

.card-body p {
  margin: 0.5rem 0;
}

/* Total Emissions Section */
.total-emissions {
  margin-top: 3rem;
  font-weight: bold;
  font-size: 1.3rem;
  color: #333;
  text-align: center;
  padding: 1.5rem 0;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Empty State for No Consumption */
.no-consommations {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
  margin-top: 2rem;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .historique-header-section {
    flex-direction: column;
    align-items: center;
  }
  .header-image {
    width: 80px;
    height: 80px;
  }
  .header-text h1 {
    text-align: center;
  }
}
</style>
