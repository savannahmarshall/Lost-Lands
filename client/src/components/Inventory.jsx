import React, { useEffect, useState } from 'react';
import './Inventory.css';
import auth from '../utils/auth';

const Inventory = ({ isOpen, onClose }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    async function getUserData() {
      try {
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
              userId: auth.getProfile().userId,
            },
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const { data } = await response.json();
        if (data && data.queryMe) {
          setItems(data.queryMe.inventory);
        }
      } catch (err) {
        setError('Failed to load inventory');
        console.error(err);
      }
    }

    getUserData();
  }, []);

  const handleRemoveItem = async (itemName) => {
    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation DeleteItem($userId: ID!, $itemName: String!) {
              deleteItem(userId: $userId, itemName: $itemName) {
                inventory {
                  name
                  description
                  image
                }
              }
            }
          `,
          variables: {
            userId: auth.getProfile().userId,
            itemName,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { data } = await response.json();
      if (data && data.deleteItem) {
        setItems(data.deleteItem.inventory); 
      }
    } catch (err) {
      setError('Failed to remove item');
      console.error(err);
    }
  };

  return (
    isOpen && (
      <div className="inventory-modal">
        <div className="inventory-modal-content">
          <button className="inventory-close" onClick={onClose}>
            &times;
          </button>
          <h2 className="inventory-title">Your Inventory</h2>
          {error && <p className="error-message">{error}</p>} 
          <div className="inventory-items-container">
            <ul>
              {items.length > 0 ? (
                items.map((item) => (
                  <li key={item.name} className="inventory-item">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="inventory-item-image"
                      />
                    )}
                    <span>
                      {item.name}: {item.description}
                    </span>
                    <button
                      className="remove-item-button"
                      onClick={() => handleRemoveItem(item.name)} 
                    >
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