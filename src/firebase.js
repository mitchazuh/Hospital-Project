import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFxIXgTilnfsT4qG6lj8m_Dyp2Xe17Gjg",
  authDomain: "hospital-queue-system-6aca2.firebaseapp.com",
  projectId: "hospital-queue-system-6aca2",
  storageBucket: "hospital-queue-system-6aca2.firebasestorage.app",
  messagingSenderId: "85368762733",
  appId: "1:85368762733:web:800794c4b22bcf986bea64",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);