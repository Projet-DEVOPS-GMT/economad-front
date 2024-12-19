<template>
  <div class="register-container">
    <h1>Inscription à ECONOMAD</h1>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="firstName">Prénom</label>
        <input v-model="firstName" type="text" id="firstName" placeholder="Prénom" required />
      </div>
      <div class="form-group">
        <label for="lastName">Nom</label>
        <input v-model="lastName" type="text" id="lastName" placeholder="Nom" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" placeholder="Email" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input v-model="password" type="password" id="password" placeholder="Mot de passe" required />
      </div>
      <button type="submit">S'inscrire</button>
    </form>
    <p class="login-link">Déjà inscrit ? <router-link to="/login">Se connecter</router-link></p>
  </div>
</template>

<script>
import api from '../router/axios';  // Importation de la configuration Axios

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await api.post('/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        });

        // Si l'inscription est réussie, rediriger l'utilisateur vers la page de connexion
        this.$router.push('/login');
      } catch (error) {
        console.error('Erreur lors de l\'inscription', error);
        if (error.response) {
          alert(`Erreur API: ${error.response.data.message || 'Erreur inconnue'}`);
        } else {
          alert('Erreur réseau, vérifiez votre connexion');
        }
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.login-link {
  margin-top: 20px;
}
</style>
