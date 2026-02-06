// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAM-Z0saY0iL8bK2guSi5o_y70mEDvT5PQ",
  authDomain: "react-ecommerce-9acf4.firebaseapp.com",
  databaseURL: "https://react-ecommerce-9acf4-default-rtdb.firebaseio.com",
  projectId: "react-ecommerce-9acf4",
  storageBucket: "react-ecommerce-9acf4.firebasestorage.app",
  messagingSenderId: "748619775548",
  appId: "1:748619775548:web:3970164bd282176ea00d39"
};

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const app2 = initializeApp(firebaseConfig2, 'secondary');

// Export secondary firestore database
export const db2 = getFirestore(app2);
// Export firestore database

export const db = getFirestore(app);
