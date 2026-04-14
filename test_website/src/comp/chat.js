import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Rout from './route';
import Nav from './nav';
import { CometChat } from '@cometchat-pro/chat';

const appID = "16775565da8ee708c";
const region = "US";
const authKey = "0d3344c41cc251430ba7ba9290d1af8c81fd0695";

// For demo: use a fixed UID. In production, use your user auth system.
const UID = "testuser1";

const Chat = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    CometChat.getLoggedinUser().then(
      user => {
        if (!user) {
          CometChat.login(UID, authKey).then(
            user => setLoggedIn(true),
            err => setError("Login failed: " + err.message)
          );
        } else {
          setLoggedIn(true);
        }
      },
      err => setError("Get user failed: " + err.message)
    );
  }, []);

  if (error) return <div style={{color: 'red'}}>{error}</div>;
  if (!loggedIn) return <div>Loading chat...</div>;

  return (
    <div style={{ height: '80vh', maxWidth: 900, margin: '0 auto' }}>
    </div>
  );
};

export default Chat;
