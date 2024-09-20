import React, { useState } from 'react';
import './room4.css'; 
import './challengeModals.css';

const Room4 = ({ show, onClose, inventory, setInventory }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const options = [
    { id: 1, text: 'Option 1', isCorrect: false },
    { id: 2, text: 'Option 2', isCorrect: false },
    { id: 3, text: 'Option 3', isCorrect: true },
    { id: 4, text: 'Option 4', isCorrect: false },
  ];

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
          name: 'Room 4 Item', 
          description: 'This is an item from Room 4',
        },
      }),
    });

    const result = await response.json();
    return result.data.addItem;
  };

  const handleOptionSelect = async (option) => {
    setSelectedOption(option);

    if (option.isCorrect) {
      try {
        const newItem = await addItem();
        setInventory([...inventory, newItem]);
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
        <img src="/path-to-room4-image.jpg" alt="Room 4" />
      </div>
      <div className="room-text">
        Text for Room 4 will go here later!
      </div>

      {show && (
        <div className="challengemodal-overlay">
          <div className="challengemodal-content">
            <button className="challengemodal-close-button" onClick={onClose}>X</button>
            <div className="challengemodal-body">
              <p>Solve the Riddle to Unlock an Item</p>
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

export default Room4;