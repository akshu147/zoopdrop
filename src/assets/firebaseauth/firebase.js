// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDAGodHPPVHbszJPeRD81GLX5Z8gKJLMWM",
//   authDomain: "zoopdrop-fe1ac.firebaseapp.com",
//   projectId: "zoopdrop-fe1ac",
//   storageBucket: "zoopdrop-fe1ac.firebasestorage.app",
//   messagingSenderId: "206846743919",
//   appId: "1:206846743919:web:490a62e75cf4b0f47b449a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth/web-extension";

const firebaseConfig = {
  apiKey: "AIzaSyDAGodHPPVHbszJPeRD81GLX5Z8gKJLMWM",
  authDomain: "zoopdrop-fe1ac.firebaseapp.com",
  projectId: "zoopdrop-fe1ac",
  // ... rest of your config
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const facebookauth = new FacebookAuthProvider()

export { auth, provider, facebookauth };



