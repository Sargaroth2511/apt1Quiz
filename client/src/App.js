import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(data => {
        console.log(data.reply);
        setData(data.reply);
      });
  }, []);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       setData(data.message);
  //     });
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <p>{!data ? "Loading..." : data}</p>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
