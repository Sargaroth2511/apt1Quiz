import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TestGPT = () => {
    const [question, setQuestion] = useState('')
    const [sendQuestion, setSendQuestion] = useState(false)
    const navigate = useNavigate()

    const submitForm = e => {
      e.preventDefault()
      if(e.keyCode === 13){
        e.preventDefault()
      }
      console.log(e.keyCode)
      setSendQuestion(true)
    }

    const handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        event.preventDefault()
        setSendQuestion(true)
      }
    }

  return (
    <div>
        <form onKeyDown={handleKeyPress} onSubmit={submitForm}>
            <button onClick={() => navigate('/')}>Zurück</button>
            <br />
            <label htmlFor="searchField">Deine Frage an ChatGPT</label>
            <br />
            <input type="text" name="" id="searchField" maxLength={500} 
            onChange={(e)=> setQuestion(e.target.value)} value={question} />
            <button type="submit">Submit</button>
        </form>

        <br />
        {/* <button onClick={() => setSendQuestion(true)}>Frage absenden</button> */}
        <p>Hier steht deine Frage</p>
        {sendQuestion && <p>{question}</p>}
    </div>
  )
}

export default TestGPT
