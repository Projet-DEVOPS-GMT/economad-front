<template>
  <div>
    <h1>Bienvenue sur la page de connexion</h1>
    <UserConnexion v-if="isLoaded" /> <!-- Affiche le composant après chargement -->
    <div v-else>Chargement...</div> <!-- Affiche "Chargement..." si la page n'est pas encore prête -->
  </div>
</template>

<script>
import UserConnexion from '../components/UserConnexion.vue';

export default {
  components: {
    UserConnexion,
  },
  data() {
    return {
      isLoaded: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 1000); // Simule un délai de chargement
  },
};
</script>
