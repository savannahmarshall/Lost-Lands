import React from 'react';
import './RoomLogic/challengeModals.css';

const InstructionsModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>X</button>
        <div className="modal-body">
          <h2>Game Instructions</h2>
          <p>
            Welcome to Lost Lands! Your objective is to navigate through various rooms,
            solve riddles, and collect items. Use your inventory to manage collected items,
            and make sure to choose the correct options to unlock new items. Good luck!
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;