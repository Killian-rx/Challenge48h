import { useState, useEffect } from 'react';
import { Activity, Wifi, Server, ShieldOff } from 'lucide-react';

export default function ThreatPanel() {
  const [stats, setStats] = useState({
    compromised: 42,
    connections: 347,
    packets: 0,
    uptime: '47h 23m',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        compromised: Math.min(50, prev.compromised + (Math.random() > 0.7 ? 1 : 0)),
        connections: prev.connections + Math.floor(Math.random() * 20) - 8,
        packets: prev.packets + Math.floor(Math.random() * 5000) + 1000,
        uptime: prev.uptime,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { icon: Server, label: 'NŒUDS COMPROMIS', value: stats.compromised, color: 'text-cyber-red' },
    { icon: Wifi, label: 'CONNEXIONS ACTIVES', value: stats.connections, color: 'text-cyber-blue' },
    { icon: Activity, label: 'PAQUETS CAPTURÉS', value: stats.packets.toLocaleString(), color: 'text-cyber-green' },
    { icon: ShieldOff, label: 'ÉTAT DU FIREWALL', value: 'CONTOURNÉ', color: 'text-cyber-red' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="glass rounded-lg p-3 border border-panel-border">
          <div className="flex items-center gap-2 mb-2">
            <Icon className={`w-4 h-4 ${color}`} />
            <span className="font-mono text-[10px] text-gray-500 tracking-wider">{label}</span>
          </div>
          <div className={`font-mono text-lg font-bold ${color}`}>{value}</div>
        </div>
      ))}
    </div>
  );
}
