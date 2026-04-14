import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { CiLogout } from "react-icons/ci";

const LogoutButton = () => {
  const { isAuthenticated, logout } = useAuth0();
  if (isAuthenticated) {
    return (
      <button className="auth-btn logout" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        <CiLogout style={{ marginRight: 6 , background: 'transparent', color: '#F9F7F3'}} /> <span style={{background: 'transparent',color: '#F9F7F3'}}>Sign Out</span>
      </button>
    );
  }
  return null;
};

export default LogoutButton;