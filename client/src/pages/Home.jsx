// client/src/pages/Home.jsx
import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import MatchupImage from './MatchupImage';
import MatchupText from './MatchupText';

const Home = () => {
  // State to manage the current image being displayed
  const [currentImage, setCurrentImage] = useState('startup.png');
  // State to manage the current text being displayed
  const [currentText, setCurrentText] = useState('');
  // State to check if it's the startup phase
  const [isStartup, setIsStartup] = useState(true);

  useEffect(() => {
    // Function to fetch the startup text content
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

    // Fetch the startup text when the component mounts
    fetchStartupText();
  }, []);

  // Function to handle image and text change
  const handleImageChange = (imageName, textFile) => {
    setCurrentImage(imageName);
    setIsStartup(false);
    // Fetch the text content for the selected room
    // ...
  };

  return (
    <div className="container">
      {/* Navbar component with props to set image and text */}
      <Navbar setImage={handleImageChange} setText={setCurrentText} />
      <div className="content">
        <div className="matchup-container">
          <div className="matchup-image">
            {/* MatchupImage component to display the current image */}
            <MatchupImage src={`/assets/${currentImage}`} alt="Matchup Image" />
          </div>
          <div className="matchup-text">
            {/* MatchupText component to display the current text */}
            <MatchupText text={currentText} isStartup={isStartup} />
          </div>
        </div>
      </div>
      <footer className="footer">
        {/* Logic for Gates and Challenges */}
        <button className="footer-button">Option 1</button>
        <button className="footer-button">Option 2</button>
        <button className="footer-button">Option 3</button>
      </footer>
    </div>
  );
};

export default Home;