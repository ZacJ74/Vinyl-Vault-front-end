import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/albums">Albums</Link> | 
      <Link to="/sign-in">Sign In</Link> | 
      <Link to="/sign-up">Sign Up</Link>
    </nav>
  );
}

export default Header;