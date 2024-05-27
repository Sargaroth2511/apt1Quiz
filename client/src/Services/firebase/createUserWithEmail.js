import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import initializeFirebase from "./initializeFirebase";
import signInWithEmail from "./signInWithEmail";

const firebaseApp = initializeFirebase();
const auth = getAuth(firebaseApp);

const createUserWithEmail = (
  setError,
  email = "test@mail.com",
  password = "password"
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      return user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/email-already-in-use") {
        console.log("Auth already in use");
        signInWithEmail(setError, email, password);
      } else {
        setError(errorCode);
        return [errorCode, errorMessage];
      }
    });
};
export default createUserWithEmail;
