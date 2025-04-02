import React from 'react';
import HeroSection from './components/HeroSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import UploadSection from './components/UploadSection.jsx';
import Footer from './components/Footer.jsx';
import Navbar from './components/Header.jsx';

import './App.css'; 

function App() {
  return (
    <> 
      <Navbar />
      <div id="home">
        <HeroSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="peel-now">
        <UploadSection />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </>
  );
}

export default App;