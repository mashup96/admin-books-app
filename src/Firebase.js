import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
/*
replace these configurations with those of your personal firebase
*/
const config = {
    apiKey: "AIzaSyBxGGkKxTNQxAyKStthmymngP0bylhF554",
    authDomain: "admin-books-app.firebaseapp.com",
    databaseURL: "https://admin-books-app.firebaseio.com",
    projectId: "admin-books-app",
    storageBucket: "admin-books-app.appspot.com",
    messagingSenderId: "249887064924",
    appId: "1:249887064924:web:69f5b2683bb9e54a"
};

firebase.initializeApp(config);

export default firebase;