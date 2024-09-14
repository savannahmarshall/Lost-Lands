// client/src/pages/MatchupImage.jsx
import React from 'react';

const MatchupImage = ({ src, alt }) => {
  return (
    <div className="matchup-image">
      <img src={src} alt={alt} />
    </div>
  );
};

export default MatchupImage;