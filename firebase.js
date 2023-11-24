// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCo72n2CJWf6WFGDs8jDGDyz07IM3wQZoM",
    authDomain: "maplehistorymsh.firebaseapp.com",
    projectId: "maplehistorymsh",
    storageBucket: "maplehistorymsh.appspot.com",
    messagingSenderId: "958498273176",
    appId: "1:958498273176:web:fc15f641ea1db91de79ded",
    measurementId: "G-BY6NLMDTPJ"
};

// Initialize Firebase
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp(); // if already initialized, use that one
}

// Initialize Firebase Analytics
let analytics;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}

// Initialize Firestore
const db = getFirestore(app);

export { db, app, analytics };
