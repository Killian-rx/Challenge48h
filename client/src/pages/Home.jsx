import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AlertTriangle, ChevronRight, Lock, Eye, Zap } from 'lucide-react';
import GlowCard from '../components/GlowCard';
import LogPanel from '../components/LogPanel';
import ThreatPanel from '../components/ThreatPanel';
import TypewriterText from '../components/TypewriterText';
import ScanAnimation from '../components/ScanAnimation';
import { useTimer } from '../context/TimerContext';

export default function Home() {
  const navigate = useNavigate();
  const [titleDone, setTitleDone] = useState(false);
  const { start } = useTimer();

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyber-red/30 bg-cyber-red/5 mb-6">
          <AlertTriangle className="w-4 h-4 text-cyber-red animate-pulse-glow" />
          <span className="font-mono text-xs text-cyber-red tracking-wider">
            INCIDENT DE SÉCURITÉ — PRIORITÉ ALPHA
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight">
          <span className="bg-gradient-to-r from-cyber-green via-cyber-blue to-cyber-purple bg-clip-text text-transparent animate-gradient">
            INTRUSION DÉTECTÉE
          </span>
        </h1>

        <div className="h-8 mb-6">
          <TypewriterText
            text="Une intrusion a été détectée sur l'infrastructure. Retrouvez la clé avant qu'il ne soit trop tard."
            speed={30}
            className="text-gray-400 text-sm sm:text-base"
            onComplete={() => setTitleDone(true)}
          />
        </div>

        {titleDone && (
          <div className="animate-float">
            <button
              onClick={() => { start(); navigate('/challenge-1'); }}
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg
                bg-gradient-to-r from-cyber-green/20 to-cyber-blue/20
                border border-cyber-green/30 hover:border-cyber-green/60
                text-cyber-green font-mono font-semibold text-sm tracking-wider
                transition-all duration-300 hover:scale-105
                glow-green cursor-pointer"
            >
              COMMENCER L'INVESTIGATION
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      <div className="mb-8">
        <ThreatPanel />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <GlowCard glow="red">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyber-red/10">
                <Lock className="w-5 h-5 text-cyber-red" />
              </div>
              <div>
                <h3 className="font-mono text-sm font-semibold text-cyber-red mb-1">RAPPORT D'INCIDENT</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  À 03h47 UTC, une menace persistante avancée a été détectée sur l'infrastructure.
                  Plusieurs nœuds ont été compromis. L'attaquant, désigné sous le nom de code SPECTER,
                  opère depuis une localisation inconnue. L'agent KOWALSKI, dernier à avoir investigué
                  cette brèche, a disparu il y a 48 heures. Ses fichiers sont encore sur le système.
                </p>
              </div>
            </div>
          </GlowCard>

          <GlowCard glow="blue">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyber-blue/10">
                <Eye className="w-5 h-5 text-cyber-blue" />
              </div>
              <div>
                <h3 className="font-mono text-sm font-semibold text-cyber-blue mb-1">BRIEFING RENSEIGNEMENT</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  SPECTER est connu pour ses techniques de désinformation. Fausses pistes, leurres,
                  données piégées — rien ne doit être pris au premier degré. Avant sa disparition,
                  KOWALSKI avait intercepté une transmission chiffrée et commencé à remonter la piste.
                  Reprenez là où il s'est arrêté.
                </p>
              </div>
            </div>
          </GlowCard>

          <GlowCard glow="green">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyber-green/10">
                <Zap className="w-5 h-5 text-cyber-green" />
              </div>
              <div>
                <h3 className="font-mono text-sm font-semibold text-cyber-green mb-1">DIRECTIVE OPÉRATIONNELLE</h3>
                <ul className="text-xs text-gray-400 space-y-1.5 mt-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-cyber-green" />
                    Reprendre l'investigation de l'agent KOWALSKI
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-cyber-green" />
                    Analyser les transmissions interceptées
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-cyber-green" />
                    Distinguer les leurres des vraies preuves
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-cyber-green" />
                    Localiser le point de rendez-vous de SPECTER
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-cyber-green" />
                    Confirmer l'identification pour clore l'opération
                  </li>
                </ul>
              </div>
            </div>
          </GlowCard>
        </div>

        <div className="space-y-4">
          <LogPanel />
          <GlowCard glow="none" hover={false}>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-gray-500 tracking-wider">ÉTAT DU RÉSEAU</span>
              <ScanAnimation />
            </div>
            <div className="space-y-2">
              {[
                { name: 'fw-01.internal', status: 'COMPROMIS', color: 'cyber-red' },
                { name: 'db-primary.prod', status: 'EN DANGER', color: 'cyber-yellow' },
                { name: 'auth-svc.cluster', status: 'CONTOURNÉ', color: 'cyber-red' },
                { name: 'cdn-edge.proxy', status: 'SURVEILLANCE', color: 'cyber-blue' },
                { name: 'vault.secrets', status: 'CRITIQUE', color: 'cyber-red' },
              ].map(({ name, status, color }) => (
                <div key={name} className="flex items-center justify-between py-1.5 border-b border-gray-800/50 last:border-0">
                  <span className="font-mono text-xs text-gray-400">{name}</span>
                  <span className={`font-mono text-[10px] font-semibold text-${color} px-2 py-0.5 rounded-full border border-${color}/20 bg-${color}/5`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
