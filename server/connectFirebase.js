const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} = require("firebase/auth");
const firestore = require("firebase/firestore");

const connectFirebase = (email = "johabei@gmx.de", password = "test234") => {
  const firebaseConfig = {
    apiKey: "AIzaSyB1819lJYFTwGlNLppSsD426jlmf9lUrNY",
    authDomain: "ihk-quiz.firebaseapp.com",
    projectId: "ihk-quiz",
    storageBucket: "ihk-quiz.appspot.com",
    messagingSenderId: "813502981642",
    appId: "1:813502981642:web:8a1a8e2abfc4fdf550a1f3",
    measurementId: "G-7QM0JDWSPD",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return new Promise((res, rej) => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const uid = user.uid;
        // console.log(uid);
        res({ uid: uid });
        // ...
      } else {
        // User is signed out
        createUserWithEmailAndPassword(auth, email, password)
          .then(userCredential => {
            const user = userCredential.user;
            const uid = user.uid;
            res({ uid: uid });
          })
          .catch(error => {
            const errorCode = error.code;
            if (errorCode === "auth/email-already-in-use") {
              signInWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                  // Signed in
                  const user = userCredential.user;
                  const uid = user.uid;
                  res({ uid: uid });

                  // ...
                })
                .catch(error => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  rej({ uid: false, error: [errorCode, errorMessage] });
                });
            }
            // ..
          });
      }
    });
  });
};

module.exports = connectFirebase;
