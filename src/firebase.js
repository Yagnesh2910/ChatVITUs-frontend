import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCwDtEM3RjoBaZxGWGi2grafcT3E3IMQ5g",
    authDomain: "chat-vit-us.firebaseapp.com",
    projectId: "chat-vit-us",
    storageBucket: "chat-vit-us.firebasestorage.app",
    messagingSenderId: "115832223519",
    appId: "1:115832223519:web:d3176ec7a6e07b153a222a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
