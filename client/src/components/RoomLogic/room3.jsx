import React, { useState } from 'react';
import './room3.css'; 
import './challengeModals.css';
import auth from '../../utils/auth';

const Room3 = ({ show, onClose, inventory, setInventory }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const options = [
    { id: 1, text: 'Crystal', isCorrect: true },
    { id: 2, text: 'Rock', isCorrect: false },
    { id: 3, text: 'Fossil', isCorrect: false },
    { id: 4, text: 'Pearl', isCorrect: false },
  ];

  const addItem = async () => {
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
          name: 'Amethyst Crystal',
          description: 'A beautiful amethyst crystal that shimmers in the light, radiating a deep purple hue. Found in the depths of the cave, it is said to enhance intuition and bring peace.',
          image: '/assets/Amethyst-crystal.png',
          ObjectID: auth.getProfile().userId
        },
      }),
    });
  
    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors[0].message);
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
    <div className="room-container3">
       <h1 className="room-header2">Amethyst Hollow</h1>
      <div className="room-image3">
        <img src="/assets/room-3.jpg" alt="Room 3" />
      </div>
      <div className="room-text3">
      As you step into the dark cave, the air feels cooler and the faint sound of dripping water echoes in the distance. The walls shimmer with a soft glow, revealing a series of ancient inscriptions etched into the stone. You move closer to read the riddle, illuminated by the light from your glowing mushroom. 
      </div>

      {show && (
        <div className="challengemodal-overlay">
          <div className="challengemodal-content">
            <button className="challengemodal-close-button" onClick={onClose}>X</button>
            <div className="challengemodal-body">
              <p>“I am born from stone, yet I dance in the light,
                In darkness, I shimmer, a beautiful sight.
                With stalactites above and stalagmites below,
                What am I, in this cavern where secrets flow?”</p>
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

export default Room3;