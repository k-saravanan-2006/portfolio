import React, { useState } from 'react';
import { GithubLogo, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react';
import Squares from '../ui/Squares';
import AnimatedInput from '../ui/AnimatedInput';
import AnimatedContactButton from '../ui/AnimatedContactButton';
import Ticker from '../layout/Ticker';
import Footer from '../layout/Footer';

export default function Contact() {
  const [btnState, setBtnState] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnState('sending');
    setTimeout(() => {
      setBtnState('sent');
      e.target.reset();
      setTimeout(() => setBtnState('idle'), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="min-h-screen w-full relative overflow-hidden bg-black flex flex-col pt-20">
      <div className="absolute inset-0 z-0">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#00b474"
          hoverFillColor="#00e5cc"
        />
      </div>
      <div className="container mx-auto px-4 sm:px-8 max-w-[1200px] w-full relative z-10 pointer-events-none flex-1 flex flex-col justify-center pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20 items-center pointer-events-auto">
          <div data-aos="fade-right" data-aos-duration="1000">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.1] mb-6 tracking-tight">
              Let's build something <br />
              <span className="text-[var(--color-brand-glow)] drop-shadow-[0_0_20px_rgba(216,236,248,0.5)]">extraordinary.</span>
            </h2>
            <p className="text-[1.1rem] text-[var(--text-secondary)] mb-10 max-w-[600px]">
              Available for freelance opportunities and exciting projects.
            </p>
            <div className="flex gap-6 mt-8">
              {[
                { Icon: GithubLogo, href: 'https://github.com/k-saravanan-2006' },
                { Icon: LinkedinLogo, href: 'https://www.linkedin.com/in/k-saravanan-14b03132a/' },
                { Icon: EnvelopeSimple, href: 'mailto:saravanankumar8285@gmail.com' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-[5px] text-2xl text-white transition-all duration-300 hover:bg-[rgb(0,180,166)] hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.4)] hover:-translate-y-[5px]"
                  data-aos="zoom-in"
                  data-aos-delay={300 + idx * 100}
                >
                  <item.Icon weight="fill" />
                </a>
              ))}
            </div>
          </div>
          <div
            className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-3xl p-12 backdrop-blur-[15px] shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-6" data-aos="fade-up" data-aos-delay="400">
                <AnimatedInput
                  type="text"
                  required
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-6" data-aos="fade-up" data-aos-delay="500">
                <AnimatedInput
                  type="email"
                  required
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-6" data-aos="fade-up" data-aos-delay="600">
                <AnimatedInput
                  as="textarea"
                  rows="4"
                  required
                  placeholder="Your Message"
                />
              </div>
              <AnimatedContactButton btnState={btnState} />
            </form>
          </div>
        </div>
      </div>

      <div className="w-full relative z-10 pointer-events-auto mt-auto">
        <Ticker />
        <Footer />
      </div>
    </section>
  );
}
