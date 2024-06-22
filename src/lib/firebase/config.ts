// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDKRdgQ3TZ6q74UsftkF5mGWt6ZBthNCs",
  authDomain: "cartopia-68776.firebaseapp.com",
  projectId: "cartopia-68776",
  storageBucket: "cartopia-68776.appspot.com",
  messagingSenderId: "291114368782",
  appId: "1:291114368782:web:9099ddf8e1330ae68da15f",
  measurementId: "G-78W40H0XWV"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(firebaseApp);
