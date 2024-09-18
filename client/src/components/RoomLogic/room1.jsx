import React, { useState, useEffect } from 'react';
import './room1.css';
import './challengeModals.css';

const Room1 = ({ show, onClose, content }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const options = [
    { id: 1, text: 'Option 1', isCorrect: false },
    { id: 2, text: 'Option 2', isCorrect: false },
    { id: 3, text: 'Option 3', isCorrect: true }, // put the correct answer to the challenge here later
    { id: 4, text: 'Option 4', isCorrect: false },
  ];

  const handleOptionSelect = async (option) => {
    setSelectedOption(option);
    if (option.isCorrect) {
      // Make an API call to save the item to MongoDB Atlas database.
      try {
        const response = await fetch('/api/inventory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ item: 'Your Item Name' }), // put the actual item data later
        });

        if (response.ok) {
          setIsCorrect(true);
        } else {
          setIsCorrect(false);
        }
      } catch (error) {
        console.error('Error saving item:', error);
        setIsCorrect(false);
      }
    } else {
      setIsCorrect(false);
    }
  };

  return (
    show && (
      <div className="challengemodal-overlay">
        <div className="challengemodal-content">
          <button className="challengemodal-close-button" onClick={onClose}>X</button>
          <div className="challengemodal-body">
            <p>Select the correct option:</p>
            <div>
              {options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                  className="challengemodal-option"
                >
                  {option.text}
                </button>
              ))}
            </div>
            {isCorrect === true && (
              <p className="challengemodal-success">Item added to your inventory!</p>
            )}
            {isCorrect === false && (
              <p className="challengemodal-error">Incorrect option, try again!</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Room1;