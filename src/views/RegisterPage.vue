<template>
  <header class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="ECONOMAD Logo" class="logo-img" />
        <span class="logo-text">ECONOMAD</span>
      </div>
      <nav class="nav-bar">
        <router-link to="/faire-score" class="nav-item">Faire score</router-link>
        <router-link to="/profile" class="nav-item">Mon profil</router-link>
        <div class="dropdown">
          <button class="dropbtn">Consommations</button>
          <div class="dropdown-content">
            <router-link to="/enregistrer-consommation" class="nav-item">Enregistrer une consommation</router-link>
            <router-link to="/historique" class="nav-item">Afficher historique</router-link>
          </div>
        </div>

        <router-link to="/login" class="nav-item">Mon compte </router-link>
      </nav>
    </header>
  <div class="register-page">
    

    <div class="background-overlay">
      <p class="title">
        Nous contribuons à un tourisme plus responsable, positif et joyeux.
        Mettez du cœur dans vos évasions !
      </p>
      <div class="register-container">
        <div class="login-header">
          <h1>Créer un compte</h1>
          <p>Rejoignez la communauté Eco Nomade et commencez votre aventure.</p>
        </div>
        <form @submit.prevent="registerUser">
          <div class="form-group">
            <input v-model="firstName" type="text" id="firstName" placeholder="Prénom" required />
          </div>
          <div class="form-group">
            <input v-model="lastName" type="text" id="lastName" placeholder="Nom" required />
          </div>
          <div class="form-group">
            <input v-model="username" type="email" id="email" placeholder="Email" required />
          </div>
          <div class="form-group">
            <input v-model="password" type="password" id="password" placeholder="Mot de passe" required />
          </div>
          <button type="submit" class="register-button">S'INSCRIRE</button>
        </form>
        <p class="login-link">
          Déjà inscrit ? <router-link to="/login">Se connecter</router-link>
        </p>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
import apiClient from '../apiClient';
import Footer from '../components/footer.vue';

export default {
  components: {
    Footer,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
    };
  },
  methods: {
    validateForm() {
      if (!this.username || !this.password) {
        alert("Tous les champs doivent être remplis.");
        return false;
      }

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(this.username)) {
        alert("L'email n'est pas valide.");
        return false;
      }

      if (this.password.length < 6) {
        alert("Le mot de passe doit contenir au moins 6 caractères.");
        return false;
      }
      return true;
    },
    async registerUser() {
      if (!this.validateForm()) {
        return;
      }

      try {
        const response = await apiClient.post('/users', {
          prenom: this.firstName,
          nom: this.lastName,
          username: this.username,
          password: this.password,
        });

        this.$router.push('/login');
      } catch (error) {
        console.error("Erreur lors de l'inscription", error);
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
.register-page {
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-container {
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
}

.login-header h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #2c3e50;
}

.login-header p {
  font-size: 18px;
  color: #5ca28a;
  margin-bottom: 20px;
  padding-bottom: 10px;
}

input {
  width: 95%;
  padding: 12px 15px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

input:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.register-button {
  width: 100%;
  padding: 12px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

.register-button:hover {
  background-color: #219150;
}

.title {
  color: white;
  font-size: 22px;
  width: 45%;
  padding-bottom: 40px;
}

.login-link {
  margin-top: 20px;
  font-size: 1rem;
}

.login-link a {
  color: #2980b9;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

.header {
  background-color: #4CAF50;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-bar {
  display: flex;
  align-items: center; 
}

.nav-item,
.nav-link {
  color: white; 
  font-size: 16px;
  text-decoration: none; 
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease; 
}

.nav-item:hover,
.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: white; 
}

/* Menu déroulant */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.dropdown:hover .dropbtn {
  background-color: #45a049;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #45a049;
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 8px;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.nav-item {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Section principale */
.main-section {
  text-align: center;
  background-color: #f3f3f3;
  padding: 60px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.main-content {
  max-width: 500px;
  margin: 20px;
}

.main-content h1 {
  font-size: 3rem;
  color: #333;
}

.highlight {
  color: #4CAF50;
}

.main-content p {
  font-size: 1.2rem;
  color: #666;
  margin: 20px 0;
}

.btn-primary {
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #45a049;
}

.main-image img {
  max-width: 40%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.features-section {
  background-color: #ffffff;
  padding: 40px 20px;
  text-align: center;
}

.features-section h2 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #333;
}

.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.feature {
  max-width: 300px;
  text-align: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.feature-icon {
  width: 80px;
  margin-bottom: 15px;
}

.feature h3 {
  font-size: 1.5rem;
  color: #4CAF50;
  margin-bottom: 10px;
}

.feature p {
  font-size: 1rem;
  color: #666;
}

/* Section de boutons */
.cta-section {
  background-color: #f3f3f3;
  padding: 40px 20px;
  text-align: center;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn-secondary {
  padding: 12px 24px;
  background-color: #333;
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn-secondary:hover {
  background-color: #555;
}

</style>
