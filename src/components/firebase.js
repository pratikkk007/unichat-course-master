import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp( {
    apiKey: "AIzaSyAmlufcnJs7a_cg5LZ-YXCsqpcGoSZP5fM",
    authDomain: "converse-ab5db.firebaseapp.com",
    projectId: "converse-ab5db",
    storageBucket: "converse-ab5db.appspot.com",
    messagingSenderId: "1098791474283",
    appId: "1:1098791474283:web:52340a04f1beb91c330d2e"
  }).auth();