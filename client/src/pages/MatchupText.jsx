// client/src/pages/MatchupText.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';

const MatchupText = ({ text, isStartup }) => {
  return (
    <div className={`matchup-text ${isStartup ? 'large-font' : ''}`}>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};

export default MatchupText;