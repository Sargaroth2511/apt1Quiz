import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [question, setQuestion] = useState("");
  const [sendQuestion, setSendQuestion] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const apiUrl = `/api?question=${encodeURIComponent(question)}`;

      fetch(apiUrl)
        .then(res => {
          if (!res.ok) {
            // Handle the error response here
            setError(`Request failed with status ${res.status}`);
            setLoading(false);
            throw new Error(`Request failed with status ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          setData(data.reply);
          setSendQuestion(false);
          setLoading(false);
        })
        .catch(error => {
          // Handle the error here
          console.error("An error occurred:", error.message);
          // You can set an error state or display an error message to the user
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
        <p>{loading ? "Loading..." : data}</p>
        {error ? <p>Irgendetwas ist schief gelaufen...</p> : ""}
      </header>
    </div>
  );
}

export default App;
