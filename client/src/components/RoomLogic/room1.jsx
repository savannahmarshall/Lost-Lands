import React, { useState } from 'react';
import './room1.css';
import './challengeModals.css';

const Room1 = ({ show, onClose, inventory, setInventory }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const options = [
    { id: 1, text: 'Option 1', isCorrect: false },
    { id: 2, text: 'Option 2', isCorrect: false },
    { id: 3, text: 'Option 3', isCorrect: true }, // correct answer goes here
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
          mutation AddItem($name: String!, $description: String!, $image: String!) {
            addItem(name: $name, description: $description, image: $image) {
              name
              description
              image
            }
          }
        `,
        variables: {
          name: 'Room 1 Item',
          description: 'This is an item from Room 1',
          image: '/assets/fairy-wand.png',  // change icon here
        },
      }),
    });

    const result = await response.json();
    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      throw new Error('Failed to add item'); 
    }
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
    <div className="room1-container">
      <h1 className='room-title'>Lavenderlight Lair</h1>
      <div className="room1-image">
        {/* room 1 image will go here */}
        <img src="https://static.vecteezy.com/system/resources/previews/022/712/809/large_2x/a-beautiful-fairytale-enchanted-forest-at-night-made-of-glittering-crystals-with-trees-and-colorful-vegetation-generate-ai-free-photo.jpg" alt="Room 1" />
      </div>
      <div className="room1-text">
      At the edge of Lavenderlight Lair, faint purple light flickers through twisted trees. 
      The Noctraen Fae guard this dark forest, their magic woven into its shadows.
      Ahead, an archway leads deeper, but four glowing stones block your path. A whisper fills the air: 
      "Choose the stone that blooms in shadow.
Three deceive, one is true." Choose wrong, and the forest will claim you forever. Choose right, and the way forward will open.
      </div>

      {show && (
        <div className="challengemodal-overlay">
          <div className="challengemodal-content">
            <button className="challengemodal-close-button" onClick={onClose}>X</button>
            <div className="challengemodal-body">
              <p>Riddle goes here</p>
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