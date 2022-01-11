

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAN-NLuFq3iamQZn1K20ceNU1GMrVjsaRo",
  authDomain: "lets-chat-67ee0.firebaseapp.com",
  projectId: "lets-chat-67ee0",
  storageBucket: "lets-chat-67ee0.appspot.com",
  messagingSenderId: "891978582270",
  appId: "1:891978582270:web:ff865d436f5018f794fdaf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export{db,auth};