import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCJj4FGWUSAlj8OJTc-ieHV0LVWGXFaTzo",
	authDomain: "movie-app-41d6c.firebaseapp.com",
	projectId: "movie-app-41d6c",
	storageBucket: "movie-app-41d6c.appspot.com",
	messagingSenderId: "370470957831",
	appId: "1:370470957831:web:a9e8485de0bb313c444ba2"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);

export const logout = () => {
	signOut(auth);
};
