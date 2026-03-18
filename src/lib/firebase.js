import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZ7JR04rJTd_lsK0tOAYECLNhm8fTYJ7E",
  authDomain: "questraid-cv-c6159.firebaseapp.com",
  projectId: "questraid-cv-c6159",
  storageBucket: "questraid-cv-c6159.firebasestorage.app",
  messagingSenderId: "529388524558",
  appId: "1:529388524558:web:e628d7b6ca4be15267d85f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
