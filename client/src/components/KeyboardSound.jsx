import { useEffect, useRef, useState } from "react";

export default function KeyboardSound() {
  const sound1 = useRef(new Audio("/sounds/keypress.mp3"));
  const sound2 = useRef(new Audio("/sounds/keypress1.mp3"));

  const [useFirst, setUseFirst] = useState(true);

  useEffect(() => {
    const handleKeyPress = () => {
      const audio = useFirst ? sound1.current : sound2.current;
      audio.currentTime = 0;
      audio.play().catch(() => {});
      setUseFirst(!useFirst);
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [useFirst]);

  return null; // composant invisible
}