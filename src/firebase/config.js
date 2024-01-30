import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCHZpKkolWDLn0N70pPJriw1h0JvBsPXak",
    authDomain: "addventures-e91b1.firebaseapp.com",
    projectId: "addventures-e91b1",
    storageBucket: "addventures-e91b1.appspot.com",
    messagingSenderId: "820589591562",
    appId: "1:820589591562:web:d5e97d7793dc3db353f3f3"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);