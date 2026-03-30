import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageOff, Search, ShieldAlert, ArrowRight } from 'lucide-react';
import GlowCard from '../components/GlowCard';
import TypewriterText from '../components/TypewriterText';
import HtmlComment from '../components/HtmlComment';

export default function Hidden() {
  const navigate = useNavigate();
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <HtmlComment text="FLAG{wrong_path} — Ce n'est pas le flag que vous cherchez. Continuez à chercher." />
      <HtmlComment text="Bien joué, enquêteur. Mais c'est encore une impasse. Le vrai chemin continue ici : /final-step" />

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-purple/30 bg-cyber-purple/5 mb-4">
          <Search className="w-3.5 h-3.5 text-cyber-purple" />
          <span className="font-mono text-xs text-cyber-purple tracking-wider">SECTEUR CACHÉ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Zone classifiée
        </h2>
        <p className="text-sm text-gray-400">
          Vous avez trouvé un secteur caché. Analysez les preuves avec attention.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <GlowCard glow="red">
            <div className="flex items-center gap-2 mb-4">
              <ImageOff className="w-4 h-4 text-cyber-red" />
              <span className="font-mono text-xs text-gray-500 tracking-wider">FICHIER PREUVE #0x7F</span>
            </div>
            <div className="relative bg-gray-950/80 rounded-lg border border-gray-800 h-52 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-px bg-cyber-green"
                    style={{
                      marginTop: `${Math.random() * 100}%`,
                      width: `${Math.random() * 100}%`,
                      marginLeft: `${Math.random() * 50}%`,
                      opacity: Math.random() * 0.8,
                    }}
                  />
                ))}
              </div>
              <div className={`text-center ${glitchActive ? 'translate-x-1 skew-x-2' : ''} transition-transform duration-75`}>
                <p className="font-mono text-lg text-gray-600 mb-2">[ IMAGE CORROMPUE ]</p>
                <p className="font-mono text-xs text-gray-700">FICHIER : evidence_037.png</p>
                <p className="font-mono text-xs text-gray-700">STATUT : PARTIELLEMENT RÉCUPÉRÉ</p>
              </div>
            </div>
            <div className="mt-3 p-3 rounded-lg bg-gray-900/50 border border-gray-800">
              <p className="font-mono text-xs text-gray-500 mb-1">EXTRACTION MÉTADONNÉES :</p>
              <div className="font-mono text-[11px] text-gray-600 space-y-0.5">
                <p>EXIF.Artist: "shadow_op"</p>
                <p>EXIF.Comment: "FLAG&#123;wrong_path&#125;"</p>
                <p>EXIF.Software: "GhostEncoder v2.1"</p>
                <p>EXIF.DateTime: "2025:03:29 03:47:12"</p>
              </div>
            </div>
          </GlowCard>

          <GlowCard glow="none">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-cyber-yellow mt-0.5" />
              <div>
                <h3 className="font-mono text-sm font-semibold text-cyber-yellow mb-2">RÉSULTAT D'ANALYSE</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Les métadonnées récupérées contiennent ce qui semble être un flag, mais notre
                  analyse automatisée l'identifie comme un <span className="text-cyber-red">leurre planté</span>.
                  L'attaquant avait anticipé cette piste et a laissé de fausses preuves.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Recommandation : regardez au-delà de l'évidence. La vraie piste va plus loin.
                </p>
              </div>
            </div>
          </GlowCard>
        </div>

        <div className="space-y-6">
          <GlowCard glow="green">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-cyber-red/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-cyber-yellow/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-cyber-green/60" />
              </div>
              <span className="font-mono text-xs text-gray-500">terminal-forensique</span>
            </div>
            <div className="bg-gray-950/80 rounded-lg p-4 border border-gray-800 font-mono text-xs space-y-1.5">
              <p className="text-gray-500">$ analyze --deep evidence_037.png</p>
              <p className="text-gray-400">[*] Chargement du fichier...</p>
              <p className="text-gray-400">[*] Analyse d'entropie en cours...</p>
              <p className="text-cyber-yellow">[!] Région haute entropie détectée à l'offset 0x1A4F</p>
              <p className="text-gray-400">[*] Extraction des données cachées...</p>
              <p className="text-cyber-red">[!] ALERTE : Motif de leurre détecté</p>
              <p className="text-gray-400">[*] Scan stéganographique : négatif</p>
              <p className="text-gray-400">[*] Recoupement des signatures connues...</p>
              <p className="text-cyber-green">[+] Correspondance trouvée : la piste continue dans un autre secteur</p>
              <p className="text-gray-500">$ _</p>
            </div>
          </GlowCard>

          <GlowCard glow="none" hover={false}>
            <h3 className="font-mono text-xs text-gray-500 tracking-wider mb-3">CARTE DES SECTEURS</h3>
            <div className="space-y-2">
              {[
                { path: '/', label: 'Point d\'entrée', status: 'TERMINÉ', color: 'text-gray-500' },
                { path: '/challenge-1', label: 'Phase 1', status: 'TERMINÉ', color: 'text-gray-500' },
                { path: '/hidden', label: 'Secteur caché', status: 'ACTIF', color: 'text-cyber-purple' },
                { path: '???', label: 'Inconnu', status: 'VERROUILLÉ', color: 'text-gray-700' },
                { path: '/validate', label: 'Validation', status: 'VERROUILLÉ', color: 'text-gray-700' },
              ].map(({ path, label, status, color }) => (
                <div key={path} className="flex items-center justify-between py-1.5 border-b border-gray-800/50 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs ${color}`}>{label}</span>
                  </div>
                  <span className={`font-mono text-[10px] ${color}`}>{status}</span>
                </div>
              ))}
            </div>
          </GlowCard>

          <div className="text-center py-4" data-next="/final-step" data-hint="la dernière étape vous attend">
            <p className="font-mono text-xs text-gray-700">
              Rien d'utile ici. Impasse.
            </p>
            <p className="font-mono text-[8px] text-gray-900 mt-1 select-all" aria-hidden="true">
              rendez-vous sur /final-step pour les vraies preuves
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => navigate('/validate')}
              className="flex items-center gap-1.5 font-mono text-xs text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
            >
              Aller à la validation <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
