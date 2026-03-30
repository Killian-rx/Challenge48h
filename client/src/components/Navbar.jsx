import { Link, useLocation } from 'react-router-dom';
import { Shield, AlertTriangle } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-panel-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 group">
            <Shield className="w-5 h-5 text-cyber-green animate-pulse-glow" />
            <span className="font-mono font-bold text-sm tracking-wider text-cyber-green text-glow-green">
              BREACH<span className="text-gray-500">//</span>IR
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-red/30 bg-cyber-red/5">
              <AlertTriangle className="w-3.5 h-3.5 text-cyber-red animate-pulse-glow" />
              <span className="font-mono text-xs text-cyber-red">NIVEAU DE MENACE : CRITIQUE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse-glow" />
              <span className="font-mono text-xs text-gray-400">EN DIRECT</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
