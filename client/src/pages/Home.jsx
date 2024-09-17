import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import MatchupImage from './MatchupImage';
import MatchupText from './MatchupText';
import Room1 from '../components/RoomLogic/room1';
import Room2 from '../components/RoomLogic/room2';
import Room3 from '../components/RoomLogic/room3';
import Room4 from '../components/RoomLogic/room4';
import Room5 from '../components/RoomLogic/room5';
import Room6 from '../components/RoomLogic/room6';
import Room7 from '../components/RoomLogic/room7';
import Room8 from '../components/RoomLogic/room8';
import Room9 from '../components/RoomLogic/room9';

const roomModals = {
  1: Room1,
  2: Room2,
  3: Room3,
  4: Room4,
  5: Room5,
  6: Room6,
  7: Room7,
  8: Room8,
  9: Room9,
};

const Home = () => {
  const [currentImage, setCurrentImage] = useState('startup.png');
  const [currentText, setCurrentText] = useState('');
  const [isStartup, setIsStartup] = useState(true);
  const [currentRoom, setCurrentRoom] = useState(1);
  const [showRoomModal, setShowRoomModal] = useState(false);

  const handleOpenRoomModal = () => setShowRoomModal(true);
  const handleCloseRoomModal = () => setShowRoomModal(false);

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

  const handleImageChange = (imageName, textFile, roomNumber) => {
    setCurrentImage(imageName);
    setIsStartup(false);
    setCurrentRoom(roomNumber);
    console.log(`Image changed to ${imageName}. Current Room set to ${roomNumber}`);
  };

  const handleDirection = (direction) => {
    let nextRoom = null;
    if (direction === 'west') {
      switch (currentRoom) {
        case 1:
          nextRoom = 2;
          break;
        case 2:
        case 3:
          nextRoom = 4;
          break;
        case 5:
          nextRoom = 7;
          break;
        case 6:
          nextRoom = 8;
          break;
        case 7:
        case 8:
          nextRoom = 9;
          break;
        default:
          break;
      }
    } else if (direction === 'east') {
      switch (currentRoom) {
        case 1:
          nextRoom = 3;
          break;
        case 2:
          nextRoom = 5;
          break;
        case 3:
          nextRoom = 6;
          break;
        case 5:
          nextRoom = 8;
          break;
        case 4:
          nextRoom = 7;
          break;
        case 6:
          nextRoom = 8;
          break;
        case 7:
        case 8:
          nextRoom = 9;
          break;
        default:
          break;
      }
    }

    if (nextRoom) {
      handleImageChange(`room${nextRoom}.png`, `room${nextRoom}.md`, nextRoom);
    }
  };

  // Define visibility of buttons based on current room
  const showGoWest = currentRoom !== 4 && currentRoom !== 7 && currentRoom !== 9;
  const showGoEast = currentRoom !== 6 && currentRoom !== 8 && currentRoom !== 9;

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
        {/* Conditionally render Go West button */}
        {showGoWest && (
          <button
            className="footer-button"
            onClick={() => handleDirection('west')}
          >
            Go West
          </button>
        )}
        <button
          className="footer-button"
          onClick={handleOpenRoomModal}
        >
          Challenge
        </button>
        {/* Conditionally render Go East button */}
        {showGoEast && (
          <button
            className="footer-button"
            onClick={() => handleDirection('east')}
          >
            Go East
          </button>
        )}
      </footer>
      {/* Dynamic room modal based on current room */}
      {React.createElement(roomModals[currentRoom], {
        show: showRoomModal,
        onClose: handleCloseRoomModal,
        content: <p>Room {currentRoom} Content</p>,
      })}
    </div>
  );
};

export default Home;
