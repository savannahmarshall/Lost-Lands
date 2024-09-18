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
  const [currentImage, setCurrentImage] = useState('home.png'); 
  const [currentText, setCurrentText] = useState('Welcome to the Home Screen');
  const [currentRoom, setCurrentRoom] = useState(0); 
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Redirect to Room 1 upon authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Redirect to Room 1
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentRoom(1);
      setCurrentImage('room1.png');
      setCurrentText('Room 1 Content');
    }
  }, [isAuthenticated]);

  // const handleLogin = () => {
  //   localStorage.setItem('token', 'your-token'); 
  //   setIsAuthenticated(true);
  // };

  const handleOpenRoomModal = () => setShowRoomModal(true);
  const handleCloseRoomModal = () => setShowRoomModal(false);

  const handleImageChange = (imageName, textFile, roomNumber) => {
    setCurrentImage(imageName);
    setCurrentText(textFile);
    setCurrentRoom(roomNumber);
  };

  const handleDirection = (direction) => {
    let nextRoom = null;
    if (direction === 'west') {
      nextRoom = currentRoom > 1 ? currentRoom - 1 : null;
    } else if (direction === 'east') {
      nextRoom = currentRoom < 9 ? currentRoom + 1 : null;
    }

    console.log(`Current Room: ${currentRoom}, Next Room: ${nextRoom}`);

    if (nextRoom) {
      handleImageChange(`room${nextRoom}.png`, `Room ${nextRoom} Content`, nextRoom);
    }
  };

  const renderDirectionButtons = () => {
    const isFirstRoom = currentRoom === 1;
    const isLastRoom = currentRoom === 9;

    return (
      <>
        {!isFirstRoom && isAuthenticated && (
          <button className="footer-button" onClick={() => handleDirection('west')}>
            Go West
          </button>
        )}
        {isAuthenticated && (
          <button className="footer-button" onClick={handleOpenRoomModal}>
            Challenge
          </button>
        )}
        {!isLastRoom && isAuthenticated && (
          <button className="footer-button" onClick={() => handleDirection('east')}>
            Go East
          </button>
        )}
      </>
    );
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
            <MatchupText text={currentText} />
          </div>
        </div>
      </div>
      <footer className="footer">
        {renderDirectionButtons()}
      </footer>
      {currentRoom !== 0 && React.createElement(roomModals[currentRoom], {
        show: showRoomModal,
        onClose: handleCloseRoomModal,
        content: `Room ${currentRoom} Content`,
      })}
    </div>
  );
};

export default Home;