import React, { useState } from 'react';
import { RSVPModal } from './RSVPModal';
import { DeclineModal } from './DeclineModal';
import './RSVPSection.css';

export const RSVPSection: React.FC = () => {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);

  return (
    <>
      <section className="rsvp-section section">
        <div className="rsvp-content">
          <h2 className="section-title text-gradient-purple">¿Vas a venir?</h2>
          
          <p className="rsvp-description">
            Confirmá tu asistencia para que te guarde un lugar.
          </p>

          <div className="rsvp-buttons">
            <button onClick={() => setIsRSVPModalOpen(true)} className="btn-primary">
              Confirmar Asistencia
            </button>

            <button onClick={() => setIsDeclineModalOpen(true)} className="btn-decline-rsvp">
              No puedo ir
            </button>
          </div>

          <p className="rsvp-hint">Hacé click para confirmar</p>
        </div>
      </section>

      <RSVPModal isOpen={isRSVPModalOpen} onClose={() => setIsRSVPModalOpen(false)} />
      <DeclineModal isOpen={isDeclineModalOpen} onClose={() => setIsDeclineModalOpen(false)} />
    </>
  );
};
