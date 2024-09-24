import React, { useState } from 'react';
import './room8.css'; 
import './challengeModals.css';
import auth from '../../utils/auth';

const Room8 = ({ show, onClose, inventory, setInventory }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const options = [
    { id: 1, text: 'Binoculars', isCorrect: false },
    { id: 2, text: 'Telescope', isCorrect: true },
    { id: 3, text: 'Spyglass', isCorrect: false },
    { id: 4, text: 'Kaleidoscope', isCorrect: false },
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
            name: 'Celestial Lens', 
            description: 'A beautifully crafted lens that enhances vision beyond the stars. It’s said to reveal secrets of the universe and can unlock hidden paths in the night sky.', 
            image: '/assets/celestial-lens.png',  
            ObjectID: auth.getProfile().userId 
          },
        }),
      });

      const result = await response.json();

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
    <div className="room-container8">
      <div className="room-image8">
        <img src="/path-to-room8-image.jpg" alt="Room 8" /> 
      </div>
      <div className="room-text8">
        Text for Room 8 will go here later!
      </div>

      {show && (
        <div className="challengemodal-overlay">
          <div className="challengemodal-content">
            <button className="challengemodal-close-button" onClick={onClose}>X</button>
            <div className="challengemodal-body">
              <p>“High above the world, where dreams take flight,
                I watch the heavens, a canvas of night.
                With a lens to see the stars' twinkling grace,
                What am I, in this celestial place?”</p>
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

export default Room8;