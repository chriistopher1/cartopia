// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// const analytics = getAnalytics(firebaseApp);