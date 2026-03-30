import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, ArrowRight, Lock } from 'lucide-react';
import GlowCard from '../components/GlowCard';
import HtmlComment from '../components/HtmlComment';

export default function FinalStep() {
  const navigate = useNavigate();
  const [lines, setLines] = useState([]);

  const terminalLines = [
    { delay: 0, text: '$ ssh -i key.pem root@10.0.66.1', type: 'input' },
    { delay: 600, text: 'Connexion au nœud compromis...', type: 'info' },
    { delay: 1200, text: 'Authentification réussie.', type: 'success' },
    { delay: 1800, text: '', type: 'blank' },
    { delay: 2200, text: '$ cat /var/log/breach.log | tail -20', type: 'input' },
    { delay: 2800, text: '[2025-03-29 03:47:12] Brèche périmétrique confirmée', type: 'info' },
    { delay: 3200, text: '[2025-03-29 03:47:15] Règles firewall écrasées', type: 'info' },
    { delay: 3600, text: '[2025-03-29 03:47:18] Mouvement latéral initié', type: 'info' },
    { delay: 4000, text: '[2025-03-29 03:47:22] Escalade de privilèges réussie', type: 'warning' },
    { delay: 4400, text: '[2025-03-29 03:47:25] Exfiltration de données démarrée', type: 'error' },
    { delay: 4800, text: '[2025-03-29 03:47:31] Clés de chiffrement extraites', type: 'error' },
    { delay: 5200, text: '', type: 'blank' },
    { delay: 5600, text: '$ ls -la /root/.secrets/', type: 'input' },
    { delay: 6200, text: 'total 16', type: 'info' },
    { delay: 6400, text: 'drwx------  2 root root 4096 Mar 29 03:47 .', type: 'info' },
    { delay: 6600, text: '-rw-------  1 root root   42 Mar 29 03:47 .keyfile', type: 'info' },
    { delay: 7000, text: '', type: 'blank' },
    { delay: 7400, text: '$ cat /root/.secrets/.keyfile', type: 'input' },
    { delay: 8000, text: '===== CLÉ D\'ACCÈS RÉCUPÉRÉE =====', type: 'success' },
    { delay: 8400, text: 'Utilisez-la dans le terminal de validation.', type: 'info' },
    { delay: 8800, text: '==================================', type: 'success' },
    { delay: 9200, text: '', type: 'blank' },
    { delay: 9600, text: 'Connexion fermée.', type: 'info' },
  ];

  useEffect(() => {
    const timeouts = terminalLines.map((line, i) =>
      setTimeout(() => setLines((prev) => [...prev, line]), line.delay)
    );
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const typeColors = {
    input: 'text-cyber-green',
    info: 'text-gray-400',
    success: 'text-cyber-blue',
    warning: 'text-cyber-yellow',
    error: 'text-cyber-red',
    blank: '',
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <HtmlComment text="final_code: breach_completed" />

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-green/30 bg-cyber-green/5 mb-4">
          <Terminal className="w-3.5 h-3.5 text-cyber-green" />
          <span className="font-mono text-xs text-cyber-green tracking-wider">PHASE FINALE — ACCÈS ROOT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Terminal du nœud compromis</h2>
        <p className="text-sm text-gray-400">
          Accès direct au système compromis. Le journal de brèche révèle les dernières actions de l'attaquant.
        </p>
      </div>

      <GlowCard glow="green" hover={false} className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-cyber-red/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-cyber-yellow/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-cyber-green/60" />
          </div>
          <span className="font-mono text-xs text-gray-500">root@noeud-compromis:~#</span>
        </div>
        <div className="bg-gray-950/90 rounded-lg p-4 border border-gray-800 font-mono text-xs min-h-[320px] overflow-y-auto">
          {lines.map((line, i) => (
            <div key={i} className={`${typeColors[line.type]} ${line.type === 'blank' ? 'h-3' : ''}`}>
              {line.text}
            </div>
          ))}
          {lines.length < terminalLines.length && (
            <span className="inline-block w-2 h-3.5 bg-cyber-green animate-pulse-glow" />
          )}
        </div>
      </GlowCard>

      <div className="grid sm:grid-cols-2 gap-6">
        <GlowCard glow="none">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-cyber-yellow mt-0.5" />
            <div>
              <h3 className="font-mono text-sm font-semibold text-cyber-yellow mb-2">INSTRUCTIONS</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                La clé d'accès a été récupérée depuis le nœud compromis.
                Vous devez la trouver dans la sortie du terminal ou dans le code source
                de la page pour passer à l'étape de validation. Inspectez attentivement.
              </p>
            </div>
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

      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, fontSize: 0 }}
        data-key="final_code" data-value="breach_completed"
        aria-hidden="true"
      >
        final_code: breach_completed
      </div>
    </div>
  );
}
