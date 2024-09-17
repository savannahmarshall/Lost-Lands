// client/src/pages/MatchupImage.jsx
import React from 'react';

// Component to display the matchup image
const MatchupImage = ({ src, alt }) => {
  return (
    <div className="matchup-image">
      {/* Image element with source and alt text */}
      <img src={src} alt={alt} />
    </div>
  );
};

export default MatchupImage;