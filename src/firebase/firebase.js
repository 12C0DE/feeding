import Firebase from "firebase";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FD_APIKEY,
  authDomain: process.env.REACT_APP_FD_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FD_PROJECTID,
  storageBucket: process.env.REACT_APP_FD_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FD_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FD_APPID
};

//initialize firebase
const firebaseApp = Firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = Firebase.auth();

export { db, auth };
