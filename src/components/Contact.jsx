import React, { useState } from 'react';
import { GithubLogo, TwitterLogo, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react';

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
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20 items-center">
          <div data-aos="fade-right" data-aos-duration="1000">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.1] mb-6 tracking-tight">
              Let's build something <br />
              <span className="text-[var(--color-brand-glow)] drop-shadow-[0_0_20px_rgba(216,236,248,0.5)]">extraordinary.</span>
            </h2>
            <p className="text-[1.1rem] text-[var(--text-secondary)] mb-10 max-w-[600px]">
              Available for freelance opportunities and exciting projects.
            </p>
            <div className="flex gap-6 mt-8">
              {[GithubLogo, TwitterLogo, LinkedinLogo, EnvelopeSimple].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-[5px] text-2xl transition-all duration-300 hover:bg-[var(--color-brand-glow)] hover:text-[#05060f] hover:shadow-[0_0_20px_var(--color-brand-glow)] hover:-translate-y-[5px]"
                  data-aos="zoom-in" 
                  data-aos-delay={300 + idx * 100}
                >
                  <Icon weight="fill" />
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
                <input 
                  type="text" 
                  required 
                  placeholder="Your Name" 
                  className="w-full p-4 bg-black/20 border border-[var(--glass-border)] rounded-xl text-white font-inherit text-base outline-none transition-all duration-300 focus:border-[var(--color-brand-glow)] focus:bg-[rgba(216,236,248,0.05)] focus:shadow-[0_0_15px_rgba(216,236,248,0.1)]"
                />
              </div>
              <div className="mb-6" data-aos="fade-up" data-aos-delay="500">
                <input 
                  type="email" 
                  required 
                  placeholder="Your Email" 
                  className="w-full p-4 bg-black/20 border border-[var(--glass-border)] rounded-xl text-white font-inherit text-base outline-none transition-all duration-300 focus:border-[var(--color-brand-glow)] focus:bg-[rgba(216,236,248,0.05)] focus:shadow-[0_0_15px_rgba(216,236,248,0.1)]"
                />
              </div>
              <div className="mb-6" data-aos="fade-up" data-aos-delay="600">
                <textarea 
                  rows="4" 
                  required 
                  placeholder="Your Message" 
                  className="w-full p-4 bg-black/20 border border-[var(--glass-border)] rounded-xl text-white font-inherit text-base outline-none transition-all duration-300 focus:border-[var(--color-brand-glow)] focus:bg-[rgba(216,236,248,0.05)] focus:shadow-[0_0_15px_rgba(216,236,248,0.1)] resize-y"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className={`glow-btn w-full transition-transform duration-200 ${btnState === 'sending' ? 'scale-95' : btnState === 'sent' ? 'scale-105 shadow-[0_0_40px_var(--color-brand-glow)] !bg-[#4BB543] !text-white' : ''}`}
                data-aos="fade-up" 
                data-aos-delay="700"
              >
                {btnState === 'idle' && 'Send Message'}
                {btnState === 'sending' && 'Sending...'}
                {btnState === 'sent' && 'Message Sent!'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
