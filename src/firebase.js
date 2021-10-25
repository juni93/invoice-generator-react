// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBw_EIkhizYE5-kIsp86XejhTxtZVGq03g",
	authDomain: "invoice-generator-dae38.firebaseapp.com",
	projectId: "invoice-generator-dae38",
	storageBucket: "invoice-generator-dae38.appspot.com",
	messagingSenderId: "449569256831",
	appId: "1:449569256831:web:e74860d4a358140527964a"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

const signInWithEmailAndPassword = async (email, password) => {
	try {
		await auth.signInWithEmailAndPassword(email, password);
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const logout = () => {
	auth.signOut();
};

const registerWithEmailAndPassword = async (name, email, password) => {
	try {
		const res = await auth.createUserWithEmailAndPassword(email, password);
		const user = res.user;
		await db.collection("users").add({
			uid: user.uid,
			name,
			authProvider: "local",
			email,
		});
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const sendPasswordResetEmail = async (email) => {
	try {
		await auth.sendPasswordResetEmail(email);
		alert("Password reset link sent!");
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

export {
	auth,
	db,
	signInWithEmailAndPassword,
	registerWithEmailAndPassword,
	sendPasswordResetEmail,
	logout,
};