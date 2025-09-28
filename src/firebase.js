import { initializeApp } from "firebase/app";
// 1. IMPORT the new functions we need
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC40rN5hzieN-diBS0FadXl-4eo5vnb3KI",
  authDomain: "visitors-4f520.firebaseapp.com",
  projectId: "visitors-4f520",
  storageBucket: "visitors-4f520.firebasestorage.app",
  messagingSenderId: "905460902345",
  appId: "1:905460902345:web:fc72bb19d88314c91e2018",
  measurementId: "G-VJ0S701VX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. INITIALIZE the database using the new method with offline cache enabled
const db = initializeFirestore(app, {
  localCache: persistentLocalCache(/*{ tabManager: 'multi-tab' }*/)
});

// 3. EXPORT the 'db' variable as before
export { db };








// import { initializeApp } from "firebase/app";
// // 1. CHANGE 'enablePersistence' TO 'enableIndexedDbPersistence' IN THE IMPORT
// import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC40rN5hzieN-diBS0FadXl-4eo5vnb3KI",
//   authDomain: "visitors-4f520.firebaseapp.com",
//   projectId: "visitors-4f520",
//   storageBucket: "visitors-4f520.firebasestorage.app",
//   messagingSenderId: "905460902345",
//   appId: "1:905460902345:web:fc72bb19d88314c91e2018",
//   measurementId: "G-VJ0S701VX6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // 2. CHANGE THE FUNCTION CALL HERE AS WELL
// enableIndexedDbPersistence(db).catch((err) => {
//     if (err.code == 'failed-precondition') {
//         // Multiple tabs open, persistence can only be enabled in one tab at a time.
//         console.log('Persistence failed, multiple tabs open.');
//     } else if (err.code == 'unimplemented') {
//         // The browser does not support persistence.
//         console.log('Persistence is not available in this browser.');
//     }
// });

// export { db };


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC40rN5hzieN-diBS0FadXl-4eo5vnb3KI",
//   authDomain: "visitors-4f520.firebaseapp.com",
//   projectId: "visitors-4f520",
//   storageBucket: "visitors-4f520.firebasestorage.app",
//   messagingSenderId: "905460902345",
//   appId: "1:905460902345:web:fc72bb19d88314c91e2018",
//   measurementId: "G-VJ0S701VX6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);