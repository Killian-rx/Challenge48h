import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const SEQUENCES = [
  [
    { text: '> ssh -L 443 breach@10.0.13.37', delay: 0 },
    { text: '  Connexion au tunnel chiffré...', delay: 200 },
    { text: '  Authentification par clé... OK', delay: 500 },
    { text: '> Chargement du secteur...', delay: 800 },
    { text: '  Accès autorisé.', delay: 1100 },
  ],
  [
    { text: '> nmap -sS -p 1-65535 target', delay: 0 },
    { text: '  Scan des ports en cours...', delay: 200 },
    { text: '  3 ports ouverts détectés', delay: 550 },
    { text: '> exploit --payload reverse_shell', delay: 800 },
    { text: '  Shell obtenu. Accès root.', delay: 1100 },
  ],
];

export default function PageTransition({ children }) {
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(false);
  const [lines, setLines] = useState([]);
  const [showContent, setShowContent] = useState(true);
  const [prevPath, setPrevPath] = useState(location.pathname);
  const seqIndex = useRef(0);

  useEffect(() => {
    if (location.pathname === prevPath) return;
    setPrevPath(location.pathname);

    if (location.pathname === '/') {
      setShowContent(true);
      return;
    }

    const seq = SEQUENCES[seqIndex.current % SEQUENCES.length];
    seqIndex.current++;

    setTransitioning(true);
    setShowContent(false);
    setLines([]);

    seq.forEach((line) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line.text]);
      }, line.delay);
    });

    setTimeout(() => {
      setTransitioning(false);
      setShowContent(true);
    }, 1400);
  }, [location.pathname]);

  return (
    <>
      {transitioning && (
        <div className="fixed inset-0 z-[80] bg-gray-950 flex items-center justify-center">
          <div className="font-mono text-xs space-y-2 max-w-md">
            {lines.map((line, i) => (
              <div
                key={i}
                className={`${line.startsWith('>') ? 'text-cyber-green' : 'text-gray-500'} animate-flicker`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {line}
              </div>
            ))}
            {lines.length < 5 && (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-3 h-3 border-2 border-cyber-green/60 border-t-cyber-green rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>
      )}
      <div
        className={`transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0'}`}
      >
        {children}
      </div>
    </>
  );
}
