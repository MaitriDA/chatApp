import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCP9w7ax1Wnks8l289hYd8c6vW0TOdon-I",
    authDomain: "baatein-85a8d.firebaseapp.com",
    projectId: "baatein-85a8d",
    storageBucket: "baatein-85a8d.appspot.com",
    messagingSenderId: "703890244686",
    appId: "1:703890244686:web:290ca1a14cb1cdf12eef1f",
    measurementId: "G-QLEW6YEP5G"
  };
  // Initialize Firebase
  const fire=firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default fire;