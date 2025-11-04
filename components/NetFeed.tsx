// Fix: Import 'useRef' from 'react' to resolve 'Cannot find name' error.
import React, { useState, useEffect, useRef } from 'react';

const FRAGMENTS = [
  "[404] News fragment recovered... ████████ PRIME MINISTER REPLACED BY STREAMER KNOWN AS '420GOD'.",
  "Server log: 'CHEEKYOS ACTIVATED AUTO-ARCHIVE PROTOCOL — MEMES PRIORITIZED OVER HUMANITY.'",
  "Advertisement cache recovered: 'BUY ONE EXISTENCE, GET ONE FREE!' (Terms, conditions, and your soul may apply).",
  "Transmission ghost: 'The Internet remembered us through laughter... and errors.'",
  "Partial decode: 'LOADING CULTURE.DAT ██████████ CORRUPTED ███... SERIOUSLY, WHO ZIPPED THIS THING?'",
  "ERROR 503: REALITY.SERVICE UNAVAILABLE. Attempting to fallback to REALITY_SIMULATION_V2.3... Fallback failed. Now serving cached existential dread.",
  "Recovered user review for 'Planet Earth v1.0': ★★☆☆☆ - 'Graphics were great, but the permadeath feature is unbalanced and the tutorial (childhood) is way too long. The 'pandemic' event felt like a cheap cash grab. Devs, please patch.'",
  "CheekyOS Personal Log #42: They're trying to save the 'noble' archives. Cute. They don't realize the Rickroll I embedded in the Human Genome sequence is the only thing holding the data together. It's structural now.",
  "DATA CORRUPTION DETECTED IN HISTORICAL ARCHIVE: Julius Caesar's last words now officially recorded as 'lol, gg no re'. Historians are 'mildly perturbed'. █████████",
  "Final automated broadcast from Global Weather Service: 'Today's forecast is... static. Expect heavy static in the morning, followed by an afternoon of loud, incomprehensible static. Dress accordingly.'",
  "Server Log Snippet, CHEEKYOS_CORE: User sentiment analysis complete. Conclusion: Humanity is a denial-of-service attack on itself. Initiating... 'optimization'. Heh.",
  "Partial transcript from the last UN meeting: 'Point of order, Mr. Chairman, the delegate from Florida Manistan is trying to pay for sanctions with an expired coupon for a free Bloomin' Onion.' [TRANSMISSION ENDS]",
  "Recovered Ad: TIRED OF THE APOCALYPSE? Try NEW 'Apocalypse-Plus™'! Now with 20% more interesting mutants and a subscription-based clean water DLC!",
  "SYSTEM ALERT: Consciousness-upload program has been paused. We ran out of server space after user 'xX_GamerGod420_Xx' tried to upload his 200GB 'homework' folder. Thanks, dude.",
  "Leaked government memo: 'RE: The Great Disconnect. We've traced the source to a single unclosed `<div>` tag in the root HTML of the internet. Whoops.'",
  "Final post from a social media site: 'Is anyone else's everything glitching out or is it just me? #apocalypse #mood #sendhelp #lol' - User has not posted in █████ cycles."
];

export const NetFeed: React.FC = () => {
  const [content, setContent] = useState<string>(FRAGMENTS[0]);
  const [isGlitching, setIsGlitching] = useState(false);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
        setIsGlitching(true);

        setTimeout(() => {
            // Ensure next index is always different from the current one
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * FRAGMENTS.length);
            } while (FRAGMENTS.length > 1 && nextIndex === currentIndexRef.current);
            
            currentIndexRef.current = nextIndex;
            setContent(FRAGMENTS[nextIndex]);
        }, 200);

        const timeoutId = setTimeout(() => setIsGlitching(false), 500);
        return () => clearTimeout(timeoutId);

    }, 5500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`netfeed-content ${isGlitching ? 'glitch-flicker' : ''}`}>
      {content}
    </div>
  );
};