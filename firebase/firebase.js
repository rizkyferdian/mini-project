import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBchnvQznyoReVJ72ftz6oR_w1vljydcf4",
    authDomain: "mini-project-e95d0.firebaseapp.com",
    projectId: "mini-project-e95d0",
    storageBucket: "mini-project-e95d0.appspot.com",
    messagingSenderId: "983411605508",
    appId: "1:983411605508:web:ab8adbbababa44329eb551",
    measurementId: "G-FY0JPZ4C39"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app);