import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxPW1nE79tMY9PUSMnfrG1yRXZvnLe0hY",
  authDomain: "ecommerce-42fe0.firebaseapp.com",
  projectId: "ecommerce-42fe0",
  storageBucket: "ecommerce-42fe0.appspot.com",
  messagingSenderId: "821283706380",
  appId: "1:821283706380:web:554a77df231ab64a51c029"
};

const app = initializeApp(firebaseConfig);

// Exportamos como constantes nombradas desde el inicio
export const db = getFirestore(app);
export const auth = getAuth(app);