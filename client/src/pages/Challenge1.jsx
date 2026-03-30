import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileCode, Copy, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import GlowCard from '../components/GlowCard';
import TypewriterText from '../components/TypewriterText';
import LogPanel from '../components/LogPanel';
import HtmlComment from '../components/HtmlComment';

const ENCODED_PAYLOAD = 'Umt4QlIzdG1hWEp6ZEY5bVlXeHpaVjlzWldGa2ZRPT0=';

export default function Challenge1() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(ENCODED_PAYLOAD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    if (userInput.trim() === 'FLAG{first_false_lead}') {
      setResult('decoy');
    } else {
      setResult('wrong');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <HtmlComment text="try harder: /hidden" />

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-blue/30 bg-cyber-blue/5 mb-4">
          <FileCode className="w-3.5 h-3.5 text-cyber-blue" />
          <span className="font-mono text-xs text-cyber-blue tracking-wider">PHASE 1 — TRANSMISSION INTERCEPTÉE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Payload chiffré récupéré</h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          Notre système de surveillance a intercepté la transmission encodée suivante provenant du
          serveur C2 de l'attaquant. Décodez ce payload pour extraire des renseignements sur la brèche.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GlowCard glow="blue">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-gray-500 tracking-wider">DONNÉES INTERCEPTÉES</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono
                  text-gray-400 hover:text-cyber-green border border-gray-700 hover:border-cyber-green/30
                  transition-colors cursor-pointer"
              >
                {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'COPIÉ' : 'COPIER'}
              </button>
            </div>
            <div className="bg-gray-950/80 rounded-lg p-4 border border-gray-800">
              <code className="font-mono text-sm text-cyber-green break-all leading-relaxed">
                {ENCODED_PAYLOAD}
              </code>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-cyber-yellow" />
              <span className="font-mono text-[11px] text-gray-500">
                Encodage détecté : Base64 — possible encodage multi-couches
              </span>
            </div>
          </GlowCard>

          <GlowCard glow="none">
            <h3 className="font-mono text-sm font-semibold text-gray-300 mb-3">CONSOLE D'ANALYSE</h3>
            <p className="text-xs text-gray-500 mb-4">
              Entrez le résultat décodé ci-dessous. Réfléchissez bien — l'attaquant utilise plusieurs
              couches d'encodage. Ce que vous trouvez n'est peut-être pas la réponse finale.
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => { setUserInput(e.target.value); setResult(null); }}
                placeholder="Entrez la valeur décodée..."
                className="flex-1 bg-gray-950/80 border border-gray-700 rounded-lg px-4 py-2.5
                  font-mono text-sm text-gray-200 placeholder-gray-600
                  focus:outline-none focus:border-cyber-blue/50 focus:ring-1 focus:ring-cyber-blue/20
                  transition-colors"
              />
              <button
                onClick={handleSubmit}
                className="px-5 py-2.5 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30
                  text-cyber-blue font-mono text-sm hover:bg-cyber-blue/20 transition-colors cursor-pointer"
              >
                ANALYSER
              </button>
            </div>

            {result === 'decoy' && (
              <div className="mt-4 p-4 rounded-lg border border-cyber-yellow/30 bg-cyber-yellow/5">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-cyber-yellow mt-0.5" />
                  <div>
                    <p className="font-mono text-sm text-cyber-yellow font-semibold">LEURRE DÉTECTÉ</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Cette valeur semble être une fausse piste placée par l'attaquant. Le vrai
                      renseignement doit être caché ailleurs. Creusez plus profond — inspectez tout.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {result === 'wrong' && (
              <div className="mt-4 p-3 rounded-lg border border-gray-700 bg-gray-900/50">
                <p className="font-mono text-xs text-gray-500">
                  Valeur non reconnue. Essayez de décoder le payload étape par étape.
                </p>
              </div>
            )}
          </GlowCard>

          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] text-gray-600">
              Indice : La vérité n'est jamais en surface. Regardez le code source.
            </p>
            <button
              onClick={() => navigate('/validate')}
              className="flex items-center gap-1.5 font-mono text-xs text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
            >
              Aller à la validation <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <LogPanel />
          <GlowCard glow="none" hover={false}>
            <h3 className="font-mono text-xs text-gray-500 tracking-wider mb-3">CONSEILS DE DÉCODAGE</h3>
            <ul className="space-y-2 text-xs text-gray-500">
              <li className="flex items-start gap-2">
                <span className="text-cyber-green mt-0.5">$</span>
                <span>Le Base64 utilise A-Z, a-z, 0-9, +, / et le padding =</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyber-green mt-0.5">$</span>
                <span>L'encodage multi-couches nécessite un décodage séquentiel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyber-green mt-0.5">$</span>
                <span>Tous les résultats décodés ne sont pas de vrais renseignements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyber-green mt-0.5">$</span>
                <span>Vérifiez toujours vos découvertes par plusieurs canaux</span>
              </li>
            </ul>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
