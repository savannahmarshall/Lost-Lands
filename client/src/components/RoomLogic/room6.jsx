import React, { useState } from 'react';
import './room6.css'; 
import './challengeModals.css';
import auth from '../../utils/auth';

const Room6 = ({ show, onClose, inventory, setInventory }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const options = [
    { id: 1, text: 'Foxglove', isCorrect: false },
    { id: 2, text: 'Bluebell', isCorrect: false },
    { id: 3, text: 'Lily of the Valley', isCorrect: true },
    { id: 4, text: 'Jasmine', isCorrect: false },
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
            name: 'Enchanted Lily Bell',
            description: 'A delicate bloom from the enchanted forest, these bell-shaped flowers are said to bring good fortune and protection to those who carry them. Their sweet fragrance can soothe weary souls and is often used in potions for healing.', 
            image: '/assets/lily-icon.png', 
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
    <div className="room-container6">
      <h1 className="room-header2">Enchanted Flora Grove</h1>
      <div className="room-image6">
        <img src="/assets/room-6.jpg" alt="Room 6" />
      </div>
      <div className="room-text6">
        Text for Room 6 will go here later!
      </div>

      {show && (
        <div className="challengemodal-overlay">
          <div className="challengemodal-content">
            <button className="challengemodal-close-button" onClick={onClose}>X</button>
            <div className="challengemodal-body">
              <p>“In hidden glades where fairies play,
                I bloom in shadows, soft and gray.
                With bell-shaped flowers, sweet and small,
                What am I, cherished by all?”</p>
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

export default Room6;