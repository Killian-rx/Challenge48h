import { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

const LOG_ENTRIES = [
  { level: 'ERR', msg: 'Accès non autorisé détecté sur le port 443' },
  { level: 'WARN', msg: 'Tentative de brute force depuis 192.168.13.37' },
  { level: 'INFO', msg: 'Capture de paquets lancée sur eth0' },
  { level: 'ERR', msg: 'Tentative d\'escalade root bloquée — nouvelle tentative détectée' },
  { level: 'WARN', msg: 'Trafic sortant suspect vers 10.0.66.1' },
  { level: 'INFO', msg: 'Règle firewall #47 contournée via CVE-2025-1337' },
  { level: 'ERR', msg: 'Exfiltration de la base de données en cours — 2.4 Go transférés' },
  { level: 'WARN', msg: 'Tunnel SSH établi depuis un point d\'accès inconnu' },
  { level: 'INFO', msg: 'Honeypot déclenché sur /admin/backup.sql' },
  { level: 'ERR', msg: 'Mouvement latéral détecté — nœud compromis' },
  { level: 'WARN', msg: 'Attaque DNS rebinding en cours' },
  { level: 'INFO', msg: 'Analyse du dump mémoire — signature shellcode trouvée' },
  { level: 'ERR', msg: 'Escalade de privilèges réussie sur svc-account' },
  { level: 'WARN', msg: 'Payload chiffré déposé dans /tmp/.cache' },
  { level: 'INFO', msg: 'Intervalle beacon C2 : 30s — canal d\'exfiltration actif' },
  { level: 'ERR', msg: 'Certificate pinning contourné sur l\'API interne' },
  { level: 'WARN', msg: 'Attaque par rejeu de token détectée sur le service auth' },
  { level: 'INFO', msg: 'Reverse shell lancé — PID 31337' },
];

const levelColors = {
  ERR: 'text-cyber-red',
  WARN: 'text-cyber-yellow',
  INFO: 'text-cyber-green',
};

export default function LogPanel() {
  const [logs, setLogs] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      const entry = LOG_ENTRIES[idx % LOG_ENTRIES.length];
      const timestamp = new Date().toISOString().slice(11, 19);
      setLogs((prev) => [...prev.slice(-15), { ...entry, timestamp, id: Date.now() }]);
      idx++;
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="glass rounded-xl overflow-hidden border border-panel-border">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-panel-border bg-gray-900/50">
        <Terminal className="w-4 h-4 text-cyber-green" />
        <span className="font-mono text-xs text-cyber-green tracking-wider">JOURNAUX SYSTÈME</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse-glow" />
          <span className="font-mono text-[10px] text-gray-500">EN FLUX</span>
        </div>
      </div>
      <div ref={scrollRef} className="p-3 h-48 overflow-y-auto font-mono text-xs space-y-1">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-2 animate-flicker">
            <span className="text-gray-600 shrink-0">{log.timestamp}</span>
            <span className={`shrink-0 font-semibold ${levelColors[log.level]}`}>
              [{log.level}]
            </span>
            <span className="text-gray-400">{log.msg}</span>
          </div>
        ))}
        {logs.length === 0 && (
          <span className="text-gray-600">En attente du flux de logs...</span>
        )}
      </div>
    </div>
  );
}
