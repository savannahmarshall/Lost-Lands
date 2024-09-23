import React, { useState } from 'react';
import './room4.css'; 
import './challengeModals.css';

const Room4 = ({ show, onClose, inventory, setInventory }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const options = [
    { id: 1, text: 'Spring', isCorrect: false },
    { id: 2, text: 'River', isCorrect: false },
    { id: 3, text: 'Rain', isCorrect: false },
    { id: 4, text: 'Waterfall', isCorrect: true },
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
            mutation AddItem($name: String!, $description: String!, $image: String!) {
              addItem(name: $name, description: $description, image: $image) {
                name
                description
                image
              }
            }
          `,
          variables: {
            name: 'Ancient Coin', 
            description: 'A weathered coin that belonged to a traveler long ago, said to grant wishes when tossed into the water.',
            image: '/assets/coin-icon.png',  
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
    <div className="room-container4">
      <h1 className="room-header2">Tranquility Falls</h1>
      <div className="room-image4">
        <img src="/assets/room-4.jpg" alt="Room 4" />
      </div>
      <div className="room-text4">
      With the amethyst crystal in hand, you sense its power guiding you deeper into the cave. Following the sound of rushing water, you venture forward, knowing it will lead you to a hidden waterfall where peace awaits.
      As you approach the waterfall, you notice a weathered stone pedestal partially covered in moss. Intrigued, you brush away the greenery to reveal a beautifully bound book resting on the pedestal. The first page explains that once the riddle is solved, the coins power is unlocked.

      </div>

      {show && (
        <div className="challengemodal-overlay">
          <div className="challengemodal-content">
            <button className="challengemodal-close-button" onClick={onClose}>X</button>
            <div className="challengemodal-body">
              <p>“I tumble down mountains with grace and might,
                In pools and streams, I sparkle in light.
                I sing a sweet song as I cascade free,
                What am I, where nature's beauty you see?”</p>
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