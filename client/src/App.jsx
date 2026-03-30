import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ShieldX, Skull, AlertTriangle, ShieldOff } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Challenge1 from './pages/Challenge1';
import Hidden from './pages/Hidden';
import FinalStep from './pages/FinalStep';
import Validate from './pages/Validate';
import { useTimer } from './context/TimerContext';
import GlowCard from './components/GlowCard';

function ExpiredOverlay() {
  const { expired, stopped } = useTimer();
  const [visible, setVisible] = useState(false);
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    if (expired && !stopped) {
      setVisible(true);
      const flickerInterval = setInterval(() => {
        setFlicker((prev) => !prev);
      }, 150);
      setTimeout(() => clearInterval(flickerInterval), 2000);
      return () => clearInterval(flickerInterval);
    }
  }, [expired, stopped]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className={`absolute inset-0 transition-opacity duration-300 ${flicker ? 'bg-cyber-red/20' : 'bg-black/90'}`} />
      <div className="relative z-10 max-w-lg mx-4 text-center">
        <div className="animate-pulse-glow mb-6">
          <Skull className="w-24 h-24 text-cyber-red mx-auto" />
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyber-red/50 bg-cyber-red/10">
            <AlertTriangle className="w-4 h-4 text-cyber-red" />
            <span className="font-mono text-xs text-cyber-red tracking-wider animate-pulse">ALERTE CRITIQUE</span>
          </div>

          <h2 className="font-mono text-3xl sm:text-4xl font-black text-cyber-red" style={{ textShadow: '0 0 30px rgba(255,50,50,0.5)' }}>
            TEMPS ÉCOULÉ
          </h2>

          <p className="font-mono text-sm text-gray-400 leading-relaxed max-w-md mx-auto">
            L'attaquant a terminé son exfiltration. Votre fenêtre d'intervention est fermée.
            Les données compromises sont désormais hors de portée.
          </p>

          <div className="mt-6 p-4 rounded-lg border border-cyber-red/30 bg-cyber-red/5">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShieldX className="w-5 h-5 text-cyber-red" />
              <span className="font-mono text-sm text-cyber-red font-bold">MISSION ÉCHOUÉE</span>
            </div>
            <p className="font-mono text-xs text-gray-500">
              Connexion au serveur C2 perdue. SPECTER a quitté la zone.
            </p>
          </div>

          <button
            onClick={() => setVisible(false)}
            className="mt-4 px-6 py-2 rounded-lg border border-gray-700 text-gray-500 font-mono text-xs
              hover:border-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
          >
            FERMER
          </button>
        </div>
      </div>
    </div>
  );
}

function ProtectedFinalStep() {
  const unlocked = localStorage.getItem('breach_portal_unlocked');
  if (!unlocked) return <Navigate to="/hidden" replace />;
  return <FinalStep />;
}

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <ShieldOff className="w-20 h-20 text-cyber-red/40 mx-auto mb-6" />
        <h2 className="font-mono text-2xl font-black text-cyber-red mb-2" style={{ textShadow: '0 0 20px rgba(255,50,50,0.3)' }}>
          SECTEUR INTROUVABLE
        </h2>
        <p className="font-mono text-sm text-gray-500 mb-6">
          Ce nœud n'existe pas sur le réseau compromis. Vérifiez vos coordonnées.
        </p>
        <GlowCard glow="none" hover={false}>
          <div className="font-mono text-xs text-gray-600 space-y-1">
            <p>$ ping secteur... <span className="text-cyber-red">TIMEOUT</span></p>
            <p>$ traceroute... <span className="text-cyber-red">DESTINATION INACCESSIBLE</span></p>
            <p>$ nslookup... <span className="text-cyber-red">NXDOMAIN</span></p>
          </div>
        </GlowCard>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-2 rounded-lg border border-gray-700 text-gray-400 font-mono text-xs
            hover:border-cyber-green/50 hover:text-cyber-green transition-colors cursor-pointer"
        >
          RETOUR
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <ExpiredOverlay />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenge-1" element={<Challenge1 />} />
        <Route path="/hidden" element={<Hidden />} />
        <Route path="/final-step" element={<ProtectedFinalStep />} />
        <Route path="/validate" element={<Validate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
