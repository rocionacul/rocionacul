import React from 'react';
import './DressCode.css';
import emoVideo from '../assets/emo-video.mp4';
import twilightVideo from '../assets/twilight-video.mp4';

export const DressCode: React.FC = () => {
  return (
    <section className="dress-code section">
      <div className="container">
        <h2 className="section-title text-gradient-purple">Dress Code</h2>
        
        <p className="dress-code-intro">
          ¡Elegí tu estética para la tarde!
        </p>

        <div className="dress-code-grid">
          {/* Columna 1: Videos */}
          <div className="video-column">
            {/* Video Emo */}
            <div className="dress-code-video card">
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
            <div className="dress-code-video card">
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
            <div className="dress-code-card card">
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
            <div className="dress-code-card card">
              <div className="dress-code-icon">🌙</div>
              
              <h3 className="dress-code-title">Twilight</h3>
              
              <ul className="dress-code-list">
                <li>Vampiro chic: ropa oscura y elegante</li>
                <li>Bordó, violetas oscuros, negros</li>
                <li>Brillitos (sutiles)</li>
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
      </div>
    </section>
  );
};
