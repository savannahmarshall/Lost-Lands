import React, { useState, useEffect } from 'react';

const Room1 = ({ show, onClose, content }) => {
  const [password, setPassword] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(null);

  // Load activation state from local storage on mount
  useEffect(() => {
    const storedActivationState = localStorage.getItem('room1Activated');
    setIsActivated(storedActivationState === 'true');
  }, []);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handlePasswordSubmit = () => {
    if (password === 'password1') {
      setIsActivated(true);
      localStorage.setItem('room1Activated', 'true');
      setIsPasswordCorrect(true);
    } else {
      setIsPasswordCorrect(false);
    }
  };

  return (
    show && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>X</button>
          <div className="modal-body">
            {!isActivated ? (
              <div>
                <p>This is a bad riddle, the answer is password1</p>
                <input
                  type="text"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button onClick={handlePasswordSubmit}>Submit</button>
                {isPasswordCorrect === false && (
                  <p style={{ color: 'red' }}>The spirits are confused. Try again.</p>
                )}
              </div>
            ) : (
              <div>
                <div>{content}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Room1;