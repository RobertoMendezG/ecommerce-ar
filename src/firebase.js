// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHCBEfjoUXq-47DWh7gj3jCpnxdbmk_OU",
  authDomain: "ecommerce-ar-d878e.firebaseapp.com",
  projectId: "ecommerce-ar-d878e",
  storageBucket: "ecommerce-ar-d878e.appspot.com",
  messagingSenderId: "262557257283",
  appId: "1:262557257283:web:84684cca0ffc7995d5cef6",
  measurementId: "G-N9F19FTPZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);