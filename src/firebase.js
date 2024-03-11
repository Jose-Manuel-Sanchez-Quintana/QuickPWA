// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

    apiKey: "AIzaSyA8yArappL0KXK2HfwVkHdlR1tX7g1PJ08",
    authDomain: "quick-11766.firebaseapp.com",
    databaseURL: "https://quick-11766-default-rtdb.firebaseio.com",
    projectId: "quick-11766",
    storageBucket: "quick-11766.appspot.com",
    messagingSenderId: "181268690567",
    appId: "1:181268690567:web:d211efd4cc19611388aa22",
    measurementId: "G-KYPPHQCSJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const fs = getStorage(app);
// export const collectionRef = doc(firestore, "publicaciones");