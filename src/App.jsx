import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import CodingProfiles from './components/sections/CodingProfiles';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import ClickSpark from './components/ui/ClickSpark';
import SpotlightCursor from './components/ui/SpotlightCursor';
import SectionStack from './components/layout/SectionStack';

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
