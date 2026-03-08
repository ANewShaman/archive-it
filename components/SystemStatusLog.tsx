import React from 'react';

interface SystemStatusLogProps {
  passwordRevealed: boolean;
}

export const SystemStatusLog: React.FC<SystemStatusLogProps> = ({ passwordRevealed }) => {
  return (
    <div className="text-gray-400 text-sm whitespace-pre-wrap h-full overflow-y-auto">
{`SYSBOOT OK
KERNEL v6.66 LOADED
NETWORK OFFLINE
MEMORY CORRUPTION DETECTED: SEG 0xFA11
POWER MODULE: STABLE
LAST KERNEL PANIC CODE: 42
`}
{passwordRevealed
    ? `ARCHIVE PASSWORD: MEME_OVERRIDE_198X\n# Huh. That wasn’t supposed to show up.`
    : `ARCHIVE PASSWORD: ███████████████████`}
    </div>
  );
};
