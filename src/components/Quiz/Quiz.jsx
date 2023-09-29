import React, { useEffect, useState } from 'react'
import handleCSV from './handleCSV'
import connectGPT from './connectGPT'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import quizdata from './addLearnfield'

const Quiz = () => {



  const [data, setData] = useState(false)
  const [showAnser, setShowAnser] = useState(false)
  const [cardIndex, setCardIndex] = useState(0)
  const [gptData, setGptData] = useState(null)
  const navigate = useNavigate();

  const showAnswer = () => {
    setShowAnser(!showAnser)

  }

  const nextAnswer = () => {
    if (cardIndex === data.length + 1) return
    setCardIndex(cardIndex + 1)
  }

  const prevAnswer = () => {
    if (cardIndex === 0) return
    setCardIndex(cardIndex - 1)
  }

  useEffect(() => {
    setData(quizdata());

    const options = {
      method: 'POST',
      url: 'http://localhost:5000/ask',
      data: {
        question: 'Was bedeutet SMART im Projektmanagement?', // Replace with the user's question
      },
    }
    axios.request(options)
      .then(function (response) {
        console.log(response.data.reply)
        setGptData(response.data.data)
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [])


  return (
    <div>
      <h1>Hallo Quiz</h1>
      {data && data.map((data, i) => {
        const question = data.frage
        const answer = data.antwort
        const learningFiled = data.LF
        const index = i + 1
        if (i === cardIndex)
          return (

            <div key={'div' + i}>
              <h1>{'Frage ' + index}</h1>
              <h2 key={'lf' + i}>{learningFiled}</h2>
              <p key={'question' + i}>{question}</p>
              <button onClick={() => prevAnswer()}>Vorherige Frage</button>
              <button onClick={() => showAnswer()}>Antwort zeigen</button>
              <button onClick={() => nextAnswer()}>Nächste Frage</button>

              {showAnser && <p key={'answer' + i}>{answer}</p>}
            </div>
          )
      })}
      <button onClick={() => navigate('/')} >Zurück</button>
    </div>
  )
}

export default Quiz
