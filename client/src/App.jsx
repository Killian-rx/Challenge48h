import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ShieldX, Skull, AlertTriangle, ShieldOff, Siren } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Challenge1 from './pages/Challenge1';
import Hidden from './pages/Hidden';
import FinalStep from './pages/FinalStep';
import Validate from './pages/Validate';
import Admin from './pages/Admin';
import { useTimer } from './context/TimerContext';
import GlowCard from './components/GlowCard';
import PageTransition from './components/PageTransition';

const URGENCY_SEEN_KEY = 'breach_urgency_seen';

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
      <div className={`absolute inset-0 transition-opacity duration-300 ${flicker ? 'bg-red-950/40' : 'bg-black/95'}`} />
      <div className="relative z-10 max-w-lg mx-4 p-8 rounded-2xl bg-gray-950 border border-cyber-red/40 shadow-[0_0_80px_rgba(255,51,102,0.25)]">
        <div className="text-center">
          <div className="animate-pulse-glow mb-5">
            <Skull className="w-20 h-20 text-cyber-red mx-auto" />
          </div>
          
          <h2 className="font-mono text-3xl sm:text-4xl font-black text-cyber-red mb-3" style={{ textShadow: '0 0 40px rgba(255,50,50,0.6)' }}>
            TEMPS ÉCOULÉ
          </h2>

          <p className="font-mono text-sm text-gray-300 leading-relaxed max-w-md mx-auto mb-5">
            L'attaquant a terminé son exfiltration. Votre fenêtre d'intervention est fermée.
            Les données compromises sont désormais hors de portée.
          </p>

          <div className="p-4 rounded-lg border border-cyber-red/30 bg-cyber-red/10 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShieldX className="w-5 h-5 text-cyber-red" />
              <span className="font-mono text-sm text-cyber-red font-bold">MISSION ÉCHOUÉE</span>
            </div>
            <p className="font-mono text-xs text-gray-400">
              Connexion au serveur C2 perdue. SPECTER a quitté la zone.
            </p>
          </div>

          <button
            onClick={() => setVisible(false)}
            className="px-8 py-2.5 rounded-lg border border-cyber-red/30 bg-cyber-red/10
              text-cyber-red font-mono text-xs font-bold tracking-wider
              hover:bg-cyber-red/20 transition-colors cursor-pointer"
          >
            FERMER
          </button>
        </div>
      </div>
    </div>
  );
}

function UrgencyOverlay() {
  const { remaining, running, stopped } = useTimer();
  const [visible, setVisible] = useState(false);
  const [triggered, setTriggered] = useState(() => localStorage.getItem(URGENCY_SEEN_KEY) === '1');
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (running && !stopped && !triggered && remaining <= 5 * 60 && remaining > 0) {
      setTriggered(true);
      localStorage.setItem(URGENCY_SEEN_KEY, '1');
      setVisible(true);
      const flashInterval = setInterval(() => setFlash((p) => !p), 200);
      setTimeout(() => clearInterval(flashInterval), 3000);
      return () => clearInterval(flashInterval);
    }
  }, [remaining, running, stopped, triggered]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center">
      <div className={`absolute inset-0 transition-opacity duration-200 ${flash ? 'bg-yellow-950/30' : 'bg-black/95'}`} />
      <div className="relative z-10 max-w-md mx-4 p-8 rounded-2xl bg-gray-950 border border-cyber-yellow/40 shadow-[0_0_80px_rgba(255,215,0,0.2)]">
        <div className="text-center">
          <Siren className="w-16 h-16 text-cyber-yellow mx-auto mb-4 animate-pulse-glow" />

          <h2 className="font-mono text-2xl sm:text-3xl font-black text-cyber-yellow mb-3" style={{ textShadow: '0 0 30px rgba(255,200,50,0.5)' }}>
            ALERTE TEMPORELLE
          </h2>

          <p className="font-mono text-sm text-gray-300 leading-relaxed mb-5">
            Il ne vous reste que <span className="text-cyber-red font-bold">5 minutes</span>.
            SPECTER est en train de couvrir ses traces.
          </p>

          <div className="p-4 rounded-lg border border-cyber-yellow/30 bg-cyber-yellow/10 mb-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-full bg-gray-800 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-cyber-yellow to-cyber-red h-2.5 rounded-full" style={{ width: '80%' }} />
              </div>
              <span className="font-mono text-xs text-cyber-red font-bold shrink-0">80%</span>
            </div>
            <p className="font-mono text-[11px] text-gray-400 mt-2">
              Exfiltration de SPECTER
            </p>
          </div>

          <button
            onClick={() => setVisible(false)}
            className="px-8 py-2.5 rounded-lg border border-cyber-yellow/30 bg-cyber-yellow/10
              text-cyber-yellow font-mono text-xs font-bold tracking-wider
              hover:bg-cyber-yellow/20 transition-colors cursor-pointer"
          >
            COMPRIS — CONTINUER
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
      <UrgencyOverlay />
      <ExpiredOverlay />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenge-1" element={<Challenge1 />} />
          <Route path="/hidden" element={<Hidden />} />
          <Route path="/final-step" element={<ProtectedFinalStep />} />
          <Route path="/validate" element={<Validate />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </div>
  );
}
