<template>
  <Header></Header>
  <div class="login-page">
    <div class="background-overlay" >
      <p class="title">Nous contribuons à un tourisme plus responsable, positif et joyeux
        Mettez du cœur dans vos évasions !</p>
      <div class="login-container">
        <div class="login-header">
          <h1>Bienvenue !</h1>
          <p>Connectez-vous pour poursuivre votre navigation et rejoindre la communauté Eco Nomade.</p>
        </div>
        <form @submit.prevent="loginUser">
          <div class="form-group">
            <input v-model="username" type="email" id="email" placeholder="Votre email" required />
          </div>
          <div class="form-group">
            <input v-model="password" type="password" id="password" placeholder="Votre mot de passe" required />
          </div>
          <a href="#" class="forgot-password">Mot de passe oublié ?</a>
          <button type="submit" class="login-button">ME CONNECTER</button>

          <p class="register-link">Pas encore inscrit ? <router-link to="/register">Créer un compte</router-link></p>

        </form>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
import apiClient from '../apiClient';
import Header from './Header.vue';
import Footer from '../components/footer.vue';

export default {
  components: {
      Footer,
      Header
    },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
   async loginUser() {
    try {
      const response = await apiClient.post('/users/login', {
        username: this.username,
        password: this.password,
      });

      localStorage.setItem('auth-token', response.data.token);
      localStorage.setItem('user-id', response.data.id);

      this.$router.push('/');

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
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('@/assets/login_background.jpg') no-repeat center center/cover; 
  position: relative;
}

.background-overlay {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: rgba(169, 221, 198, 0.5); */
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
}

.longin-header h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #2c3e50;
}

.login-header p {
  font-size: 20px;
  color: #5ca28a;
  margin-bottom: 20px;
  padding-bottom: 10px;
}

/* .form-group input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  font-size: 1rem;

} */
input {
  width: 95%;
  padding: 12px 15px; /* Plus de padding pour un meilleur confort */
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px; /* Taille du texte plus grande */
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

input:focus {
  border-color: #4CAF50; /* Couleur verte au focus */
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}


.forgot-password {
  display: block;
  text-align: right;
  font-size: 0.9rem;
  color: #2980b9;
  margin-bottom: 15px;
  text-decoration: none;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

.title{
  color:white;
  font-size: 22px;
  width: 45%;
  padding-bottom: 40px;
}
.login-button:hover {
  background-color: #219150;
}


</style>
