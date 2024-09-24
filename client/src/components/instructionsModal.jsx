import React from 'react';
import './instructions.css';

const InstructionsModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>X</button>
        <div className="modal-body">
          <h2>Game Instructions</h2>
          <div className="modal-text">
            <p>
              Welcome to <strong>Lost Lands!</strong> Embark on an exciting adventure through mysterious settings, 
              solving riddles and uncovering hidden treasures. Here's how to navigate your journey:
            </p>
            <ul>
              <li><strong>Keep Exploring:</strong> Use the "Keep Exploring" button to move forward and discover new areas.</li>
              <li><strong>Turn Back:</strong> The "Turn Back" button will take you to the previous setting.</li>
              <li><strong>Unlock Treasure:</strong> When you move into a new setting, click the "Unlock Treasure" button, solve the riddle and reveal your reward item.</li>
            </ul>
            <p>
              When you choose the correct answer to a riddle, you'll see the message "<strong>Item added to inventory.</strong>" 
              Access your inventory by clicking the treasure chest icon in the bottom-right corner of the screen. 
              Inside your inventory, you can view an image of each collected item, along with its name and a short description—these may hold important clues for the next part of your adventure.
            </p>
            <p>
              If you want to remove an item, simply click the "<strong>Drop</strong>" button within your inventory.
            </p>
            <p><strong>Good luck, adventurer!</strong> The Lost Lands are filled with mysteries waiting to be solved, so choose wisely and let your wits guide you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;
