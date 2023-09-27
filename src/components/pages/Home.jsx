import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={()=>navigate('/Quiz')}>Quiz</button>
      <button onClick={()=>navigate('/TestGPT')}>GPT Test</button>
    </div>
  )
}

export default Home
