import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import AIGenerator from './components/AIGenerator';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import './App.css';
import Authform from "./components/Authform"

function App() {
  return (
    <div className="App">
      {/* <Header />
      <Hero />
      <Features />
      <AIGenerator />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <Footer /> */}
      <Authform/>
    </div>
  );
}

export default App;