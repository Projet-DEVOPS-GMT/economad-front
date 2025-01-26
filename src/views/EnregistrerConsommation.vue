<template>
    <div class="enregistrer-consommation">
      <h1>Enregistrer une consommation</h1>
      <form @submit.prevent="enregistrerConsommation">
        <!-- Type de consommation -->
        <label for="type-consommation">Type de consommation</label>
        <select v-model="consommation.type" id="type-consommation" required>
          <option value="transport">Transport</option>
          <option value="hebergement">Hébergement</option>
          <option value="restauration">Restauration</option>
        </select>
  
        <!-- Type de transport, visible uniquement si Transport est sélectionné -->
        <div v-if="consommation.type === 'transport'">
          <label for="type-transport">Type de transport</label>
          <select v-model="consommation.transportType" id="type-transport" required>
            <option value="Avion">Avion</option>
            <option value="Train">Train</option>
            <option value="Bus">Bus</option>
          </select>
  
          <!-- Dates -->
          <div class="dates">
            <div>
              <label for="date-depart">Date de départ</label>
              <input type="date" v-model="consommation.dateDepart" id="date-depart" required />
            </div>
            
            <div>
              <label for="date-arrivee">Date d'arrivée</label>
              <input type="date" v-model="consommation.dateArrivee" id="date-arrivee" required />
            </div>
          </div>
        </div>
  
        <div v-if="consommation.type === 'hebergement' || consommation.type === 'restauration'">
          <label for="ville">Ville</label>
          <input type="text" v-model="consommation.ville" id="ville" placeholder="Entrez la ville" required />
        </div>

        <div v-if="consommation.type === 'Restauration'">
          <label for="type-restaurant">Type de Restaurant</label>
          <select v-model="consommation.restaurantType" id="type-restaurant" required>
            <option value="fastfod">Fast Food</option>
            <option value="gastronomique">Restaurant Gastronomique</option>
            <option value="classique">Restaurant Classique</option>
            <option value="collective">Restauration Collective</option>
          </select>

          <label for="type-plat">Type de Plat</label>
          <select v-model="consommation.restaurantType" id="type-restaurant" required>
            <option value="fastfod">Viande</option>
            <option value="gastronomique">Vegetarien</option>
            <option value="classique">Poison</option>
            
          </select>
        </div>
  
        <label for="montant-consommation">Montant de la consommation (€)</label>
        <input type="text" v-model="consommation.montant" id="montant-consommation" required />
  
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  </template>
  
  <script>
  import apiClient from '../apiClient';
  export default {
    data() {
      return {
        consommation: {
          type: 'transport',
          transportType: '',
          dateDepart: '',
          dateArrivee: '',
          ville: '',
          restaurantType: '',
          platType: '',
          montant: 0
        }
      };
    },
    methods: {
      async enregistrerConsommation() {
        try {
          let route = '';
          let data = {};

       
          const response = await apiClient.post('/consommations', {
                type: this.consommation.type,
                transportType: this.consommation.transportType,
                dateDepart: this.consommation.dateDepart,
                dateArrivee: this.consommation.dateArrivee,
                montant: this.consommation.montant,
              });
          console.log(response);

          // localStorage.setItem('user-id', response.data.id);

          // this.$router.push('/');

          // console.log(localStorage.getItem('user-id'));
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

  .enregistrer-consommation {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin: 10px 0 5px;
    font-weight: bold;
  }
  
  select, input {
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  

  .dates {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  button {
    padding: 12px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  