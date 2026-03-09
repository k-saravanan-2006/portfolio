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
import ClickSpark from './components/ClickSpark';
import SpotlightCursor from './components/SpotlightCursor';
import SectionStack from './components/SectionStack';

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 50,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <ClickSpark
      sparkColor='#00e5cc'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="light-spots"></div>
      <Header />
      <main>
        <SectionStack>
          <Hero />
          <CodingProfiles />
          <Experience />
          <Projects />
          <Skills />
          <About />
          <Contact />
        </SectionStack>
      </main>
      <SpotlightCursor />
    </ClickSpark>
  );
}

export default App;
