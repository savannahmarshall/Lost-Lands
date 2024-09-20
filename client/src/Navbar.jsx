import { useState, useEffect } from 'react';
import Modal from './components/LoginModal';
import auth from './utils/auth';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by checking the presence of a token in localStorage
    const token = localStorage.getItem('id_token');
    setIsAuthenticated(token ? true : false);
  }, []);

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Update authentication status after closing the modal
    const token = localStorage.getItem('id_token');
    setIsAuthenticated(token ? true : false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    auth.logout();
  };


  return (
    <nav className="navbar">
      <div className="navbar-title-container">
        <div className="navbar-title">Lost Lands</div>
      </div>
      <button className="login-button" onClick={isAuthenticated ? handleLogout : handleLoginClick}>
        {isAuthenticated ? 'Log Out' : 'Login'}
      </button>
      <Modal show={showModal} onClose={handleCloseModal} />
    </nav>
  );
};

export default Navbar;