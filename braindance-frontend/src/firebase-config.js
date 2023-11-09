import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAvDFqPYNg2o20okWhjTJzwjeC5j3YTaY",
  authDomain: "synergy-test-a1f24.firebaseapp.com",
  projectId: "synergy-test-a1f24",
  storageBucket: "synergy-test-a1f24.appspot.com",
  messagingSenderId: "194796403828",
  appId: "1:194796403828:web:0cc9ffb2840ec604106521",
  measurementId: "G-HCYY8EQFEL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };

