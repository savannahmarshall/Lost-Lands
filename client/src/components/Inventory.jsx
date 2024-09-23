import React from 'react';
import './Inventory.css';

const Inventory = ({ isOpen, onClose, items, onRemove }) => {
  return (
    isOpen && (
      <div className="inventory-modal">
        <div className="inventory-modal-content">
          <button className="inventory-close" onClick={onClose}>&times;</button>
          <h2 className="inventory-title">Your Inventory</h2> {/* Corrected here */}
          <div className="inventory-items-container">
            <ul>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <li key={index} className="inventory-item">
                    {item.image && <img src={item.image} alt={item.name} className="inventory-item-image" />}
                    <span>{item.name}: {item.description}</span>
                    <button className="remove-item-button" onClick={() => onRemove(index)}>
                      Drop
                    </button>
                  </li>
                ))
              ) : (
                <li className="inventory-empty">Your inventory is empty...</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default Inventory;