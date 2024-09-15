// client/src/pages/Home.jsx
import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import MatchupImage from './MatchupImage';
import MatchupText from './MatchupText';

const Home = () => {
  const [currentImage, setCurrentImage] = useState('startup.png');
  const [currentText, setCurrentText] = useState('');
  const [isStartup, setIsStartup] = useState(true);

  useEffect(() => {
    const fetchStartupText = async () => {
      try {
        const response = await fetch('/assets/startup.md');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const text = await response.text();
        setCurrentText(text);
      } catch (error) {
        console.error('Failed to fetch startup text:', error);
        setCurrentText('Failed to load startup text content.');
      }
    };

    fetchStartupText();
  }, []);

  const handleImageChange = (imageName, textFile) => {
    setCurrentImage(imageName);
    setIsStartup(false);
    // Fetch the text content for the selected room
    // ...
  };

  return (
    <div className="container">
      <Navbar setImage={handleImageChange} setText={setCurrentText} />
      <div className="content">
        <div className="matchup-container">
          <div className="matchup-image">
            <MatchupImage src={`/assets/${currentImage}`} alt="Matchup Image" />
          </div>
          <div className="matchup-text">
            <MatchupText text={currentText} isStartup={isStartup} />
          </div>
        </div>
      </div>
      <footer className="footer">
        <button className="footer-button">Option 1</button>
        <button className="footer-button">Option 2</button>
        <button className="footer-button">Option 3</button>
      </footer>
    </div>
  );
};

export default Home;