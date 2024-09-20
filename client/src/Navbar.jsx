import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from './components/LoginModal';
import auth from './utils/auth';

const Navbar = ({ setImage, setText }) => {
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
    <nav className="navbar bg-dark">
      <div className="container">
        <Link className="navbar-brand text-white" to="/">Lost Lands</Link>
        <div className="navbar-nav">
          {isAuthenticated ? (
            <button className="nav-item nav-link login-button" onClick={handleLogout}>Log Out</button>
          ) : (
            <Link className="nav-item nav-link login-button" to="#" onClick={handleLoginClick}>Login</Link>
          )}
        </div>
      </div>
      <Modal show={showModal} onClose={handleCloseModal} />
    </nav>
  );
};

export default Navbar;
