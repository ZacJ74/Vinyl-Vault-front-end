import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <nav className="header-nav">
      <div className="nav-left">
        <Link to="/">Home</Link>
        {isAuthenticated && (
          <Link to="/albums">My Albums</Link>
        )}
      </div>
      <div className="nav-right">
        {isAuthenticated ? (
          <>
            <span className="user-greeting">Welcome, {user?.username}!</span>
            <button onClick={handleSignOut} className="btn-signout">Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;