// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// Replace with your actual config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCGh8_CWC7-YFz6-9XnHsyvVLiwz53ixaQ",
  authDomain: "onlinebookstoresystem-5246e.firebaseapp.com",
  databaseURL: "https://onlinebookstoresystem-5246e-default-rtdb.firebaseio.com",
  projectId: "onlinebookstoresystem-5246e",
  storageBucket: "onlinebookstoresystem-5246e.firebasestorage.app",
  messagingSenderId: "421542438139",
  appId: "1:421542438139:web:0abf4492c77654676bfc5e",
  measurementId: "G-9LHSKD6RLN"
};

// Second Firebase project config — replace with your second project's values
const firebaseConfig2 = {
  apiKey: "AIzaSyCGh8_CWC7-YFz6-9XnHsyvVLiwz53ixaQ",
  authDomain: "onlinebookstoresystem-5246e.firebaseapp.com",
  databaseURL: "https://onlinebookstoresystem-5246e-default-rtdb.firebaseio.com",
  projectId: "onlinebookstoresystem-5246e",
  storageBucket: "onlinebookstoresystem-5246e.firebasestorage.app",
  messagingSenderId: "421542438139",
  appId: "1:421542438139:web:0abf4492c77654676bfc5e",
  measurementId: "G-9LHSKD6RLN"
};

// Initialize a named secondary app and export its services
const secondaryApp = initializeApp(firebaseConfig2, 'secondary');
export const db2 = getFirestore(secondaryApp);
export const auth2 = getAuth(secondaryApp);
export const storage2 = getStorage(secondaryApp);


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
// Initialize Firebase services
export {db};
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;