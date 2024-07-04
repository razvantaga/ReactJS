import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "reactchat-fe6af.firebaseapp.com",
    projectId: "reactchat-fe6af",
    storageBucket: "reactchat-fe6af.appspot.com",
    messagingSenderId: "31286361995",
    appId: "1:31286361995:web:175a52cd2ab8e27bbaf98e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);