import { useState, useEffect } from 'react';

export default function TypewriterText({ text, speed = 40, className = '', onComplete }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        onComplete?.();
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={`font-mono ${className}`}>
      {displayed}
      {!done && <span className="inline-block w-2 h-4 ml-0.5 bg-cyber-green animate-pulse-glow align-middle" />}
    </span>
  );
}
