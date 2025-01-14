import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Database, getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7qCe-GUCuWmWixfLIa75lVG-q15MVwAc",
  authDomain: "app-capital-premios.firebaseapp.com",
  databaseURL: "https://app-capital-premios-default-rtdb.firebaseio.com",
  projectId: "app-capital-premios",
  storageBucket: "app-capital-premios.firebasestorage.app",
  messagingSenderId: "380030394448",
  appId: "1:380030394448:web:ba60a61ddefaa093097155",
  measurementId: "G-9D9G1VMC3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database: Database = getDatabase(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);