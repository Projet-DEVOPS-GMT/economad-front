import api from '../router/axios';

<template>
  <div class="login-container">
    <h1>Connexion à ECONOMAD</h1>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" placeholder="Email" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input v-model="password" type="password" id="password" placeholder="Mot de passe" required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <p class="register-link">Pas encore inscrit ? <router-link to="/register">Créer un compte</router-link></p>
  </div>
</template>

<script>
import api from '../router/axios';  // Importation de la configuration Axios

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
   async loginUser() {
  try {
    const response = await api.post('/login', {
      email: this.email,
      password: this.password,
    });

    // Stocker le token JWT dans localStorage
    localStorage.setItem('auth-token', response.data.token);

    // Rediriger vers une page protégée (par exemple, tableau de bord)
    this.$router.push('/dashboard');
  } catch (error) {
    console.error('Erreur lors de la connexion', error);
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
.login-container {
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

.register-link {
  margin-top: 20px;
}
</style>
