<template>
  <header class="header">
    <div class="logo">
      <img src="@/assets/logo.png" alt="ECONOMAD Logo" class="logo-img" />
      <span class="logo-text">ECONOMAD</span>
    </div>
    <nav class="nav-bar">
      <router-link to="/profile" class="nav-item">Mon profil</router-link>
      <router-link to="/login" class="nav-item">Mon compte</router-link>
      <div class="dropdown">
        <button class="dropbtn">Consommations</button>
        <div class="dropdown-content">
          <router-link to="/enregistrer-consommation" class="nav-item">Enregistrer une consommation</router-link>
          <router-link to="/historique" class="nav-item">Afficher historique</router-link>
        </div>
      </div>
      <router-link to="/faire-score" class="nav-item">Faire score</router-link>
      <router-link to="/seuil-annuel" class="nav-item">Seuil annuel CO2</router-link>
    </nav>
  </header>
</template>



<style scoped>

/* En-tête */
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

</style>