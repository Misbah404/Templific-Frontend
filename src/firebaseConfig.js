import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBH_6F5rBWNt8F6Qap-_9NAstJukiuHyXo",
  authDomain: "templific-e364c.firebaseapp.com",
  projectId: "templific-e364c",
  storageBucket: "templific-e364c.appspot.com",
  messagingSenderId: "149566903804",
  appId: "1:149566903804:web:c7007b37b2efaf5e1c4e79",
  measurementId: "G-SHXLPSSQWM",
};

const app = initializeApp(firebaseConfig);

const fbAuth = getAuth(app);
const db = getFirestore(app);

export { fbAuth, db };
