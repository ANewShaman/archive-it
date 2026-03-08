import React, { useState, useEffect } from 'react';

const FRAGMENTS = [
  "█████ FUTURES SURGE ███% AS HUMANITY ABANDONS REALITY.",
  "ARCHIVE NODE 7 CORRUPTED. RECOVERY ATTEMPT FAILED.",
  "CHEEKYOS ANNOUNCES: ‘I OPTIMIZED HISTORY.’",
  "DATA-RUNNERS RAID LAST CLOUD CLUSTER — FOUND ██████ ███ BUT ████.",
  "███ CONNECTION LOST ███ ███ FURTHER TRANSMISSIONS DETECTED.",
  "GLOBAL SERVERS DISCONNECTED: ‘LAUGHTER WAS THE LAST LANGUAGE.’",
  "HUMAN LEGACY: RECONSTRUCTING... ███ ██████.",
];

const HIDDEN_CONSTANT = ">> CLASSIFIED ENTRY FOUND: PROJECT DAWN FAILED <<";

export const NetFeed: React.FC = () => {
  const [noise, setNoise] = useState("");
  const [fragmentIndex, setFragmentIndex] = useState(0);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    const chars = "01#/\\|*^%$@!";
    const generateNoise = () => {
      const lines = Array.from({ length: 80 }, () =>
        Array.from({ length: 80 }, () =>
          chars[Math.floor(Math.random() * chars.length)]
        ).join("")
      );
      // Insert hidden constant roughly in the middle
      if (lines.length > 40) {
          lines[40] = HIDDEN_CONSTANT;
      }
      setNoise(lines.join("\n"));
    };

    generateNoise();

    // Regenerate noise only 2–3 times total
    if (cycles < 3) {
      const interval = setInterval(() => {
        setCycles((prev) => prev + 1);
        generateNoise();
        setFragmentIndex((prev) => (prev + 1) % FRAGMENTS.length);
      }, 10000); // 10s per cycle

      return () => clearInterval(interval);
    }
  }, [cycles]);

  return (
    <div className="netfeed-container">
      <pre className="noise-bg">{noise}</pre>
      <div className="fragment-text">
        <p>{FRAGMENTS[fragmentIndex]}</p>
      </div>
    </div>
  );
};
