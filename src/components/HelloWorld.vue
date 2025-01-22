<template>
  <div>
    <h1>Vue + Spring Boot</h1>
    <button @click="fetchData">Récupérer les données du backend</button>
    <div v-if="data">
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<script>
import apiClient from '../apiClient';

export default {
  data() {
    return {
      data: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await apiClient.get('/endpoint'); gradle 
        this.data = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    },
  },
};
</script>
