import React, { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import logo from "./logo.png";
import "./App.css";
import fetchGPTData from "./components/apiCalls/fetchGPTData";
// import initializeFirebase from "./components/firebase/initializeFirebase";
import authListener from "./components/firebase/authListener";
import logOut from "./components/firebase/logOut";
// import SignInWithEmail from "./components/firebase/SignInWithEmail";
import SignInPopup from "./components/SignInPopup";
import logIn from "./components/firebase/logIn";
import CreateUserPopup from "./components/CreateUserPopup";

function App() {
  const [gptData, setGptData] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [sendAnswer, setSendAnswer] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizdata] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [signIn, setSignIn] = useState(null);
  const [showCreateUserPopup, setShowCreateUserPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    authListener(setCurrentUser);
  }, []);

  let questionNumber = "10";

  const submitForm = e => {
    e.preventDefault();
    if (e.keyCode === 13) {
      e.preventDefault();
    }
    setSendAnswer(true);
    setShowCorrectAnswer(true);
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSendAnswer(true);
      setShowCorrectAnswer(true);
    }
  };

  useEffect(() => {
    if (sendAnswer && currentUser) {
      setLoading(true);
      const correctAnswer = quizData[questionIndex].antwort;
      const question = quizData[questionIndex].frage;

      const fetchData = async () => {
        const data = await fetchGPTData(correctAnswer, question, userAnswer);
        return data;
      };
      fetchData()
        .then(data => {
          setGptData(data);
          setLoading(false);
        })
        .catch(err => setError(err));
    } else if (sendAnswer && !currentUser) {
      alert("Du muss eingeloggt sein um die Funktion nutzen zu können");
      setSendAnswer(false);
    }
  }, [sendAnswer, currentUser]);

  useEffect(() => {
    const learningField = "LF1";
    const backendUrl = `/json?questionNumber=${encodeURIComponent(
      questionNumber
    )}&learningField=${encodeURIComponent(learningField)}`;

    fetch(backendUrl)
      .then(res => {
        if (!res.ok) {
          setError(`Request failed with status ${res.status}`);
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setQuizdata(data);
      })
      .catch(error => {
        console.error("An error occurred:", error.message);
        setError(true);
      });
  }, []);

  useEffect(() => {
    setUserAnswer("");
    setSendAnswer(false);
    setShowCorrectAnswer(false);
    setGptData(null);
  }, [questionIndex]);

  const changeQuestionIndex = e => {
    if (questionIndex > 0 && e.currentTarget.id === "prevButton")
      setQuestionIndex(questionIndex => (questionIndex -= 1));
    if (
      questionIndex < Number(questionNumber) &&
      e.currentTarget.id === "nextButton"
    ) {
      setQuestionIndex(questionIndex => (questionIndex += 1));
    }
  };

  return (
    <div className="appContainer">
      {showCreateUserPopup ? (
        <CreateUserPopup
          setShowCreateUserPopup={setShowCreateUserPopup}
          setError={setError}
        />
      ) : (
        ""
      )}
      {!currentUser && signIn ? (
        <SignInPopup
          setError={setError}
          setShowCreateUserPopup={setShowCreateUserPopup}
          setSignIn={setSignIn}
        />
      ) : (
        ""
      )}
      <div className="logo-container">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className="App">
        <div>
          <button onClick={() => logIn(currentUser, setSignIn)}>
            Einloggen
          </button>
          <button onClick={() => logOut(setSignIn, setError)}>Ausloggen</button>
        </div>
        <div>
          <button id="prevButton" onClick={changeQuestionIndex}>
            Vorherige Frage
          </button>
          <button id="nextButton" onClick={changeQuestionIndex}>
            Nächste Frage
          </button>

          <h2> {quizData ? quizData[questionIndex].LF : "Lernfeld"}</h2>
          <p>Frage Nummer {questionIndex + 1}</p>
          <p>
            {quizData
              ? quizData[questionIndex].frage
              : "Hier soll die Frage stehen..."}
          </p>
          <form onKeyDown={handleKeyPress} onSubmit={submitForm}>
            <label htmlFor="answerField"></label>
            <br />
            <textarea
              placeholder="Deine Antwort..."
              type="text"
              name=""
              id="anwserField"
              maxLength={500}
              onChange={e => setUserAnswer(e.target.value)}
              value={userAnswer}
            />
            <br />
            <button type="submit">Senden</button>
          </form>
          <br />
        </div>
        <div>
          <div>
            {quizData && sendAnswer && currentUser ? (
              <div>
                <h3>Antwort aus der Datenbank</h3>
                <p>{quizData[questionIndex].antwort}</p>
              </div>
            ) : (
              "Hier steht die richtige Antwort"
            )}
          </div>
          <div>
            {loading ? (
              "Loading..."
            ) : gptData ? (
              <div>
                <div>
                  <h3>Beurteilung der Antwort durch ChatGPT</h3>
                  <p>{gptData.answer}</p>
                </div>
                <div className="gpt-percentage">{gptData.percentage} %</div>
                <div>
                  <h3>Lösung von ChatGPT</h3>
                  <p>{gptData.GPTAnswer}</p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          {error ? <p>Irgendetwas ist schief gelaufen...</p> : ""}
        </div>
      </div>
    </div>
  );
}

export default App;
