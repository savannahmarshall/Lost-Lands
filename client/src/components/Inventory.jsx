import React from 'react';
import './Inventory.css';

const Inventory = ({ isOpen, onClose, items }) => {
  return (
    isOpen && (
      <div className="inventory-modal">
        <div className="inventory-modal-content">
          <button className="inventory-close" onClick={onClose}>&times;</button>
          <h2>Your Inventory</h2>
          <ul>
            {items.length > 0 ? (
              items.map((item, index) => (
                <li key={index}>{item.name}: {item.description}</li>
              ))
            ) : (
              <li>No items in inventory.</li>
            )}
          </ul>
        </div>
      </div>
    )
  );
};

export default Inventory;