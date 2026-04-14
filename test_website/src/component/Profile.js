import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <div>
      <img src={user.picture} alt={user.name} style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  ) : null;
};

export default Profile;
