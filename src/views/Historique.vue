<template>
  <div class="historique">
    <h2>Historique des consommations</h2>
    <div v-if="consommations.length">
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Ville / Dates</th>
            <th>Montant (€)</th>
            <th>Émissions CO₂ (kg)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in consommations" :key="item.id">
            <td>{{ item.type }}</td>
            <td>{{ item.ville }} / {{ item.dateDepart }} - {{ item.dateArrivee }}</td>
            <td>{{ item.montant }} €</td>
            <td>{{ item.co2 }} kg</td>
          </tr>
        </tbody>
      </table>

      <div class="total">
        <h3>Total des émissions CO₂ : {{ totalCO2 }} kg</h3>
      </div>
    </div>
    <div v-else>
      <p>Aucune consommation enregistrée.</p>
    </div>
  </div>
</template>

<script>
import apiClient from '@/apiClient';

export default {
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
        const response = await apiClient.get('/api/consommations');
        this.consommations = response.data;
        this.totalCO2 = this.consommations.reduce((sum, item) => sum + item.co2, 0);
      } catch (error) {
        console.error('Erreur lors de la récupération des consommations:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Style pour l'historique */
.historique {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.total {
  margin-top: 20px;
}
</style>
