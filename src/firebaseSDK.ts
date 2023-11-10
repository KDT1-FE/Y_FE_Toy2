// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBYZdXJrI3bfmGggt6ZZI-AQDqrIvHfdMA',
  authDomain: 'langchat-464b7.firebaseapp.com',
  projectId: 'langchat-464b7',
  storageBucket: 'langchat-464b7.appspot.com',
  messagingSenderId: '739582260178',
  appId: '1:739582260178:web:13d7f089d90e89b16f4e0b',
  measurementId: 'G-L5YTBXJFEH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, db, storage, analytics };
