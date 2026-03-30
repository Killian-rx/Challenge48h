import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download, MapPin, Image } from 'lucide-react';
import GlowCard from '../components/GlowCard';
import { useTimer } from '../context/TimerContext';

export default function FinalStep() {
  const navigate = useNavigate();
  const [showHint, setShowHint] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const { penalize } = useTimer();
  const toggleHint = () => {
    if (!usedHint) { penalize(60); setUsedHint(true); }
    setShowHint(!showHint);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">

      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 font-mono text-xs text-gray-600 hover:text-gray-400 transition-colors cursor-pointer mb-4"
        >
          <ArrowLeft className="w-3 h-3" /> Retour
        </button>
        <div className="inline-flex items-center gap-2 mb-4">
          <Image className="w-3.5 h-3.5 text-cyber-green" />
          <span className="font-mono text-xs text-cyber-green tracking-wider">PHASE FINALE — PREUVE RÉCUPÉRÉE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Artefact récupéré — Nœud C2</h2>
        <p className="text-sm text-gray-400">
          Ce fichier a été extrait du serveur de commande et contrôle avant sa mise hors ligne.
          L'agent KOWALSKI avait marqué cet artefact comme priorité maximale avant sa disparition.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Image display */}
          <GlowCard glow="blue" hover={false}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4 text-cyber-blue" />
                <span className="font-mono text-xs text-gray-500 tracking-wider">FICHIER PREUVE — evidence_final.jpg</span>
              </div>
              <a
                href="/evidence_final.jpg"
                download="evidence_final.jpg"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono
                  text-cyber-green border border-cyber-green/30 hover:bg-cyber-green/10
                  transition-colors cursor-pointer"
              >
                <Download className="w-3 h-3" />
                TÉLÉCHARGER
              </a>
            </div>

            <div className="relative bg-gray-950/80 rounded-lg border border-gray-800 overflow-hidden">
              <img
                src="/evidence_final.jpg"
                alt="Evidence file"
                className="w-full h-80 object-cover opacity-80"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-950 to-transparent p-3">
                <p className="font-mono text-[11px] text-gray-400">evidence_final.jpg — récupéré sur le nœud compromis</p>
              </div>
            </div>
          </GlowCard>

          <GlowCard glow="none">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-cyber-yellow mt-0.5" />
              <div>
                <h3 className="font-mono text-sm font-semibold text-cyber-yellow mb-2">NOTE DE L'AGENT KOWALSKI</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  « L'image n'est pas ce qu'elle semble être. L'attaquant y a dissimulé quelque chose —
                  pas dans les pixels, mais dans ce que l'appareil photo écrit sans qu'on le voie.
                  Si on trouve où ça pointe, on trouve le point de rendez-vous. »
                </p>
                <p className="text-xs text-gray-600 mt-2 italic">
                  — Extrait du carnet de terrain, dernière entrée avant disparition
                </p>
              </div>
            </div>
          </GlowCard>

        </div>

        <div className="space-y-4">
          <GlowCard glow="none" hover={false}>
            <h3 className="font-mono text-xs text-gray-500 tracking-wider mb-3">RAPPORT D'INCIDENT</h3>
            <div className="space-y-2 text-xs text-gray-500">
              <p>L'attaquant opérait depuis une localisation physique fixe.</p>
              <p>Le serveur C2 a été mis hors ligne à 04:17 UTC.</p>
              <p>L'agent KOWALSKI a été le dernier à accéder à ce fichier avant sa disparition.</p>
              <p className="text-gray-600 italic mt-3">« Si l'image pouvait parler, elle vous dirait où il se cachait. »</p>
            </div>
          </GlowCard>

          <GlowCard glow="green">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="font-mono text-xs text-gray-500 mb-4">Prêt à soumettre le code final ?</p>
              <button
                onClick={() => navigate('/validate')}
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-lg
                  bg-gradient-to-r from-cyber-green/20 to-cyber-blue/20
                  border border-cyber-green/30 hover:border-cyber-green/60
                  text-cyber-green font-mono font-semibold text-sm tracking-wider
                  transition-all duration-300 glow-green cursor-pointer"
              >
                ACCÉDER À LA VALIDATION
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </GlowCard>

          <button
            onClick={toggleHint}
            className="font-mono text-[11px] text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
          >
            {showHint ? 'Masquer le coup de pouce' : 'Coup de pouce ? (−1min)'}
          </button>

          {showHint && (
            <GlowCard glow="none" hover={false}>
              <p className="font-mono text-xs text-gray-500">
                Les fichiers numériques embarquent des métadonnées invisibles à l'œil nu.
                Un simple viewer ne suffit pas. Cherchez ce que l'appareil a enregistré
                automatiquement au moment de la capture — et trouvez où ça mène sur une carte.
              </p>
            </GlowCard>
          )}
        </div>
      </div>
    </div>
  );
}
