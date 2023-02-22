import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyC8AqR3rncjC2s4EGqzH2Vb7IbFv68POmg",
  authDomain: "slack-clone-a2553.firebaseapp.com",
  projectId: "slack-clone-a2553",
  storageBucket: "slack-clone-a2553.appspot.com",
  messagingSenderId: "811373787693",
  appId: "1:811373787693:web:23b8adac2b20ef717696a4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const provider = new GoogleAuthProvider(app)