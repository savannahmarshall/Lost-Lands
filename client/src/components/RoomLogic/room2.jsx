// client/src/components/RoomLogic/Room1.jsx
import React from 'react';
import './room2.css';

const Room2 = ({ show, onClose, content }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h1 className="modal-title">Room 2</h1>
        <div className="modal-content">
          {content}
        </div>
        <div className="buttons-container">
          <button className="modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room2;