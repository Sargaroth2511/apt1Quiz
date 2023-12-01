import React, { useEffect, useState } from "react";

import handleSubmit from "./helpers/handleSubmit";

const CreateUserPopup = ({ setError, setShowCreateUserPopup }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  return (
    <div className="authPopup">
      <div className="auth-form">
        <button id="closeButton" onClick={() => setShowCreateUserPopup(false)}>
          X
        </button>
        <h2>Sign In </h2>
        <div>
          <form
            action=""
            onSubmit={e =>
              handleSubmit(e, setError, email, password, repeatPassword)
            }
            onKeyDown={e =>
              handleSubmit(e, setError, email, password, repeatPassword)
            }
          >
            <label htmlFor="username">Nickname:</label>
            <input
              type="text"
              id="username"
              autoComplete="username"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
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
              className={
                password === repeatPassword ? "color-green" : "color-red"
              }
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <label htmlFor="passwordRepeat">Passwort wiederholen</label>
            <input
              type="password"
              id="passwordRepeat"
              className={
                password === repeatPassword ? "color-green" : "color-red"
              }
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
            />
            <button type="submit">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPopup;
