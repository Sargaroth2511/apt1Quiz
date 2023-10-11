import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [gptData, setGptData] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [sendAnswer, setSendAnswer] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizdata] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

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
    if (sendAnswer) {
      const systemContent =
        "You are given Input like the following pattern: <p>Answer given by the user</p><p>Correct Answer</p> Compare these 2 texts by theire content. Reply the missing information or tell the user that he answers correctly. Give the amount correctness in a percentage like [xx%]. Answer in german and in a short way.";
      const correctAnswer = quizData[questionIndex].antwort;
      const question = quizData[questionIndex].question;

      setLoading(true);
      const backendUrl = `/api?userAnswer=${encodeURIComponent(
        userAnswer
      )}&correctAnswer=${encodeURIComponent(
        correctAnswer
      )}&question=${encodeURIComponent(question)}&content=${encodeURIComponent(
        systemContent
      )}`;

      fetch(backendUrl)
        .then(res => {
          if (!res.ok) {
            setError(`Request failed with status ${res.status}`);
            setLoading(false);
            throw new Error(`Request failed with status ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          setGptData(data.reply);
          setSendAnswer(false);
          setLoading(false);
        })
        .catch(error => {
          console.error("An error occurred:", error.message);
        });
    }
  }, [userAnswer, sendAnswer]);

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
        console.log(data);
        setQuizdata(data);
      })
      .catch(error => {
        console.error("An error occurred:", error.message);
        setError(true);
      });
  }, []);

  useEffect(() => {
    setUserAnswer("");
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
      console.log(questionIndex);
    }
  };

  return (
    <div className="App">
      <div className="logo-container">
        <img src={logo} className="App-logo" alt="logo" />
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
      <p>
        {quizData && showCorrectAnswer
          ? quizData[questionIndex].antwort
          : "Hier steht die richtige Antwort"}
      </p>
      <p>{loading ? "Loading..." : gptData}</p>
      {error ? <p>Irgendetwas ist schief gelaufen...</p> : ""}
    </div>
  );
}

export default App;
