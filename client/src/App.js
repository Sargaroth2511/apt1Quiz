import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [question, setQuestion] = useState("");
  const [sendQuestion, setSendQuestion] = useState(false);

  const submitForm = e => {
    e.preventDefault();
    if (e.keyCode === 13) {
      e.preventDefault();
    }
    // console.log(e.keyCode)
    setSendQuestion(true);
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSendQuestion(true);
    }
  };

  useEffect(() => {
    // setQuestion("Wer erfand den Buchdruck?");
    if (sendQuestion) {
      const apiUrl = `/api?question=${encodeURIComponent(question)}`;

      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
          setData(data.reply);
          setSendQuestion(false);
        });
    }
  }, [question, sendQuestion]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <form onKeyDown={handleKeyPress} onSubmit={submitForm}>
            <br />
            <label htmlFor="searchField"></label>
            <br />
            <textarea
              placeholder="Deine Frage an ChatGPT"
              type="text"
              name=""
              id="searchField"
              maxLength={500}
              onChange={e => setQuestion(e.target.value)}
              value={question}
            />
            <br />
            <button type="submit">Senden</button>
          </form>
          <br />
        </div>
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
