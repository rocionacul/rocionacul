import { Hero } from './components/Hero';
import { EventInfo } from './components/EventInfo';
import { RSVPSection } from './components/RSVPSection';
import { DressCode } from './components/DressCode';
import './App.css';

function App() {
  return (
    <div className="app">
      <Hero />
      <EventInfo />
      <RSVPSection />
      <DressCode />
      
      <footer className="footer">
        <p>Made by hoolab</p>
      </footer>
    </div>
  );
}

export default App;
