import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, ShieldAlert, Skull } from 'lucide-react';
import GlowCard from '../components/GlowCard';
import { useTimer } from '../context/TimerContext';

export default function Admin() {
  const navigate = useNavigate();
  const { penalize } = useTimer();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [trapped, setTrapped] = useState(false);
  const [penalized, setPenalized] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = attempts + 1;
    setAttempts(next);

    if (next >= 3) {
      setTrapped(true);
      if (!penalized) {
        penalize(90);
        setPenalized(true);
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 font-mono text-xs text-gray-600 hover:text-gray-400 transition-colors cursor-pointer mb-6"
        >
          <ArrowLeft className="w-3 h-3" /> Retour
        </button>

        {trapped ? (
          <div className="text-center">
            <div className="mb-6 animate-pulse-glow">
              <Skull className="w-20 h-20 text-cyber-red mx-auto" />
            </div>
            <h2
              className="font-mono text-2xl font-black text-cyber-red mb-3 animate-flicker"
              style={{ textShadow: '0 0 30px rgba(255,50,50,0.5)' }}
            >
              HONEYPOT ACTIVÉ
            </h2>
            <GlowCard glow="red" hover={false}>
              <div className="font-mono text-xs space-y-2 text-gray-400">
                <p className="text-cyber-red font-bold">[ALERTE] Votre IP a été journalisée.</p>
                <p>Ce portail n'est pas un véritable point d'accès. C'est un piège
                  conçu par l'équipe de défense pour identifier les intrus.</p>
                <p className="text-gray-600 mt-3">
                  Vous avez perdu <span className="text-cyber-red">1min 30s</span> de temps précieux.
                </p>
                <p className="text-gray-600">
                  L'enquête se trouve ailleurs. Retournez sur vos pas.
                </p>
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
        ) : (
          <>
            <div className="text-center mb-8">
              <Lock className="w-12 h-12 text-cyber-yellow/50 mx-auto mb-4" />
              <h2 className="font-mono text-xl font-bold text-white mb-1">
                PANNEAU D'ADMINISTRATION
              </h2>
              <p className="font-mono text-xs text-gray-500">
                Accès restreint — Authentification requise
              </p>
            </div>

            <GlowCard glow="yellow" hover={false}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs text-gray-400 mb-1.5">IDENTIFIANT</label>
                  <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="w-full bg-gray-950/80 border border-gray-700 rounded-md px-3 py-2.5
                      font-mono text-sm text-gray-200 placeholder-gray-600
                      focus:outline-none focus:border-cyber-yellow/50 focus:ring-1 focus:ring-cyber-yellow/20"
                    placeholder="admin"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-gray-400 mb-1.5">MOT DE PASSE</label>
                  <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className="w-full bg-gray-950/80 border border-gray-700 rounded-md px-3 py-2.5
                      font-mono text-sm text-gray-200 placeholder-gray-600
                      focus:outline-none focus:border-cyber-yellow/50 focus:ring-1 focus:ring-cyber-yellow/20"
                    placeholder="••••••••"
                    autoComplete="off"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-cyber-yellow/10 border border-cyber-yellow/30
                    text-cyber-yellow font-mono text-xs font-bold tracking-wider
                    hover:bg-cyber-yellow/20 transition-colors cursor-pointer"
                >
                  CONNEXION
                </button>
              </form>

              {attempts > 0 && attempts < 3 && (
                <div className="mt-3 flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-cyber-yellow" />
                  <p className="font-mono text-[11px] text-cyber-yellow">
                    Identifiants invalides. Tentative {attempts}/3.
                  </p>
                </div>
              )}
            </GlowCard>

            <p className="text-center font-mono text-[10px] text-gray-700 mt-4">
              Système de surveillance actif — Toute tentative est enregistrée.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
