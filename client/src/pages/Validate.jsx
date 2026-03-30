import { useState } from 'react';
import { ShieldCheck, ShieldX, KeyRound, Sparkles, TriangleAlert } from 'lucide-react';
import GlowCard from '../components/GlowCard';

export default function Validate() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shakeError, setShakeError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() }),
      });
      const data = await res.json();
      setResult(data);
      if (!data.success) {
        setShakeError(true);
        setTimeout(() => setShakeError(false), 600);
      }
    } catch {
      setResult({ success: false, message: 'Connexion au serveur perdue. Réessayez.' });
      setShakeError(true);
      setTimeout(() => setShakeError(false), 600);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto flex flex-col items-center justify-center">
      <div className="w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-green/30 bg-cyber-green/5 mb-4">
            <KeyRound className="w-3.5 h-3.5 text-cyber-green" />
            <span className="font-mono text-xs text-cyber-green tracking-wider">TERMINAL DE VALIDATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Soumettre le code d'accès</h2>
          <p className="text-sm text-gray-400">
            L'investigation touche à sa fin. Si vous avez trouvé ce que l'attaquant cachait,
            soumettez votre réponse.
          </p>
        </div>

        <GlowCard glow={result?.success ? 'green' : 'blue'} hover={false} className="mb-6">
          <form onSubmit={handleSubmit}>
            <label className="block font-mono text-xs text-gray-500 tracking-wider mb-3">
              CODE D'ACCÈS FINAL
            </label>
            <div className={`flex gap-3 ${shakeError ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
              style={shakeError ? { animation: 'shake 0.5s ease-in-out' } : {}}
            >
              <input
                type="text"
                value={code}
                onChange={(e) => { setCode(e.target.value); setResult(null); }}
                placeholder="Entrez votre réponse..."
                className="flex-1 bg-gray-950/80 border border-gray-700 rounded-lg px-4 py-3
                  font-mono text-sm text-gray-200 placeholder-gray-600
                  focus:outline-none focus:border-cyber-green/50 focus:ring-1 focus:ring-cyber-green/20
                  transition-colors"
                autoFocus
                disabled={result?.success}
              />
              <button
                type="submit"
                disabled={loading || result?.success || !code.trim()}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyber-green/20 to-cyber-blue/20
                  border border-cyber-green/30 hover:border-cyber-green/60
                  text-cyber-green font-mono font-semibold text-sm tracking-wider
                  transition-all duration-300 glow-green
                  disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? 'VALIDATION...' : 'SOUMETTRE'}
              </button>
            </div>
          </form>

          {result?.success && (
            <div className="mt-6 p-6 rounded-xl border border-cyber-green/30 bg-cyber-green/5 text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <ShieldCheck className="w-16 h-16 text-cyber-green" />
                  <Sparkles className="w-6 h-6 text-cyber-yellow absolute -top-1 -right-1 animate-pulse-glow" />
                </div>
              </div>
              <h3 className="font-mono text-2xl font-black text-cyber-green text-glow-green mb-2">
                ACCÈS AUTORISÉ
              </h3>
              <p className="text-sm text-gray-400 mb-4">{result.message}</p>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <p className="font-mono text-xs text-gray-600">
                  Investigation terminée. Localisation confirmée. Bien joué.
                </p>
              </div>
            </div>
          )}

          {result && !result.success && (
            <div className="mt-4 p-4 rounded-lg border border-cyber-red/30 bg-cyber-red/5">
              <div className="flex items-start gap-3">
                <ShieldX className="w-5 h-5 text-cyber-red mt-0.5" />
                <div>
                  <p className="font-mono text-sm text-cyber-red font-semibold">ACCÈS REFUSÉ</p>
                  <p className="text-xs text-gray-400 mt-1">{result.message}</p>
                </div>
              </div>
            </div>
          )}
        </GlowCard>

        <GlowCard glow="none" hover={false}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-4 h-4 text-cyber-yellow" />
              <span className="font-mono text-xs text-gray-500">
                {result?.success
                  ? 'Statut investigation : TERMINÉE'
                  : 'Statut investigation : EN COURS'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${result?.success ? 'bg-cyber-green' : 'bg-cyber-yellow animate-pulse-glow'}`} />
              <span className="font-mono text-[10px] text-gray-600">
                {result?.success ? 'RÉSOLU' : 'ACTIF'}
              </span>
            </div>
          </div>
        </GlowCard>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
