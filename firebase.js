// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4tGfV84weMf_5d6Zwku75Nikd5zeBygQ",
    authDomain: "configurationapp-c218c.firebaseapp.com",
    projectId: "configurationapp-c218c",
    storageBucket: "configurationapp-c218c.appspot.com",
    messagingSenderId: "86214817191",
    appId: "1:86214817191:web:0e4d29dce79815d6597282"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;