import React, { useEffect, useState } from 'react'
import handleCSV from './handleCSV'


const Quiz = () => {
  
  const [data, setData] = useState(false)
  const [showAnser, setShowAnser] = useState(false)
  const [cardIndex, setCardIndex] = useState(0)

  const showAnswer = () => {
    setShowAnser(!showAnser)

  }

  const nextAnswer = () =>{
    if (cardIndex === data.length + 1) return
    setCardIndex(cardIndex+1)
  }

  const prevAnswer = () =>{
    if (cardIndex === 0) return
    setCardIndex(cardIndex-1)
  }

  useEffect(() => {
    async function fetchData(){
        const result = await handleCSV('/CSV/quizlet_apt1.csv');
        setData(result)
    };
    fetchData();
  }, [])
    
  return (
    <div>
      <h1>Hallo Quiz</h1>
      {data && data.map((data, i)=> {
        const question = data.frage
        const answer = data.antwort 
        const learningFiled = data.LF
        const index = i+1
        if (i ===cardIndex)
        return (
            
            <div key={'div'+i}>
                <h1>{'Frage '+ index}</h1>
                <h2 key={'lf'+i}>{learningFiled}</h2>
                <p key={'question'+i}>{question}</p>
                <button onClick={()=>prevAnswer()}>Vorherige Frage</button>
                <button onClick={()=>showAnswer()}>Antwort zeigen</button>
                <button onClick={()=>nextAnswer()}>Nächste Frage</button>

                {showAnser && <p key={'answer' + i}>{answer}</p>}
            </div>
        )
      })}
    </div>
  )
}

export default Quiz
