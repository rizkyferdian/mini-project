import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCXzTujEdb6HRfLwkQj7ke8gEnCdHz85PY",
    authDomain: "vote-app-a879f.firebaseapp.com",
    projectId: "vote-app-a879f",
    storageBucket: "vote-app-a879f.appspot.com",
    messagingSenderId: "75363450550",
    appId: "1:75363450550:web:14a8540522ebce6c84f017"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app);