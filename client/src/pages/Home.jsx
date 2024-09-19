import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Room1 from '../components/RoomLogic/room1';
import Room2 from '../components/RoomLogic/room2';
import Room3 from '../components/RoomLogic/room3';
import Room4 from '../components/RoomLogic/room4';
import Room5 from '../components/RoomLogic/room5';
import Room6 from '../components/RoomLogic/room6';
import Room7 from '../components/RoomLogic/room7';
import Room8 from '../components/RoomLogic/room8';
import Room9 from '../components/RoomLogic/room9';

const roomComponents = {
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
  const [currentRoom, setCurrentRoom] = useState(0); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  // Check for authentication token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  
  // After user logins in and is authenicated, render room 1
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentRoom(1);
  
    }
  }, [isAuthenticated]);


  const handleDirection = (direction) => {
    let nextRoom = null;
    if (direction === 'west') {
      nextRoom = currentRoom > 1 ? currentRoom - 1 : null;
    } else if (direction === 'east') {
      nextRoom = currentRoom < 9 ? currentRoom + 1 : null;
    }

    if (nextRoom) {
      setCurrentRoom(nextRoom);
    }
  };

  const renderDirectionButtons = () => {
    const isFirstRoom = currentRoom === 1;
    const isLastRoom = currentRoom === 9;

    return (
      <>
        {!isFirstRoom && isAuthenticated && (
          <button className="footer-button" onClick={() => handleDirection('west')}>
            Previous Room
          </button>
        )}
        {isAuthenticated && (
          <button className="footer-button" onClick={() => setIsModalOpen(true)}> 
            Challenge
          </button>
        )}
        {!isLastRoom && isAuthenticated && (
          <button className="footer-button" onClick={() => handleDirection('east')}>
            Next Room
          </button>
        )}
      </>
    );
  };

  // Renders the current room component based on currentRoom state
  const CurrentRoomComponent = roomComponents[currentRoom];

  return (
    <div className="container">
      <Navbar />
      <div className="content">
        {}
        {CurrentRoomComponent && <CurrentRoomComponent show={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      </div>
      <footer className="footer">
        {renderDirectionButtons()}
      </footer>
    </div>
  );
};

export default Home;