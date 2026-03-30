import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const TimerContext = createContext();

const TOTAL_SECONDS = 12 * 60;
const STORAGE_KEY = 'breach_timer_start';

function getRemaining() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  const elapsed = Math.floor((Date.now() - Number(stored)) / 1000);
  return Math.max(TOTAL_SECONDS - elapsed, 0);
}

export function TimerProvider({ children }) {
  const saved = getRemaining();
  const [remaining, setRemaining] = useState(saved ?? TOTAL_SECONDS);
  const [running, setRunning] = useState(saved !== null);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (running) return;
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setRunning(true);
  }, [running]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      const r = getRemaining();
      if (r !== null) {
        setRemaining(r);
        if (r <= 0) clearInterval(intervalRef.current);
      }
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  return (
    <TimerContext.Provider value={{ remaining, running, start }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  return useContext(TimerContext);
}
