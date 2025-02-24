<template>
  <div class="eco-action-wrapper">
    <div class="eco-action-container" v-if="isAuthenticated">
      <h2><span class="emoji">🌍</span> Actions écologiques</h2>

      <div class="eco-action-form">
        <h3>Enregistrez vos actions pour la planète</h3>
        <div class="input-group">
          <input v-model="description" placeholder="Description de l'action" type="text" />
        </div>
        <div class="input-group">
          <input v-model="co2Saved" placeholder="CO2 économisé (en kg)" type="number" />
        </div>
        <!-- Button with + symbol and rounded style -->
        <button @click="submitEcoAction" class="submit-button">
          <span class="plus-symbol">+</span> Enregistrer l'action
        </button>
      </div>

      <!-- Affichage des actions enregistrées -->
      <div v-if="ecoActions.length" class="eco-action-list">
        <h3>Mes Actions</h3>
        <div class="cards">
          <div v-for="action in ecoActions" :key="action.id" class="eco-action-card">
            <p class="description"><strong>Description:</strong> {{ action.description }}</p>
            <p class="co2"><strong>CO2 économisé:</strong> {{ action.co2Saved }} kg</p>
            <p class="date"><strong>Date:</strong> {{ new Date(action.dateAction).toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="login-prompt">
      <p>Veuillez vous connecter pour enregistrer vos actions écologiques.</p>
    </div>
  </div>
</template>

<script>
import apiClient from '@/apiClient';

export default {
  data() {
    return {
      description: '',
      co2Saved: 0,
      ecoActions: [],
      isAuthenticated: false,
      userId: null, // ID de l'utilisateur connecté
    };
  },
  methods: {
    async submitEcoAction() {
      if (!this.isAuthenticated) {
        alert('Veuillez vous connecter pour enregistrer une action.');
        return;
      }

      const ecoAction = {
        description: this.description,
        co2Saved: this.co2Saved,
        dateAction: new Date(),
        user: { id: this.userId },
      };

      try {
        await apiClient.post('/eco-actions', ecoAction);
        this.getEcoActions();
        // Réinitialiser les champs du formulaire
        this.description = '';
        this.co2Saved = 0;
      } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'action", error);
      }
    },

    async getEcoActions() {
      try {
        if (this.userId) {
          const response = await apiClient.get(`/eco-actions/user/${this.userId}`);
          this.ecoActions = response.data;
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des actions", error);
      }
    },
  },
  created() {
    const token = localStorage.getItem('user-id');
    if (token) {
      this.isAuthenticated = true;
      this.userId = token;
      this.getEcoActions();
    }
  }
};
</script>

<style scoped>

:root {
  --primary-color: #4CAF50;
  --secondary-color: #2e7d32;
  --bg-light: #f9f9f9;
  --card-bg: #ffffff;
  --text-color: #333;
  --shadow: rgba(0, 0, 0, 0.1);
}

.eco-action-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #2db906 0%, #e8f5e9 100%);
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.eco-action-container {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 8px 16px var(--shadow);
  padding: 30px;
  max-width: 600px;
  width: 100%;
  animation: fadeIn 0.8s ease-in-out;
}

.eco-action-container h2 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.eco-action-container h2 .emoji {
  font-size: 2rem;
  margin-right: 10px;
}

.eco-action-form {
  background: linear-gradient(145deg,#ffffff,#f0f0f0);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  transition: transform 0.3s ease;
}

.eco-action-form:hover {
  transform: translateY(-5px);
}

.eco-action-form h3 {
  color: var(--secondary-color);
  margin-bottom: 15px;
  text-align: center;
}

.input-group {
  margin-bottom: 15px;
}

.input-group input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 5px var(--primary-color);
}

/* Style for the submit button */
.submit-button {
  width: 100%;
  padding: 15px;
  font-size: 1.1rem;
  background: var(--primary-color);
  color: #1aa839;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 6px var(--shadow);
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit-button:hover {
  background: var(--secondary-color);
  transform: scale(1.05);
}

.submit-button .plus-symbol {
  font-size: 1.8rem;
  margin-right: 10px;
}

.eco-action-list {
  margin-top: 20px;
}

.eco-action-list h3 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.eco-action-card {
  background: var(--bg-light);
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 8px var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-bottom: 2px solid #eee; 
}

.eco-action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px var(--shadow);
}

.eco-action-card p {
  margin: 8px 0;
  color: var(--text-color);
}

.login-prompt {
  text-align: center;
  color: var(--text-color);
  font-size: 1.2rem;
  padding: 20px;
  background: var(--bg-light);
  border-radius: 12px;
  box-shadow: 0 4px 8px var(--shadow);
}

/* Animation d'apparition */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .eco-action-wrapper {
    padding: 20px;
  }
  .eco-action-container {
    padding: 20px;
  }
}
</style>
