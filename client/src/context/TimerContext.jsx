import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const TimerContext = createContext();

const TOTAL_SECONDS = 12 * 60;
const STORAGE_KEY = 'breach_timer_start';
const STOPPED_KEY = 'breach_timer_stopped';

function getRemaining() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  const elapsed = Math.floor((Date.now() - Number(stored)) / 1000);
  return Math.max(TOTAL_SECONDS - elapsed, 0);
}

export function TimerProvider({ children }) {
  const saved = getRemaining();
  const wasStopped = localStorage.getItem(STOPPED_KEY);
  const [remaining, setRemaining] = useState(wasStopped ? Number(wasStopped) : (saved ?? TOTAL_SECONDS));
  const [running, setRunning] = useState(saved !== null && !wasStopped);
  const [stopped, setStopped] = useState(!!wasStopped);
  const [expired, setExpired] = useState(saved !== null && !wasStopped && saved <= 0);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (running || stopped) return;
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    localStorage.removeItem(STOPPED_KEY);
    setRunning(true);
  }, [running, stopped]);

  const stop = useCallback(() => {
    const r = getRemaining();
    if (r !== null) {
      localStorage.setItem(STOPPED_KEY, String(r));
      setRemaining(r);
    }
    clearInterval(intervalRef.current);
    setRunning(false);
    setStopped(true);
  }, []);

  const penalize = useCallback((seconds) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    const newStart = Number(stored) - seconds * 1000;
    localStorage.setItem(STORAGE_KEY, String(newStart));
    const r = getRemaining();
    if (r !== null) setRemaining(r);
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STOPPED_KEY);
    localStorage.removeItem('breach_portal_unlocked');
    clearInterval(intervalRef.current);
    setRemaining(TOTAL_SECONDS);
    setRunning(false);
    setStopped(false);
    setExpired(false);
  }, []);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      const r = getRemaining();
      if (r !== null) {
        setRemaining(r);
        if (r <= 0) {
          clearInterval(intervalRef.current);
          setExpired(true);
        }
      }
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  return (
    <TimerContext.Provider value={{ remaining, running, stopped, expired, start, stop, reset, penalize }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  return useContext(TimerContext);
}
