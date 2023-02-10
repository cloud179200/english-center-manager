import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBH2-ZNF0xBZJp-qYKmj_rf7hh_AOLmEu8",
  authDomain: "datn-c1983.firebaseapp.com",
  projectId: "datn-c1983",
  storageBucket: "datn-c1983.appspot.com",
  messagingSenderId: "347144194537",
  appId: "1:347144194537:web:7e1f5cf497992b88cf6378"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;