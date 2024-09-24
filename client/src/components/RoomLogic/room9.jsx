import React, { useState } from 'react';
import './room9.css'; 
import './challengeModals.css';
import auth from '../../utils/auth';

const Room9 = ({ show, onClose, inventory, setInventory }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const options = [
    { id: 1, text: 'Globe', isCorrect: false },
    { id: 2, text: 'Scroll', isCorrect: false },
    { id: 3, text: 'Map', isCorrect: true },
    { id: 4, text: 'Compass', isCorrect: false },
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
            name: 'New Horizons Map', 
            description: 'This detailed map uncovers hidden pathways and ancient routes, revealing new territories and treasures waiting to be discovered.', 
            image: '/assets/map-icon.png', 
            ObjectID: auth.getProfile().userId 
          },
        }),
      });

      const result = await response.json();

      if (!result.data || !result.data.addItem) {
        throw new Error('Failed to add item. Please check the GraphQL response.');
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
    <div className="room-container9">
      <div className="room-image9">
        <img src="/assets/room-9.jpg" alt="Room 9" />
      </div>
      <div className="room-text9">
        You have solved the final riddle and found the map! This map shows you new horizons, meaning you can travel to many more places.
      </div>

      {show && (
        <div className="challengemodal-overlay">
          <div className="challengemodal-content">
            <button className="challengemodal-close-button" onClick={onClose}>X</button>
            <div className="challengemodal-body">
              <p>“I’m drawn on parchment, with lines and signs,
                Leading you forward through twists and climbs.
                Though I cannot speak, my guidance is clear,
                What am I, that shows you far and near?”</p>
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

export default Room9;