import React, { useState } from 'react';
import './DressCode.css';
import emoVideo from '../assets/emo-video.mp4';
import twilightVideo from '../assets/twilight-video.mp4';

export const DressCode: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'emo' | 'twilight'>('emo');

  const scrollToPlaylist = () => {
    const element = document.getElementById('playlist');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="dress-code section">
      <div className="container">
        <h2 className="section-title text-gradient-purple">Dress Code</h2>
        
        <p className="dress-code-intro">
          ¡Elegí tu estética para la tarde!
        </p>

        {/* Tabs - Solo visible en mobile */}
        <div className="dress-code-tabs">
          <button
            className={`tab-button ${activeTab === 'emo' ? 'active' : ''}`}
            onClick={() => setActiveTab('emo')}
          >
            🖤 Emo
          </button>
          <button
            className={`tab-button ${activeTab === 'twilight' ? 'active' : ''}`}
            onClick={() => setActiveTab('twilight')}
          >
            🌙 Twilight
          </button>
        </div>

        <div className="dress-code-grid">
          {/* Columna 1: Videos */}
          <div className="video-column">
            {/* Video Emo */}
            <div className={`dress-code-video card ${activeTab === 'emo' ? 'active' : ''}`}>
              <video
                className="video-player"
                controls
                playsInline
                preload="metadata"
              >
                <source src={emoVideo} type="video/mp4" />
                Tu navegador no soporta video HTML5.
              </video>
            </div>

            {/* Video Twilight */}
            <div className={`dress-code-video card ${activeTab === 'twilight' ? 'active' : ''}`}>
              <video
                className="video-player"
                controls
                playsInline
                preload="metadata"
              >
                <source src={twilightVideo} type="video/mp4" />
                Tu navegador no soporta video HTML5.
              </video>
            </div>
          </div>

          {/* Columna 2: Tarjetas */}
          <div className="cards-column">
            {/* Tarjeta Emo */}
            <div className={`dress-code-card card ${activeTab === 'emo' ? 'active' : ''}`}>
              <div className="dress-code-icon">🖤</div>
              
              <h3 className="dress-code-title">Emo</h3>
              
              <ul className="dress-code-list">
                <li>Ropa negra, remeras de bandas, jeans negros</li>
                <li>Maquillaje oscuro, delineador para todxs</li>
                <li>Converse, Vans o borcegos</li>
                <li>Pelo lacio, flequillo de costado</li>
              </ul>

              <div className="dress-code-quote">
                <p>"It's not a phase, mom"</p>
              </div>
            </div>

            {/* Tarjeta Twilight */}
            <div className={`dress-code-card card ${activeTab === 'twilight' ? 'active' : ''}`}>
              <div className="dress-code-icon">🌙</div>
              
              <h3 className="dress-code-title">Twilight</h3>
              
              <ul className="dress-code-list">
              <li>Gris o plateado (como día nublado en Forks)</li>
                <li>Brillitos sutiles como Edward al sol</li>
                <li>Baseball core aprobado</li>
                <li>No aceptamos Jacob Blacks</li>
              </ul>

              <div className="dress-code-quote">
                <p>"This is the skin of a killer, Bella"</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dress-code-footer">
          <p>¿No te decidís? Vestite con algo que me guste o represente✨</p>
        </div>

        <button onClick={scrollToPlaylist} className="dress-code-scroll animate-bounce" aria-label="Ver mas inspiracion">
          <span className="scroll-text">+ inspo</span>
          <svg className="scroll-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
};
