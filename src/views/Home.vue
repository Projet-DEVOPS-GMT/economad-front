<template>
  <div class="home">
   <Header></Header>

    <!-- <section class="main-section">
      <div class="main-content">
        <h1>Bienvenue sur <span class="highlight">ECONOMAD</span></h1>
        <p>Explorez des voyages low-cost, tout en réduisant votre empreinte carbone.</p>
        <router-link to="/recherche" class="btn-primary">Rechercher voyage</router-link>
      </div>
      <div class="main-image">
        <img src="@/assets/image4.png" alt="Voyage éco-responsable" />
      </div>
    </section> -->

    <section class="hero">
      <div class="hero-content">
        <h1>Bienvenue sur <span class="highlight">ECONOMAD</span></h1>
        <p>Explorez des voyages low-cost tout en réduisant votre empreinte carbone.</p>
        <router-link to="/recherche" class="btn-primary">Rechercher voyage</router-link>
      </div>
    </section>

    <section class="search-section">
      <div class="search-box">
        <input type="text" placeholder="Où voulez-vous aller ?" />
        <input type="date" />
        <button class="search-btn">Rechercher</button>
      </div>
    </section>

    <!-- Ajout de la section d'hébergement -->
    <Hebergement />

    <section class="features-section">
      <h2>Pourquoi choisir ECONOMAD ?</h2>
      <div class="features">
        <div class="feature">
          <img src="@/assets/image3.png" alt="Low-cost" class="feature-icon" />
          <h3>Voyages économiques</h3>
          <p>Profitez des meilleures offres pour voyager à moindre coût.</p>
        </div>
        <div class="feature">
          <img src="@/assets/image1.png" alt="Eco-friendly" class="feature-icon" />
          <h3>Respect de la planète</h3>
          <p>Réduisez votre empreinte carbone grâce à nos solutions.</p>
        </div>
        <div class="feature">
          <img src="@/assets/image2.png" alt="Facile" class="feature-icon" />
          <h3>Réservation simplifiée</h3>
          <p>Organisez vos voyages rapidement et sans stress.</p>
        </div>
      </div>
    </section>
  </div>
  <Footer></Footer>
</template>

<script>
import Hebergement from './Hebergement.vue';
import Header from '../components/Header.vue';
import Footer from '../components/footer.vue';

export default {
 
  name: 'Home',
  components: {
    Hebergement,
    Header,
    Footer
  }
};
</script>

<style scoped>

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



.hero {
  background: url('@/assets/image5.webp') no-repeat center center/cover;
  border-bottom-left-radius: 50% 20px;
  border-bottom-right-radius: 50% 20px;
  padding: 100px 20px;
  text-align: center;
  color: white;
}

.hero-content h1 {
  font-size: 3rem;
}

.search-section {
  background-color: #ffffff;
  padding: 20px;
  text-align: center;
}

.search-box {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.search-btn {
  background-color: #004d40;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
</style>
