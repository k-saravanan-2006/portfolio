import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from './components/Header';
import Hero from './components/Hero';
import CodingProfiles from './components/CodingProfiles';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import Ticker from './components/Ticker';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 50,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <>
      <div className="light-spots"></div>
      <Header />
      <main>
        <Hero />
        <CodingProfiles />
        <Experience />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Ticker />
      <Footer />
    </>
  );
}

export default App;
