const logIn = (currentUser, setSignIn) => {
  if (currentUser) {
    alert("Du bist bereits eingeloggt");
  } else {
    setSignIn(true);
  }
};

export default logIn;
