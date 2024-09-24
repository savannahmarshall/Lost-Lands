import React from 'react';
import './Inventory.css';
import { useEffect, useState } from 'react';
import auth from '../utils/auth';

const Inventory = ({ isOpen, onClose, onRemove }) => {
const [items, setItems] = useState({})
  useEffect( ()=> {
    async function getUserData(){
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query QueryMe($userId: ID) {
              queryMe(userId: $userId) {
                inventory {
                  name
                  description
                  image
                }
              }
            }
          `,
          variables: {
            userId: auth.getProfile().userId
          },
        }),
      });
      const {data} = await response.json();
  setItems(data.queryMe.inventory);
    }
    getUserData()
  },[]) 
 

  return (
    isOpen && (
      <div className="inventory-modal">
        <div className="inventory-modal-content">
          <button className="inventory-close" onClick={onClose}>&times;</button>
          <h2 className="inventory-title">Your Inventory</h2>
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