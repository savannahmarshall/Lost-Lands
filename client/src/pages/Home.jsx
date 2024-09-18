import React, { useState } from 'react';
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
  const [currentPage, setCurrentPage] = useState('room1'); // Start with room1
  const [currentImage, setCurrentImage] = useState('room1.png');
  const [currentText, setCurrentText] = useState('');
  const [currentRoom, setCurrentRoom] = useState(1);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [roomUnlocked, setRoomUnlocked] = useState({});
  const [buttonsEnabled, setButtonsEnabled] = useState(false);

  //Current page logic
  const renderContent = () => {
    console.log(`Rendering page: ${currentPage}`);
  
    switch (currentPage) {
      case 'room1':
        console.log('Rendering Room 1');
        return <Room1 />;
      case 'room2':
        console.log('Rendering Room 2');
        return <Room2 />;
      default:
        console.log('Page not found');
        return <div>Page not found</div>;
    }
  };

  const handleOpenRoomModal = () => setShowRoomModal(true);
  const handleCloseRoomModal = () => setShowRoomModal(false);

  const handleImageChange = (imageName, textFile, roomNumber) => {
    setCurrentImage(imageName);
    setCurrentRoom(roomNumber);
  };

  const handleDirection = (direction) => {
    let nextRoom = null;
    if (direction === 'west') {
      switch (currentRoom) {
        case 1:
          nextRoom = 2;
          break;
        case 2:
          nextRoom = 4;
          break;
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
          nextRoom = 9;
          break;
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
          nextRoom = 9;
          break;
        case 8:
          nextRoom = 9;
          break;
        default:
          break;
      }
    }

    if (nextRoom) {
      console.log(`Transitioning from Room ${currentRoom} to Room ${nextRoom}`);

      localStorage.removeItem(`room${currentRoom}Activated`);
      setRoomUnlocked((prev) => ({ ...prev, [currentRoom]: false }));
      handleImageChange(`room${nextRoom}.png`, `room${nextRoom}.md`, nextRoom);
    }
  };

  const showGoWestButton = [1, 2, 3, 5, 6, 7, 8].includes(currentRoom);
  const showGoEastButton = [1, 2, 3, 5, 4, 6, 7, 8].includes(currentRoom) && currentRoom !== 9;

  return (
    <div className="container">
      <Navbar setImage={handleImageChange} setText={setCurrentText} />
      <div className="content">
        <div className="matchup-container">
          <div className="matchup-image">
            <MatchupImage src={`/assets/${currentImage}`} alt="Matchup Image" />
          </div>
          <div className="matchup-text">
            <MatchupText text={currentText} />
          </div>
        </div>
      </div>
      <footer className="footer">
        {showGoWestButton && (
          <button className="footer-button" onClick={() => handleDirection('west')}>
            Go West
          </button>
        )}
        <button className="footer-button" onClick={handleOpenRoomModal}>
          Challenge
        </button>
        {showGoEastButton && (
          <button className="footer-button" onClick={() => handleDirection('east')}>
            Go East
          </button>
        )}
      </footer>
      {React.createElement(roomModals[currentRoom], {
        show: showRoomModal,
        onClose: handleCloseRoomModal,
        content: <p>Room {currentRoom} Content</p>,
      })}
    </div>
  );
};

export default Home;
