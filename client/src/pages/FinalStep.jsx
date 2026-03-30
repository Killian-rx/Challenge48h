import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, ArrowRight, Lock, Download, MapPin, Image } from 'lucide-react';
import GlowCard from '../components/GlowCard';

export default function FinalStep() {
  const navigate = useNavigate();
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-green/30 bg-cyber-green/5 mb-4">
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
                className="w-full h-64 object-cover opacity-80"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-950 to-transparent p-3">
                <p className="font-mono text-[11px] text-gray-400">evidence_final.jpg — JPEG — EXIF présent</p>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-gray-900/50 border border-gray-800">
              <p className="font-mono text-xs text-gray-500 mb-2">SIGNATURE DU FICHIER :</p>
              <div className="font-mono text-[11px] text-gray-600 space-y-0.5">
                <p>Format : JPEG (FFD8...FFD9)</p>
                <p>Taille : 119 Ko</p>
                <p>Dimensions : 1024x679 pixels</p>
                <p className="text-cyber-yellow">Headers additionnels détectés — analyse requise</p>
                <p className="text-gray-600">Hash SHA256 : 7a3f...c91e (vérifié)</p>
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

          {/* Progressive hint */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowHint(!showHint)}
              className="font-mono text-[11px] text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
            >
              {showHint ? 'Masquer l\'indice' : 'Besoin d\'un coup de pouce ?'}
            </button>
            <button
              onClick={() => navigate('/validate')}
              className="flex items-center gap-1.5 font-mono text-xs text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
            >
              Aller à la validation <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {showHint && (
            <GlowCard glow="none" hover={false}>
              <p className="font-mono text-xs text-gray-500">
                Les fichiers numériques embarquent des métadonnées invisibles à l'œil nu.
                Un simple viewer ne suffit pas. Cherchez ce que l'appareil a enregistré
                automatiquement au moment de la capture — et trouvez où ça mène sur une carte.
              </p>
              {!showSolution && (
                <button
                  onClick={() => setShowSolution(true)}
                  className="mt-3 font-mono text-[11px] text-cyber-red/50 hover:text-cyber-red transition-colors cursor-pointer"
                >
                  Toujours bloqué ? Voir la solution
                </button>
              )}
              {showSolution && (
                <div className="mt-3 pt-3 border-t border-gray-800">
                  <p className="font-mono text-[11px] text-cyber-red/70 mb-1">SOLUTION :</p>
                  <p className="font-mono text-xs text-gray-400">
                    Téléchargez l'image et analysez ses données EXIF (avec exiftool ou un site comme
                    jeffreys exif viewer). Vous trouverez des coordonnées GPS. Collez-les dans Google Maps :
                    elles pointent vers une île. Entrez le nom de cette île dans la validation.
                  </p>
                </div>
              )}
            </GlowCard>
          )}
        </div>

        <div className="space-y-4">
          {/* Terminal showing analysis */}
          <GlowCard glow="green" hover={false}>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-cyber-red/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-cyber-yellow/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-cyber-green/60" />
              </div>
              <span className="font-mono text-xs text-gray-500">analyse-image</span>
            </div>
            <div className="bg-gray-950/80 rounded-lg p-3 border border-gray-800 font-mono text-[11px] space-y-1">
              <p className="text-gray-500">$ file evidence_final.jpg</p>
              <p className="text-gray-400">JPEG image data, JFIF standard, EXIF</p>
              <p className="text-gray-500">$ strings evidence_final.jpg | head</p>
              <p className="text-gray-400">JFIF, Exif, II*</p>
              <p className="text-gray-500">$ stat evidence_final.jpg</p>
              <p className="text-gray-400">Size: 119638  Blocks: 240  IO Block: 4096</p>
              <p className="text-cyber-yellow">[!] Métadonnées embarquées détectées</p>
              <p className="text-gray-600">[i] Analyse locale impossible — téléchargez le fichier</p>
            </div>
          </GlowCard>

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
        </div>
      </div>
    </div>
  );
}
