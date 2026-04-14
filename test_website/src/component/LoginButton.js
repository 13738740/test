import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FiLogIn } from "react-icons/fi";

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  if (!isAuthenticated) {
    return (
      <button className="auth-btn login" onClick={() => loginWithRedirect()}>
        <FiLogIn style={{ marginRight: 6 , background: 'transparent', color: '#F9F7F3'}} /> <span style={{background: 'transparent',color: '#F9F7F3'}}>Sign In</span>
      </button>
    );
  }
  return null;
};

export default LoginButton;
