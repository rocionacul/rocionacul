import React from 'react';
import './EventInfo.css';

export const EventInfo: React.FC = () => {
  return (
    <section id="event-info" className="event-info section">
      <div className="container">
        <h2 className="section-title text-gradient-purple">Detalles del Evento</h2>

        <div className="event-grid">
          <div className="event-card card">
            <div className="event-card-content">
              <svg className="event-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="event-card-title">Cuando</h3>
              <p className="event-card-text">Sabado 21 de Marzo</p>
              <p className="event-card-subtext">18:00 - 21:00 hs</p>
            </div>
          </div>

          <div className="event-card card">
            <div className="event-card-content">
              <svg className="event-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="event-card-title">Donde</h3>
              <p className="event-card-text">🤸 Jummpark 🤸</p>
              <p className="event-card-subtext">
                <a 
                  href="https://maps.app.goo.gl/M3b7scpnvpXjX1HR9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="maps-link"
                >
                  📍 24 de Septiembre 2150
                </a>
              </p>
              <p className="event-card-subtext">Concepcion, Tucuman</p>
              <p className="event-card-subtext">
                <a 
                  href="https://instagram.com/jummpark.tuc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="instagram-link"
                >
                  @jummpark.tuc
                </a>
              </p>
            </div>
          </div>

          <div className="event-card card">
            <div className="event-card-content">
              <svg className="event-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="event-card-title">Vibe</h3>
              <p className="event-card-text">Saltos, Musica & Diversion</p>
              <p className="event-card-subtext">Comida & Bebidas (sin alcohol) incluidas</p>
            </div>
          </div>
        </div>

        <div className="event-footer">
          <p>Desliza para reservar tu asistencia! 🎊</p>
        </div>
      </div>
    </section>
  );
};
