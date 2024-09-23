import React, { useState } from 'react';
import './room7.css'; 
import './challengeModals.css';

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
            mutation AddItem($name: String!, $description: String!, $image: String!) {
              addItem(name: $name, description: $description, image: $image) {
                name
                description
                image
              }
            }
          `,
          variables: {
            name: 'Ice Climbing Gear', 
            description: 'A set of sturdy equipment designed to grip icy surfaces, essential for traversing the treacherous glacier. With this gear, you can navigate the frozen landscape and escape the frigid embrace of the ice.', 
            image: '/assets/ice-axe.png',  
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
        Text for Room 7 will go here later!
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