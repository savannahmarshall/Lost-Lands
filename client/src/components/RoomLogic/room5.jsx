import React, { useState } from 'react';
import './room5.css'; 
import './challengeModals.css';

const Room5 = ({ show, onClose, inventory, setInventory }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const options = [
    { id: 1, text: 'Portal', isCorrect: false },
    { id: 2, text: 'Teleportation', isCorrect: true },
    { id: 3, text: 'Gateway', isCorrect: false },
    { id: 4, text: 'Wormhole', isCorrect: false },
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
          name: 'Teleportation Staff', 
          description: 'An ancient staff charged with magical energy, it shimmers with swirling runes. With this staff, one can traverse vast distances in the blink of an eye, uncovering hidden realms and escaping danger.', 
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
    <div className="room-container5">
      <h1 className="room-header2">Cascade of Wisdom</h1>
      <div className="room-image5">
        <img src="/assets/room-5.png" alt="Room 5" /> 
      </div>
      <div className="room-text5">
      You take the ancient coin and toss it into the crystal-clear water. In an instant, the surface of the waterfall ripples and swirls, revealing a mystical figure: a wise wizard clad in flowing robes adorned with stars.
      “I see you’ve come far on your journey,” he states. “I want to aid you in your quest. But first, you must answer this riddle.”
      </div>

      {show && (
        <div className="challengemodal-overlay">
          <div className="challengemodal-content">
            <button className="challengemodal-close-button" onClick={onClose}>X</button>
            <div className="challengemodal-body">
              <p>“I move you swiftly without a trace,
                From one point to another in a single embrace.
                No paths to follow, no steps to take,
                What am I, in a world where boundaries break?”</p>
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

export default Room5;