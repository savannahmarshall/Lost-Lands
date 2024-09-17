// client/src/pages/MatchupText.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';

// Component to display the matchup text
const MatchupText = ({ text, isStartup }) => {
  return (
    <div className={`matchup-text ${isStartup ? 'large-font' : ''}`}>
      {/* ReactMarkdown component to render markdown text */}
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};

export default MatchupText;