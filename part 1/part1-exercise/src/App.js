import React,{useState} from 'react'

const Statistics = ({good,neutral,bad})=> (
  <div>
    <h1>Statistics</h1>
    {
      good+neutral+bad?<div>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>all {good+neutral+bad}</p>
      <p>average {(good-bad)/(good+neutral+bad)}</p>
      <p>positive {(good)/(good+neutral+bad)} %</p>
    </div>:<p>No Feedback Given</p>
    }
  </div>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>Give Feedback</h1>
      <div className="buttons">
        <button onClick={()=> setGood(good+1)}>Good</button>
        <button onClick={()=> setNeutral(neutral+1)}>Neutral</button>
        <button onClick={()=> setBad(bad+1)}>Bad</button>
      </div>
     <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App