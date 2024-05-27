import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import initializeFirebase from "./initializeFirebase";

import preventSubmitDefault from "../../Utils/preventSubmitDefault";

const firebaseApp = initializeFirebase();
const auth = getAuth(firebaseApp);

const signInWithEmail = async (e, setError, email, password) => {
  console.log("tst");
  if (preventSubmitDefault(e)) {
    return new Promise((res, rej) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          // Signed in
          const user = userCredential.user;
          res(user);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(error);
          rej([errorCode, errorMessage]);
        });
    });
  }
};
export default signInWithEmail;
