import React, { useState } from 'react';
import { Playlist } from './Playlist';
import { VibesParty } from './VibesParty';
import './VibesSection.css';

export const VibesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dresscode' | 'fiesta'>('dresscode');

  return (
    <section id="playlist" className="vibes-section section">
      <div className="container">
        <h2 className="section-title text-gradient-purple">Vibes</h2>

        <div className="vibes-tabs">
          <button
            type="button"
            className={`vibes-tab-button ${activeTab === 'dresscode' ? 'active' : ''}`}
            onClick={() => setActiveTab('dresscode')}
          >
            Vibes del Dress Code
          </button>
          <button
            type="button"
            className={`vibes-tab-button ${activeTab === 'fiesta' ? 'active' : ''}`}
            onClick={() => setActiveTab('fiesta')}
          >
            Vibes de la Fiesta
          </button>
        </div>

        <div className="vibes-tab-content">
          {activeTab === 'dresscode' && <Playlist embedded />}
          {activeTab === 'fiesta' && <VibesParty embedded />}
        </div>
      </div>
    </section>
  );
};
