<template>
    <footer class="footer">
      <div class="container">
        <!-- Logo & Message -->
        <div class="footer-header">
          <h2 class="logo">EcoNomade</h2>
          <p class="slogan">
            Nous contribuons à un tourisme plus responsable, positif et joyeux.<br />
            Mettez du cœur dans vos évasions !
          </p>
        </div>
  
        <!-- Sections du footer -->
        <div class="footer-content">
          <!-- FairMoove Invest -->
          <div class="footer-section">
            <h3>EcoNomade INVEST</h3>
            <div class="separator"></div>
            <ul>
              <li><a href="#">Découvrir les projets</a></li>
            </ul>
          </div>
  
          <!-- Voyages de groupe -->
          <div class="footer-section">
            <h3>Voyages de groupe et événements</h3>
            <div class="separator"></div>
            <ul>
              <li><a href="#">CSE</a></li>
              <li><a href="#">MICE & événements</a></li>
            </ul>
          </div>
  
          <!-- Partenaires -->
          <div class="footer-section">
            <h3>Partenaires</h3>
            <div class="separator"></div>
            <ul>
              <li><a href="#">Partenaires voyage</a></li>
       
              <li><a href="#">Devenir affilié</a></li>
            </ul>
          </div>
  
          <!-- Recrutement -->
          <div class="footer-section">
            <h3>Recrutement</h3>
            <div class="separator"></div>
            <ul>
            
              <li><a href="#">Testeurs de voyages</a></li>
            </ul>
          </div>
        </div>
  
        <!-- Réseaux sociaux -->
        <div class="footer-social">
          <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-linkedin"></i></a>
        </div>
      </div>
    </footer>
  </template>
  
  <style scoped>
  /* Styles généraux */
  .footer {
    background-color: #4CAF50;             
    color: white;
    padding: 50px 20px;
    text-align: center;
  }
  
  /* Conteneur */
  .container {
    max-width: 1200px;
    margin: auto;
  }
  
  /* Logo & Message */
  .footer-header .logo {
    font-size: 28px;
    font-weight: bold;
  }
  
  .footer-header .slogan {
    margin-top: 10px;
    font-size: 16px;
  }
  
  /* Contenu du footer */
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 30px;
  }
  
  /* Sections */
  .footer-section {
    width: 200px;
    text-align: left;
  }
  
  .footer-section h3 {
    font-size: 18px;
  }
  
  .separator {
    width: 50px;
    height: 2px;
    background-color: white;
    margin: 8px 0;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-section ul li {
    margin: 8px 0;
  }
  
  .footer-section ul li a {
    color: white;
    text-decoration: none;
  }
  
  .footer-section ul li a:hover {
    text-decoration: underline;
  }
  
  /* Réseaux sociaux */
  .footer-social {
    margin-top: 30px;
  }
  
  .social-icon {
    font-size: 24px;
    color: white;
    margin: 0 10px;
    text-decoration: none;
  }
  
  .social-icon:hover {
    opacity: 0.8;
  }
  </style>
  