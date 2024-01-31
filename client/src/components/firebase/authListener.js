import { getAuth, onAuthStateChanged } from "firebase/auth";
import initializeFirebase from "./initializeFirebase";

const firebaseApp = initializeFirebase();
const auth = getAuth(firebaseApp);

const authListener = setUser => {
  return onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user.email);
      setUser(user);
    } else {
      console.log("no user found");
      setUser(null);
    }
  });
};
export default authListener;
