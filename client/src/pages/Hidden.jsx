import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageOff, Search, ShieldAlert, ArrowRight } from 'lucide-react';
import GlowCard from '../components/GlowCard';
import HtmlComment from '../components/HtmlComment';

const FILESYSTEM = {
  '/home/agent': {
    type: 'dir',
    children: ['notes.txt', 'logs', 'evidence', '.classified'],
  },
  '/home/agent/notes.txt': {
    type: 'file',
    content: 'Journal de l\'agent KOWALSKI — Jour 3\n\nL\'attaquant a effacé la plupart de ses traces.\nJ\'ai sauvegardé ce que j\'ai pu récupérer dans différents dossiers.\nIl y a du bruit partout. Faites attention aux fausses pistes.\nLe système de fichiers a été partiellement altéré.',
  },
  '/home/agent/logs': {
    type: 'dir',
    children: ['access.log', 'error.log'],
  },
  '/home/agent/logs/access.log': {
    type: 'file',
    content: '[03:47:12] GET /admin — 403 Forbidden\n[03:47:14] POST /login — 401 Unauthorized\n[03:47:15] GET /api/users — 200 OK\n[03:47:18] GET /hidden — 301 Redirect\n[03:47:22] GET /dashboard — 403 Forbidden\n[03:47:25] GET /backup.sql — 404 Not Found',
  },
  '/home/agent/logs/error.log': {
    type: 'file',
    content: '[ERR] Failed login attempt from 192.168.13.37\n[ERR] SQL injection detected on /search\n[WARN] FLAG{wrong_path} found in memory dump — DECOY IDENTIFIED\n[ERR] Unauthorized access to /etc/shadow\n[WARN] Anomalous traffic pattern on port 8443',
  },
  '/home/agent/evidence': {
    type: 'dir',
    children: ['readme.txt', 'image_report.txt'],
  },
  '/home/agent/evidence/readme.txt': {
    type: 'file',
    content: 'Dossier de preuves — Opération BREACH\nClassification : CONFIDENTIEL\n\nPlusieurs artefacts ont été récupérés mais leur authenticité n\'est pas confirmée.\nL\'attaquant est connu pour planter de fausses preuves.\nLe flag dans les logs d\'erreur correspond à une signature déjà identifiée comme leurre.',
  },
  '/home/agent/evidence/image_report.txt': {
    type: 'file',
    content: 'Rapport forensique #2047\n\nArtefact visuel récupéré sur le nœud compromis.\nL\'image n\'a pas pu être analysée en totalité depuis ce terminal.\nLe fichier a été transféré vers le secteur d\'analyse avancée pour extraction.',
  },
  '/home/agent/.classified': {
    type: 'dir',
    children: ['next_step.txt', 'credentials.enc'],
  },
  '/home/agent/.classified/next_step.txt': {
    type: 'file',
    content: '[ CONFIDENTIEL — NIVEAU ALPHA ]\nOpération BREACH — Directive interne\n\nL\'analyse des artefacts récupérés a été déplacée vers :\n\n  /final-step\n\nL\'image extraite du serveur C2 y est stockée.\nPriorité maximale.',
  },
  '/home/agent/.classified/credentials.enc': {
    type: 'file',
    content: '[ERREUR] Fichier chiffré — clé de déchiffrement non disponible.\nContenu : %$#@!*&^#@... données corrompues.',
  },
};

function resolvePath(cwd, input) {
  if (input.startsWith('/')) return input;
  const parts = cwd.split('/').filter(Boolean);
  for (const seg of input.split('/')) {
    if (seg === '..') parts.pop();
    else if (seg !== '.') parts.push(seg);
  }
  return '/' + parts.join('/');
}

function processCommand(cmd, cwd) {
  const parts = cmd.trim().split(/\s+/);
  const command = parts[0];
  const args = parts.slice(1);

  switch (command) {
    case '': return { output: '', cwd };

    case 'help':
      return {
        output: 'Commandes disponibles :\n  ls [-a]    — lister les fichiers\n  cd <dir>   — changer de répertoire\n  cat <file> — lire un fichier\n  pwd        — répertoire actuel\n  clear      — effacer le terminal\n  help       — cette aide',
        cwd,
      };

    case 'pwd':
      return { output: cwd, cwd };

    case 'ls': {
      const node = FILESYSTEM[cwd];
      if (!node || node.type !== 'dir') return { output: 'ls: pas un répertoire', cwd };
      const showHidden = args.includes('-a') || args.includes('-la') || args.includes('-al');
      const items = node.children.filter((c) => showHidden || !c.startsWith('.'));
      const parts = items.map((item) => {
        const fullPath = cwd === '/' ? '/' + item : cwd + '/' + item;
        const child = FILESYSTEM[fullPath];
        return child?.type === 'dir' ? item + '/' : item;
      });
      return { output: parts.join('  ') || '(vide)', cwd };
    }

    case 'cd': {
      if (!args[0]) return { output: '', cwd: '/home/agent' };
      const cleaned = args[0].replace(/\/+$/, '');
      const target = resolvePath(cwd, cleaned);
      if (FILESYSTEM[target]?.type === 'dir') return { output: '', cwd: target };
      const relative = resolvePath(cwd, cleaned.replace(/^\/+/, ''));
      if (FILESYSTEM[relative]?.type === 'dir') return { output: '', cwd: relative };
      return { output: `cd: ${args[0]}: aucun fichier ou répertoire de ce type`, cwd };
    }

    case 'cat': {
      if (!args[0]) return { output: 'cat: argument manquant', cwd };
      const target = resolvePath(cwd, args[0]);
      const node = FILESYSTEM[target];
      if (!node) return { output: `cat: ${args[0]}: aucun fichier ou répertoire de ce type`, cwd };
      if (node.type === 'dir') return { output: `cat: ${args[0]}: est un répertoire`, cwd };
      return { output: node.content, cwd };
    }

    case 'clear':
      return { output: '__CLEAR__', cwd };

    default:
      return { output: `${command}: commande non reconnue. Tapez 'help' pour l'aide.`, cwd };
  }
}

export default function Hidden() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([
    { type: 'system', text: '=== Terminal Forensique — Session agent KOWALSKI ===' },
    { type: 'system', text: 'Dernière connexion : 2025-03-29 03:52 UTC depuis 10.0.13.37' },
    { type: 'system', text: 'Tapez "help" pour les commandes disponibles.\n' },
  ]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('/home/agent');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim();
    setInput('');

    const prompt = `agent@forensic:${cwd.replace('/home/agent', '~')}$ ${cmd}`;
    const { output, cwd: newCwd } = processCommand(cmd, cwd);

    if (output === '__CLEAR__') {
      setHistory([]);
      setCwd(newCwd);
      return;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'prompt', text: prompt },
      ...(output ? [{ type: 'output', text: output }] : []),
    ]);
    setCwd(newCwd);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <HtmlComment text="FLAG{wrong_path} — Ce n'est pas le flag que vous cherchez." />

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-purple/30 bg-cyber-purple/5 mb-4">
          <Search className="w-3.5 h-3.5 text-cyber-purple" />
          <span className="font-mono text-xs text-cyber-purple tracking-wider">SECTEUR CACHÉ — ACCÈS TERMINAL</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Terminal forensique</h2>
        <p className="text-sm text-gray-400">
          Session récupérée depuis le poste de l'agent KOWALSKI. Ses fichiers sont encore accessibles.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlowCard glow="green" hover={false}>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-cyber-red/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-cyber-yellow/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-cyber-green/60" />
              </div>
              <span className="font-mono text-xs text-gray-500">agent@forensic</span>
            </div>

            <div
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()}
              className="bg-gray-950/90 rounded-lg p-4 border border-gray-800 font-mono text-xs min-h-[400px] max-h-[500px] overflow-y-auto cursor-text"
            >
              {history.map((line, i) => (
                <div key={i} className={`whitespace-pre-wrap mb-0.5 ${
                  line.type === 'system' ? 'text-cyber-blue' :
                  line.type === 'prompt' ? 'text-cyber-green' :
                  'text-gray-400'
                }`}>
                  {line.text}
                </div>
              ))}

              <form onSubmit={handleSubmit} className="flex items-center">
                <span className="text-cyber-green shrink-0">
                  agent@forensic:{cwd.replace('/home/agent', '~')}$&nbsp;
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent text-gray-200 outline-none caret-cyber-green"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
              </form>
            </div>
          </GlowCard>
        </div>

        <div className="space-y-4">
          <GlowCard glow="none" hover={false}>
            <h3 className="font-mono text-xs text-gray-500 tracking-wider mb-3">CARTE DES SECTEURS</h3>
            <div className="space-y-2">
              {[
                { label: 'Point d\'entrée', status: 'TERMINÉ', color: 'text-gray-500' },
                { label: 'Phase 1', status: 'TERMINÉ', color: 'text-gray-500' },
                { label: 'Secteur caché', status: 'ACTIF', color: 'text-cyber-purple' },
                { label: 'Inconnu', status: 'VERROUILLÉ', color: 'text-gray-700' },
                { label: 'Validation', status: 'VERROUILLÉ', color: 'text-gray-700' },
              ].map(({ label, status, color }) => (
                <div key={label} className="flex items-center justify-between py-1.5 border-b border-gray-800/50 last:border-0">
                  <span className={`font-mono text-xs ${color}`}>{label}</span>
                  <span className={`font-mono text-[10px] ${color}`}>{status}</span>
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard glow="none" hover={false}>
            <h3 className="font-mono text-xs text-gray-500 tracking-wider mb-3">PROFIL AGENT</h3>
            <div className="space-y-1.5 text-xs text-gray-500">
              <p><span className="text-gray-400">Nom :</span> KOWALSKI, M.</p>
              <p><span className="text-gray-400">Rôle :</span> Analyste forensique senior</p>
              <p><span className="text-gray-400">Affectation :</span> Opération BREACH</p>
              <p><span className="text-gray-400">Statut :</span> <span className="text-cyber-red">DISPARU</span></p>
              <p className="text-gray-600 mt-2 italic">Dernière note : "J'ai tout sauvegardé. Cherchez dans mes fichiers."</p>
            </div>
          </GlowCard>

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
