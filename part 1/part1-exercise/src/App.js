import React,{useState} from 'react'
const Statistic = ({text,value,last})=>(
  <tr>
    <td>{text}</td><td>{value}</td>
    {last?<td>{last}</td>:null}
  </tr>
)

const Statistics = ({good,neutral,bad})=> (
  <div>
    <h1>Statistics</h1>
    {
      good+neutral+bad?<div>
      <table>
      <tbody>
        <Statistic text="Good" value={good} />
        <Statistic text="Neutral" value={neutral} />
        <Statistic text="Bad" value={bad} />
        <Statistic text="All" value={good+neutral+bad} />
        <Statistic text="Average" value={((good-bad)/(good+neutral+bad)).toFixed(1)} />
        <Statistic text="Positive" value={((good*100)/(good+neutral+bad)).toFixed(1)} last="%" />
        </tbody>
      </table>
    </div>:<p>No Feedback Given</p>
    }
  </div>
)
const Button = ({handleClick,text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>Give Feedback</h1>
      <div className="buttons">
        <Button handleClick={()=> setGood(good+1)} text="Good" />
        <Button handleClick={()=> setNeutral(neutral+1)} text="Neutral" />
        <Button handleClick={()=> setBad(bad+1)} text="Bad" />
      </div>
     <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App