// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";  // need for the database connection
import { toast } from "react-toastify";


const API_KEY = import.meta.env.VITE_API_KEY_FIREBASE
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "neflixclone-a9363.firebaseapp.com",
  projectId: "neflixclone-a9363",
  storageBucket: "neflixclone-a9363.firebasestorage.app",
  messagingSenderId: "987360019133",
  appId: "1:987360019133:web:6ab26352ad3a3047a9add4",
  measurementId: "G-ZWXLNCHVE9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

// create user sign up function
const signup = async (name, email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user 
    // to store in the database
    await addDoc(collection(db, 'user'), {
      uid: user.uid,
      name,
      email,
      authProvider: 'local'
    })
    toast.success('logged in successful')
  } catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
}

// create user sign in function
const login = async(email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    toast.success('Account created succcessful')
  } catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
}

const logout = () => {
  signOut(auth)
  toast.success('successfully logged out')
}

export {auth, db, login, signup, logout}