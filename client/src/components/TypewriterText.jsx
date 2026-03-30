import { useState, useEffect, useRef } from 'react';

export default function TypewriterText({ text, speed = 40, className = '', onComplete }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        onComplete?.();
        clearInterval(intervalRef.current);
      }
    }, speed);
    return () => clearInterval(intervalRef.current);
  }, [text, speed]);

  const skip = () => {
    if (!done) {
      clearInterval(intervalRef.current);
      setDisplayed(text);
      setDone(true);
      onComplete?.();
    }
  };

  return (
    <span className={`font-mono cursor-pointer ${className}`} onClick={skip}>
      {displayed}
      {!done && <span className="inline-block w-2 h-4 ml-0.5 bg-cyber-green animate-pulse-glow align-middle" />}
    </span>
  );
}
