// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { db } from '../firebase'; // adjust path as needed
const firebaseConfig = {
  apiKey: "AIzaSyAuKNYLnS8gacYHlQEtMCevJC7IMDsm4Oo",
  authDomain: "inventory-aff70.firebaseapp.com",
  databaseURL: "https://inventory-aff70-default-rtdb.firebaseio.com",
  projectId: "inventory-aff70",
  storageBucket: "inventory-aff70.firebasestorage.app",
  messagingSenderId: "104994651730",
  appId: "1:104994651730:web:9c64719ac6d1689a52698b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };