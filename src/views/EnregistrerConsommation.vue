<template>
    <div class="enregistrer-consommation">
      <h1>Enregistrer une consommation</h1>
      <form @submit.prevent="enregistrerConsommation">
        <!-- Type de consommation -->
        <label for="type-consommation">Type de consommation</label>
        <select v-model="consommation.type" id="type-consommation" required>
          <option value="Transport">Transport</option>
          <option value="Hébergement">Hébergement</option>
          <option value="Restauration">Restauration</option>
        </select>
  
        <!-- Type de transport, visible uniquement si Transport est sélectionné -->
        <div v-if="consommation.type === 'Transport'">
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
  
        <!-- Ville, visible uniquement si Hébergement ou Restauration est sélectionné -->
        <div v-if="consommation.type === 'Hébergement' || consommation.type === 'Restauration'">
          <label for="ville">Ville</label>
          <input type="text" v-model="consommation.ville" id="ville" placeholder="Entrez la ville" required />
        </div>
  
        <!-- Montant -->
        <label for="montant-consommation">Montant de la consommation (€)</label>
        <input type="number" v-model="consommation.montant" id="montant-consommation" required />
  
        <!-- Submit Button -->
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        consommation: {
          type: 'Transport', // Valeur par défaut
          transportType: 'Avion', // Valeur par défaut pour transport
          dateDepart: '',
          dateArrivee: '',
          ville: '', 
          montant: ''
        }
      };
    },
    methods: {
      enregistrerConsommation() {
     console.log('Consommation enregistrée :', this.consommation);
        
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styles pour l'interface du formulaire */
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
  