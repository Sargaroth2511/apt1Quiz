import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const TestGPT = () => {
    const [question, setQuestion] = useState('')
    const [sendQuestion, setSendQuestion] = useState(false)
    const [gptData, setGptData] = useState(null)
    const navigate = useNavigate()

    const submitForm = e => {
      e.preventDefault()
      if(e.keyCode === 13){
        e.preventDefault()
      }
      // console.log(e.keyCode)
      setSendQuestion(true)
    }

    const handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        event.preventDefault()
        setSendQuestion(true)
      }
    }

    useEffect(()=> {
      const options = {
        method: 'POST',
        url: 'http://localhost:5000/ask',
        data: {
          question: question, // Replace with the user's question
        },
      }
      if (sendQuestion) {
        axios.request(options)
        .then(function (response) {
          console.log(response.data.reply)
          setGptData(response.data.reply)
          setSendQuestion(false)
        })
        .catch(function (error) {
          console.error(error)
        })}
    },[question, sendQuestion, gptData])



  return (
    <div>
        <form onKeyDown={handleKeyPress} onSubmit={submitForm}>
            <button onClick={() => navigate('/')}>Zurück</button>
            <br />
            <label  htmlFor="searchField"></label>
            <br />
            <textarea placeholder='Deine Frage an ChatGPT' type="text" name="" id="searchField" maxLength={500} 
            onChange={(e)=> setQuestion(e.target.value)} value={question} />
            <br />
            <button type="submit">Submit</button>
        </form>

        <br />
        {/* <button onClick={() => setSendQuestion(true)}>Frage absenden</button> */}
        <p>ChatGPT sagt</p>
        {gptData && <p>{gptData}</p>}
    </div>
  )
}

export default TestGPT
