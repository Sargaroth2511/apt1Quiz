import React, { useEffect, useState } from "react";

import signInWithEmail from "./firebase/signInWithEmail";

const SignInPopup = ({ setError, setShowCreateUserPopup, setSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterButton = () => {
    setShowCreateUserPopup(true);
    setSignIn(false);
  };

  return (
    <div className="authPopup">
      <div className="auth-form">
        <button id="closeButton" onClick={() => setSignIn(false)}>
          X
        </button>
        <h2>Sign In </h2>
        <div>
          <form
            action=""
            onSubmit={e => signInWithEmail(e, setError, email, password)}
            onKeyDown={e => signInWithEmail(e, setError, email, password)}
          >
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="password">Passwort</label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Sign in</button>
          </form>
          <p>Noch nicht registriert?</p>
          <button onClick={() => handleRegisterButton()}>Registrieren</button>
        </div>
      </div>
    </div>
  );
};

export default SignInPopup;
