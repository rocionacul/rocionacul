import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { EventInfo } from './components/EventInfo';
import { RSVPSection } from './components/RSVPSection';
import { DressCode } from './components/DressCode';
import { Playlist } from './components/Playlist';
import { GuestList } from './components/GuestList';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal - Landing page */}
        <Route path="/" element={
          <div className="app">
            <Hero />
            <EventInfo />
            <RSVPSection />
            <DressCode />
            <Playlist />
            
            <footer className="footer">
              <p>Made by hoolab - Do not test this site</p>
            </footer>
          </div>
        } />

        {/* Ruta oculta - Lista de invitados */}
        <Route path="/guests" element={<GuestList />} />
      </Routes>
    </Router>
  );
}

export default App;
