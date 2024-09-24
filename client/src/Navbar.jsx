import { useState, useEffect } from 'react';
import LoginModal from './components/LoginModal';
import InstructionsModal from './components/instructionsModal'; 
import auth from './utils/auth';

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('id_token');
    setIsAuthenticated(token ? true : false);
  }, []);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    const token = localStorage.getItem('id_token');
    setIsAuthenticated(token ? true : false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    auth.logout();
  };

  const handleInstructionsClick = () => {
    setShowInstructionsModal(true); 
  };

  const handleCloseInstructionsModal = () => {
    setShowInstructionsModal(false); 
  };

  const handleDonationsClick = () => {
    alert('Thank you for considering a donation!');
  };

  return (
    <nav className="navbar">
      <div className="navbar-title-container">
        <div className="navbar-title">⋆｡ﾟ☁︎｡⋆Lost Lands｡ ﾟ☾ ﾟ｡⋆</div>
      </div>
      <div className="button-container">
        <button className="instructions-button" onClick={handleInstructionsClick}>
          Guide
        </button>
        <button className="donations-button" onClick={handleDonationsClick}>
          Donate
        </button>
        <button className="login-button" onClick={isAuthenticated ? handleLogout : handleLoginClick}>
          {isAuthenticated ? 'Log Out' : 'Login'}
        </button>
      </div>
      <LoginModal show={showLoginModal} onClose={handleCloseLoginModal} />
      <InstructionsModal show={showInstructionsModal} onClose={handleCloseInstructionsModal} />
    </nav>
  );
};

export default Navbar;