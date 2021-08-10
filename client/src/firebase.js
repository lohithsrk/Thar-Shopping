import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBy4U1Nr8CcyuWCkysyba0_mUhASd1OQwA',
	authDomain: 'thar-db.firebaseapp.com',
	projectId: 'thar-db',
	storageBucket: 'thar-db.appspot.com',
	messagingSenderId: '335337530713',
	appId: '1:335337530713:web:4880b22f614e6bba31d848',
	measurementId: 'G-3ENNYLBKE2'
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
