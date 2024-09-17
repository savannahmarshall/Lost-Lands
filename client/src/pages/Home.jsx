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
  const [roomUnlocked, setRoomUnlocked] = useState({});
  const [buttonsEnabled, setButtonsEnabled] = useState(false);

  useEffect(() => {
    // Reset all rooms to unlocked
    const activationState = {};
    for (let i = 1; i <= 9; i++) {
      activationState[i] = true;
      localStorage.setItem(`room${i}Activated`, 'true'); // Set local storage to unlocked
    }
    setRoomUnlocked(activationState);
  }, []);

  const handleOpenRoomModal = () => setShowRoomModal(true);
  const handleCloseRoomModal = () => setShowRoomModal(false);

  const handleImageChange = (imageName, textFile, roomNumber) => {
    setCurrentImage(imageName);
    setIsStartup(false);
    setCurrentRoom(roomNumber);
  };

  const handleDirection = (direction) => {
    let nextRoom = null;
    if (direction === 'west') {
      switch (currentRoom) {
        case 1: nextRoom = 2; break;
        case 2: nextRoom = 4; break;
        case 3: nextRoom = 4; break;
        case 5: nextRoom = 7; break;
        case 6: nextRoom = 8; break;
        case 7: nextRoom = 9; break;
        case 8: nextRoom = 9; break;
        default: break;
      }
    } else if (direction === 'east') {
      switch (currentRoom) {
        case 1: nextRoom = 3; break;
        case 2: nextRoom = 5; break;
        case 3: nextRoom = 6; break;
        case 5: nextRoom = 8; break;
        case 4: nextRoom = 7; break;
        case 6: nextRoom = 8; break;
        case 7: nextRoom = 9; break;
        case 8: nextRoom = 9; break;
        default: break;
      }
    }

    if (nextRoom) {
      localStorage.removeItem(`room${currentRoom}Activated`);
      setRoomUnlocked((prev) => ({ ...prev, [currentRoom]: false }));
      handleImageChange(`room${nextRoom}.png`, `room${nextRoom}.md`, nextRoom);
    }
  };

  const handleRoomUnlock = (roomNumber) => {
    setRoomUnlocked((prev) => {
      const updated = { ...prev, [roomNumber]: true };
      console.log('Updated Room Unlocked Status:', updated);
      return updated;
    });
    localStorage.setItem(`room${roomNumber}Activated`, 'true');
  };

  const isWestDisabled = !buttonsEnabled || !roomUnlocked[currentRoom];
  const isEastDisabled = !buttonsEnabled || !roomUnlocked[currentRoom];

  // Determine button visibility based on the current room
  const showGoWestButton = [1, 2, 3, 5, 6, 7, 8].includes(currentRoom);
  const showGoEastButton = [1, 2, 3, 5, 4, 6, 7, 8].includes(currentRoom) && currentRoom !== 9;

  console.log(`Room ${currentRoom}:`);
  console.log(`- West Button Disabled: ${isWestDisabled}`);
  console.log(`- East Button Disabled: ${isEastDisabled}`);
  console.log(`- Buttons Enabled: ${buttonsEnabled}`);
  console.log(`- Room Unlocked Status:`, roomUnlocked);

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
        {showGoWestButton && (
          <button
            className="footer-button"
            onClick={() => handleDirection('west')}
            disabled={isWestDisabled}
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
        {showGoEastButton && (
          <button
            className="footer-button"
            onClick={() => handleDirection('east')}
            disabled={isEastDisabled}
          >
            Go East
          </button>
        )}
        <button
          className="footer-button"
          onClick={() => setButtonsEnabled((prev) => !prev)}
        >
          Toggle Buttons {buttonsEnabled ? 'Disable' : 'Enable'}
        </button>
      </footer>
      {React.createElement(roomModals[currentRoom], {
        show: showRoomModal,
        onClose: handleCloseRoomModal,
        content: <p>Room {currentRoom} Content</p>,
        onUnlock: () => handleRoomUnlock(currentRoom),
      })}
    </div>
  );
};

export default Home;
