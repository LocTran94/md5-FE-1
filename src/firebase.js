
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDtjFXVGtv_Vfx_SHAwh6NtZOp_utl_Sc8",
    authDomain: "music-21d95.firebaseapp.com",
    projectId: "music-21d95",
    storageBucket: "music-21d95.appspot.com",
    messagingSenderId: "122269877489",
    appId: "1:122269877489:web:58e897ac141aff82bdd550",
    measurementId: "G-CFDPBL1PLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)