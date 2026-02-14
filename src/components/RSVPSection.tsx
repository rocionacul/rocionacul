import React, { useState } from 'react';
import { RSVPModal } from './RSVPModal';
import './RSVPSection.css';

export const RSVPSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="rsvp-section section">
        <div className="rsvp-content">
          <h2 className="section-title text-gradient-purple">¿Vas a venir?</h2>
          
          <p className="rsvp-description">
            Confirmá tu asistencia para que te guarde un lugar.
          </p>

          <button onClick={() => setIsModalOpen(true)} className="btn-primary">
            Confirmar Asistencia
          </button>

          <p className="rsvp-hint">Hacé click para confirmar</p>
        </div>
      </section>

      <RSVPModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
