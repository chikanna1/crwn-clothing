import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDxQA-lBXXlIVc7k4qOC05_E8ia1ZUK4jw",
  authDomain: "crwn-clothing-469ef.firebaseapp.com",
  projectId: "crwn-clothing-469ef",
  storageBucket: "crwn-clothing-469ef.appspot.com",
  messagingSenderId: "285898884189",
  appId: "1:285898884189:web:74919390b28af8b0feb9b4",
  measurementId: "G-V6D9YKGPT2",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
