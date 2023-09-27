import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TestGPT = () => {
    const [question, setQuestion] = useState('')
    const [sendQuestion, setSendQuestion] = useState(false)
    const navigate = useNavigate()

  return (
    <div>
        <form>
            <button onClick={() => navigate('/')}>Zurück</button>
            <br />
            <label htmlFor="searchField">Deine Frage an ChatGPT</label>
            <br />
            <input type="text" name="" id="searchField" maxLength={500} 
            onChange={(e)=> setQuestion(e.target.value)} value={question} />
        </form>

        <br />
        <button onClick={() => setSendQuestion(true)}>Frage absenden</button>
        <p>Hier steht deine Frage</p>
        {sendQuestion && <p>{question}</p>}
    </div>
  )
}

export default TestGPT
