/* CONFIGURACION FIREBASE */
const { initializeApp } = require("firebase/app");
const firebaseConfig = {
  apiKey: "AIzaSyBUuthtVB6iGrAbzsTdWU6EuYdF0FCVcXM",
  authDomain: "trivia-61044.firebaseapp.com",
  databaseURL: "https://trivia-61044-default-rtdb.firebaseio.com",
  projectId: "trivia-61044",
  storageBucket: "trivia-61044.appspot.com",
  messagingSenderId: "494008738660",
  appId: "1:494008738660:web:ea6bfb6123040fdc7a5071"
};
const app = initializeApp(firebaseConfig);

/* CONFIGURACION FIREBASE-ADMIN */
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  /*   databaseURL: "https://trivia-61044-default-rtdb.firebaseio.com", */
  storageBucket: "prueba-frontend-2023.appspot.com"
});

/* EXPORTAR */
module.exports = {
    app,
    admin
};
