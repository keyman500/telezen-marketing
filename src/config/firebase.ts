// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBOivqXpjNiQJdwhHZBzBsM5EwnoCRGMqU",
    authDomain: "telezen-ae956.firebaseapp.com",
    projectId: "telezen-ae956",
    storageBucket: "telezen-ae956.appspot.com",
    messagingSenderId: "203485572292",
    appId: "1:203485572292:web:c0faceb7d60c73e607ad91",
    measurementId: "G-G1263N1GF4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };