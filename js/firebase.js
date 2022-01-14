console.log("Initializing firebase");

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1TdhSRvsAG5JS_zsk7-QpfWsuQstG2zg",
    authDomain: "mybrand-app-9594a.firebaseapp.com",
    projectId: "mybrand-app-9594a",
    storageBucket: "mybrand-app-9594a.appspot.com",
    messagingSenderId: "96439289821",
    appId: "1:96439289821:web:8be2dd53cdd408d3a39834",  
    databaseURL: "https://mybrand-app-9594a-default-rtdb.europe-west1.firebasedatabase.app/"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const db = app.database();
  const auth = firebase.auth();