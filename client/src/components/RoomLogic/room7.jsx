import React, { useState } from 'react';
import './room7.css'; 
import './challengeModals.css';
import auth from '../../utils/auth';

const Room7 = ({ show, onClose, inventory, setInventory }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const options = [
    { id: 1, text: 'Icicle', isCorrect: false },
    { id: 2, text: 'Frost', isCorrect: false },
    { id: 3, text: 'Hail', isCorrect: false },
    { id: 4, text: 'Snowflake', isCorrect: true },
  ];

  const addItem = async () => {
    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation AddItem($ObjectID: ID, $name: String!, $description: String!, $image: String!) {
              addItem(ObjectID: $ObjectID, name: $name, description: $description, image: $image) {
                username
              }
            }
          `,
          variables: {
            name: 'Ice Key', 
            description: '', 
            image: '/assets/ice-key.png',  
            ObjectID: auth.getProfile().userId 
          },
        }),
      });

      const result = await response.json();
      console.log(result);

      if (!result.data || !result.data.addItem) {
        throw new Error('Item could not be added. Check GraphQL response.');
      }

      return result.data.addItem;
    } catch (error) {
      console.error('Error adding item:', error);
      throw error;
    }
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
    <div className="room-container7">
      <h1 className="room-header2">Ice-Capade</h1>
      <div className="room-image7">
        <img src="/assets/room-7.jpg" alt="Room 7" /> 
      </div>
      <div className="room-text7">
      As you activate the Teleportation Staff, you are instantly swept into a realm of ice and snow. The warmth of the Enchanted Flora Grove fades as a frigid wind greets you. Towering glaciers rise around you, casting long shadows over the frozen landscape. In the center, a large block of ice entombs a glowing ice key—your way forward.
      A faint, echoing voice calls through the wind:
      "Break the ice with wisdom, not force. Solve the riddle, and the ice key will be yours."
      </div>

      {show && (
        <div className="challengemodal-overlay">
          <div className="challengemodal-content">
            <button className="challengemodal-close-button" onClick={onClose}>X</button>
            <div className="challengemodal-body">
              <p>“I fall from the heavens, a whisper of white,
                Delicate dancer in the cold winter night.
                Each one is unique, a wonder to see,
                Blanketing the world in soft, sparkling glee.
                What am I, a fleeting beauty of frost's gentle might?”</p>
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

export default Room7;