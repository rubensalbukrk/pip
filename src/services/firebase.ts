import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBzj_NTJmF6DPPGBMvpFOCM4BVlPOhCyyQ",
  authDomain: "mychat-900b3.firebaseapp.com",
  databaseURL: "https://mychat-900b3-default-rtdb.firebaseio.com",
  projectId: "mychat-900b3",
  storageBucket: "mychat-900b3.appspot.com",
  messagingSenderId: "186504689094",
  appId: "1:186504689094:web:9da3b8e933d5aa8b9baec7"
};

const app = initializeApp(firebaseConfig);