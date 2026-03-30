import { useState, useEffect } from 'react';
import { Radar } from 'lucide-react';

export default function ScanAnimation({ active = true }) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <div className="flex items-center gap-2 font-mono text-xs text-cyber-blue">
      <Radar className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
      <span>Scan du réseau{dots}</span>
    </div>
  );
}
