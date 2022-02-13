import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENER_ID,
//   appId: process.env.REACT_APP_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyDtLBptZsSH1asIhDySf_2Fc8RKlCA2v7A",
  authDomain: "nwitter-bdfe8.firebaseapp.com",
  projectId: "nwitter-bdfe8",
  storageBucket: "nwitter-bdfe8.appspot.com",
  messagingSenderId: "797855052781",
  appId: "1:797855052781:web:a210dc9174a77f43d7ade4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = getFirestore();
export const storageService = getStorage();
