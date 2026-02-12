// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
// Replace with your actual config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAM-Z0saY0iL8bK2guSi5o_y70mEDvT5PQ",
  authDomain: "react-ecommerce-9acf4.firebaseapp.com",
  databaseURL: "https://react-ecommerce-9acf4-default-rtdb.firebaseio.com",
  projectId: "react-ecommerce-9acf4",
  storageBucket: "react-ecommerce-9acf4.firebasestorage.app",
  messagingSenderId: "748619775548",
  appId: "1:748619775548:web:3970164bd282176ea00d39"
};

// Second Firebase project config — replace with your second project's values
// Second Firebase project config — make sure key names match Firebase's expected keys
// (no trailing '2' on property names). Replace values with the exact values from
// your Firebase Console for the second project if they differ.
// Second Firebase project config — make sure key names match Firebase's expected keys
// (no trailing '2' on property names). Replace values with the exact values from
// your Firebase Console for the second project if they differ.
const firebaseConfig2 = {
  apiKey: "AIzaSyAuKNYLnS8gacYHlQEtMCevJC7IMDsm4Oo",
  authDomain: "inventory-aff70.firebaseapp.com",
  databaseURL: "https://inventory-aff70-default-rtdb.firebaseio.com",
  projectId: "inventory-aff70",
  storageBucket: "inventory-aff70.firebasestorage.app",
  messagingSenderId: "104994651730",
  appId: "1:104994651730:web:9c64719ac6d1689a52698b"
};

// Initialize Firebase
// Primary app (first project)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);

// Initialize Firebase services for primary app
export { db };
export const rtdb = database; // Realtime Database (primary)
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Secondary app (second project)
const App2 = initializeApp(firebaseConfig2, 'app2');
const db2 = getFirestore(App2);
const database2 = getDatabase(App2);

// Export secondary app services
export { db2 };
export const rtdb2 = database2; // Realtime Database (secondary)
export const auth2 = getAuth(App2);
export const storage2 = getStorage(App2);
export const analytics2 = getAnalytics(App2);

export default { app, App2 };