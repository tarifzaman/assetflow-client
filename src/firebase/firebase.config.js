// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAcSak9pOZMpfTfu5kUCcZGw2Ot5EDaBc4",
  authDomain: "assetflow-df23a.firebaseapp.com",
  projectId: "assetflow-df23a",
  storageBucket: "assetflow-df23a.firebasestorage.app",
  messagingSenderId: "187581479834",
  appId: "1:187581479834:web:ab8c435ed8e66b3e011823",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
