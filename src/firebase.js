import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; 
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARfVojtuoyqrXzVjKKHSbEB16CH2JkQ6A",
  authDomain: "reego-chairs.firebaseapp.com",
  projectId: "reego-chairs",
  storageBucket: "reego-chairs.appspot.com",
  messagingSenderId: "1083009383516",
  appId: "1:1083009383516:web:fbd173599887247d183a99"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);
const storage = getStorage(app);

export { auth, db, realtimeDb, storage };