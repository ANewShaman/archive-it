import React, { useState, useEffect } from "react";

export const Notepad: React.FC = () => {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Idle");

  // Load saved notes
  useEffect(() => {
    const saved = localStorage.getItem("runnerLog");
    if (saved) setContent(saved);
  }, []);

  // Auto-save every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("runnerLog", content);
      setStatus("Syncing to Local Node...");
      setTimeout(() => setStatus("Entry saved (mostly)."), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, [content]);

  // Occasional corruption (1 in 200 chance every save)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.005) {
        setContent(prev => prev.replace(/[aeiou]/gi, "█"));
        setStatus("!! Data fragment lost. Restoring...");
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-2 bg-[#101010] text-lime-400 h-full flex flex-col font-mono">
      <div className="text-xs text-lime-600 border-b border-lime-700 mb-2 pb-1">
        RunnerLog v2.9.3 — "Write fast. The Archive leaks."
      </div>
      <textarea
        className="flex-1 bg-transparent outline-none resize-none text-lime-300 tracking-wide caret-lime-400"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="> Start typing your findings here..."
      />
      <div className="text-xs text-lime-600 mt-2">{status}</div>
    </div>
  );
};
