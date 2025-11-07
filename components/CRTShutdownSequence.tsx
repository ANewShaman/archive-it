import React from 'react';

interface CrtShutdownSequenceProps {
  shutdownState: 'none' | 'alert' | 'collapse' | 'off';
}

const CrtShutdownSequence: React.FC<CrtShutdownSequenceProps> = ({ shutdownState }) => {
  if (shutdownState === 'none') {
    return null;
  }

  if (shutdownState === 'alert') {
    return (
      <div className="shutdown-alert-overlay">
        <div className="shutdown-alert-text">
          ⚠ WARNING ⚠<br/>
          RUNNER DETECTED<br/>
          WARNING! WARNING!
        </div>
      </div>
    );
  }
  
  if (shutdownState === 'collapse') {
    return (
      <div className="shutdown-collapse-overlay">
        <div className="crt-crack-line"></div>
      </div>
    );
  }
  
  return null;
};

export default CrtShutdownSequence;
