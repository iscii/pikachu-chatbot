// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBIKrzKYCcdFctQafvVWekcsO71QjnbOd8",
    authDomain: "pikachu-chatbot.firebaseapp.com",
    projectId: "pikachu-chatbot",
    storageBucket: "pikachu-chatbot.firebasestorage.app",
    messagingSenderId: "107911010234",
    appId: "1:107911010234:web:0bc0c3525857470f23ef83",
    measurementId: "G-BR5GJZEJ5P"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };