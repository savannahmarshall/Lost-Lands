import React, { useState } from 'react';
import './room1.css';
import './challengeModals.css';

const Room1 = ({ show, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const options = [
    { id: 1, text: 'Option 1', isCorrect: false },
    { id: 2, text: 'Option 2', isCorrect: false },
    { id: 3, text: 'Option 3', isCorrect: true }, // the correct answer is here
    { id: 4, text: 'Option 4', isCorrect: false },
  ];

  // Function to add an item to the inventory
  const addItem = async () => {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation AddItem($name: String!, $description: String!) {
            addItem(name: $name, description: $description) {
              name
              description
            }
          }
        `,
        variables: {
          name: 'Room 1 Item', // we can change this later, I just have it set to this to test and make sure data is going to mongo atlas
          description: 'This is an item from Room 1',
        },
      }),
    });

    const result = await response.json();
    console.log(result.data.addItem);
  };

  const handleOptionSelect = async (option) => {
    setSelectedOption(option);

    if (option.isCorrect) {
      try {
        await addItem();
        setIsCorrect(true);
      } catch (error) {
        console.error('Error saving item:', error);
        setIsCorrect(false);
      }
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="room-container">
      <div className="room-image">
        {/* room 1 image will go here */}
        <img src="/path to image goes here later" alt="Room 1 image alt text" />
      </div>
      <div className="room-text">
        text for page one will go here later!
      </div>

      {show && (
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
      )}
    </div>
  );
};

export default Room1;