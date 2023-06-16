// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj64chsSySY2b3VKFhsqzwXRXScxpG-QQ",
  authDomain: "latihan-f28f4.firebaseapp.com",
  databaseURL: "https://latihan-f28f4-default-rtdb.firebaseio.com",
  projectId: "latihan-f28f4",
  storageBucket: "latihan-f28f4.appspot.com",
  messagingSenderId: "979745518470",
  appId: "1:979745518470:web:440f295a6fc11997c33207",
  measurementId: "G-F4PSP9C9T3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
// const analytics = getAnalytics(app);