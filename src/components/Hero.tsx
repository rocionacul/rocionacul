import React from 'react';
import './Hero.css';
import bitmoji from '../assets/bitmoji_jump_ezgif.gif';

export const Hero: React.FC = () => {
  const scrollToInfo = () => {
    const element = document.getElementById('event-info');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero section">
      <div className="hero-bg">
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
      </div>

      <div className="hero-content animate-fade-in">
        <div className="hero-bitmoji">
          <img src={bitmoji} alt="Saltando" className="bitmoji-img" />
        </div>

        <h1 className="hero-title animate-slide-up">
          <span className="text-gradient-purple">¡Estás Invitada!</span>
          <span className="hero-subtitle-alt">o invitado, en su defecto</span>

        </h1>
        
        
        <p className="hero-subtitle">
          Vení a celebrar mis 30 ✨
        </p>

        <p className="hero-rsvp-notice">
          ⚠️ Confirmá tu asistencia más abajo - Necesito orden
        </p>

        <button onClick={scrollToInfo} className="hero-scroll animate-bounce" aria-label="Ver detalles del evento">
          <span className="scroll-text">Scrolleá para ver más</span>
          <svg className="scroll-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
};
