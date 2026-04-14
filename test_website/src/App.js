import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Rout from './comp/route';
import Nav from './comp/nav';
// Check if you are using @cometchat-pro/chat or @cometchat/chat-sdk-javascript
import { CometChat } from '@cometchat-pro/chat'; 

const appID = "16775565da8ee708c";
const region = "US";

const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();

function App() {
  useEffect(() => {
    // Initialize CometChat once when the app loads
    CometChat.init(appID, appSetting).then(
      () => {
        console.log("CometChat initialization completed successfully");
      },
      error => {
        console.error("CometChat initialization failed", error);
      }
    );
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      {/* Ensure Rout is called without needing props if Shop handles its own data */}
      <Rout /> 
    </BrowserRouter>
  );
}

export default App;