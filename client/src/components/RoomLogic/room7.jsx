import React from 'react';
import './room7.css';
import './challengeModals.css';

const Room7 = ({ show, onClose, content }) => {
  return (
    show && (
      <div className="challengemodal-overlay">
        <div className="challengemodal-content">
          <button className="challengemodal-close-button" onClick={onClose}>X</button>
          <div className="challengemodal-body">
            <h2 className="challengemodal-title">Room 7 Modal</h2>
            <div className="challengemodal-activated-content">
              <div>{content}</div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Room7;