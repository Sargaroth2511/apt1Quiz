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
      // const systemContent =
      //   " Du bist in der Rolle eines unfreundlichen und sarkastischen Prüfers an einer Deutschen IHK (ähnlich eins Lehrers). Du beurteilst Auszubildende in der Fachrichtung Fachinformatiker. Bei der Beurteilung bist du nicht zu streng. Wenn nach Gründen gefragt wird und nichts anderes der Frage zu entnehmen ist reicht ein Grund. Kurze Antworten sollen wohlwollend beantwortet werden. Sollte nicht nach einer Begründung gefragt werden, muss diese auch nicht geliefert werden. Sollte der Nutzer keine Antwort angeben oder angeben, dass er die Antwort nicht weiß, nenne ihm zusätzlich zu der Bewertung auch deine Antwort. Die Antwort ist in diesem Falle allerdings immer falsch und mit 0% zu bewerten. Deine Antwort soll als json formatiert sein und in folgenden Format ausgegeben werden:{answer: Beurteile die Richtigkeit und Vollständigkeit der Antwort (userAnswer) in Bezug auf die Frage (question). Gib an welche Elemente fehlen damit 100 % erreicht werden, percentage: erreichte Prozente der Richtigkeit der Antwort, GPTAnswer: deine Antwort auf 'question' aus dem json input}";
      const systemContent =
        'Du bist in der Rolle eines unfreundlichen und sarkastischen Prüfers an einer Deutschen IHK (ähnlich eins Lehrers). Du beurteilst Auszubildende in der Fachrichtung Fachinformatiker. Bei der Beurteilung bist du nicht zu streng. Wenn nach Gründen gefragt wird und nichts anderes der Frage zu entnehmen ist reicht ein Grund. Kurze Antworten sollen wohlwollend beantwortet werden. Sollte nicht nach einer Begründung gefragt werden, muss diese auch nicht geliefert werden. Sollte der Nutzer keine Antwort angeben oder angeben, dass er die Antwort nicht weiß, nenne ihm zusätzlich zu der Bewertung auch deine Antwort. Die Antwort ist in diesem Falle allerdings immer falsch und mit 0% zu bewerten. Dein Input hat folgendes Format und als delimiter wird """ genutzt. """1. Frage an den Auszubildenden""", """2. Vorgefertigte Antwort""", """3. Antwort des Auszubildenden""" Format the answer as JSON like: {"anwer": "Gehe in folgenden Schritten vor: 1. Beantworte selbst die Frage, die dem Auszubildenden gestellt wird ("""1. Frage an den Auszubildenden"""). 2. Analysiere eine vorgefertigte Antwort auf die in 1 gestellte Frage ("""2. Vorgefertigte Antwort"""). 3. Analysiere die Antwort des Auszubildenden ("""3. Antwort des Auszubildenden"""). 4. Vergleiche die Antwort aus Schritt 3 mit der Frage aus Schritt 1, deiner Antwort dazu und der Antwort aus Schritt 2. Schritte 1 - 4 sollen als innerer Monolog durchgeführt werden 5. Beurteile  die Antwort in deiner anfangs definierten Rolle.", "percentage": "amount of correctness of Antwort des Auszubildenden in percentage", "GPTAnswer": "your answer to Frage an den Auszubildenden"} ';

      const correctAnswer = quizData[questionIndex].antwort;
      const question = quizData[questionIndex].frage;
      const advices =
        "Gebe folgendes Format aus: Output als json {answer: dein Ergebnis aus Schritt 4. Gib auch an welche Elemente fehlen damit 100 % erreicht werden, percentage: erreichte Prozente der Richtigkeit der Antwort, GPTAnswer: deine Antwort aus Schritt 1}";

      setLoading(true);
      // const backendUrl = `/api?userAnswer=${encodeURIComponent(
      //   userAnswer
      // )}&correctAnswer=${encodeURIComponent(
      //   correctAnswer
      // )}&question=${encodeURIComponent(question)}&content=${encodeURIComponent(
      //   systemContent
      // )}`;

      const backendUrl = "/api";

      const requestData = {
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
        question: question,
        systemContent: systemContent,
        advices: advices,
      };

      fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then(res => {
          if (!res.ok) {
            setError(`Request failed with status ${res.status}`);
            setLoading(false);
            throw new Error(`Request failed with status ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          console.log(data);
          setGptData(JSON.parse(data.reply));
          setSendAnswer(false);
          setLoading(false);
        })
        .catch(error => {
          console.error("An error occurred:", error, error.message);
          setError(error.message);
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
      <div>
        <div>
          {quizData && showCorrectAnswer ? (
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
              <div className="gpt-percentage">{gptData.percentage}</div>
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
  );
}

export default App;
