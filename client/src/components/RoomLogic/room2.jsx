import React, { useState } from 'react';
import './room2.css';
import './challengeModals.css';
import auth from '../../utils/auth';

const Room2 = ({ show, onClose, inventory, setInventory }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const options = [
    { id: 1, text: 'Lichen', isCorrect: false },
    { id: 2, text: 'Mushroom', isCorrect: true },
    { id: 3, text: 'Tree Root', isCorrect: false },
    { id: 4, text: 'Moss', isCorrect: false },
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
          name: 'Glowing Mushroom',
          description: 'A rare mushroom with a vibrant glow-in-the-dark property, often cherished by adventurers for its ability to light the way in the darkest of places.',
          image: '/assets/glowing-mushroom.png', 
          ObjectID: auth.getProfile().userId
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
    <div className="room-container2">
      <h1 className="room-header2">Mystic Mushroom Valley</h1>
      <div className="room-image2">
        <img src="/assets/room-2.jpg" alt="Room 2" />
      </div>
      <div className="room-text2">
        <p>After passing through Lavenderlight Lair, you find yourself in Mystic Mushroom Valley. The air is thick with the earthy scent of damp soil and vibrant fungi. As you venture deeper, a foreboding dark cave looms ahead, its entrance shadowed and menacing. You can’t navigate through without a light source. Just then, you notice a note partially sticking out from beneath a heavy door, beckoning you closer.</p>
      </div>

      {show && (
        <div className="challengemodal-overlay">
          <div className="challengemodal-content">
            <button className="challengemodal-close-button" onClick={onClose}>X</button>
            <div className="challengemodal-body">
              <p>"I sprout in the damp, I thrive in the shade,
                I carry a cap, but no feet I display.
                Some call me a fungus, others call me food,
                But choose the wrong one, and you'll rue your mood.
                What am I?"</p>
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

export default Room2;