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
  const [selected, setSelected] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const handleClick = e =>{
    console.log((Math.random()*10).toFixed(0)%6);
    setSelected((Math.random()*10).toFixed(0)%6);
  }
  return (
    <div>
      {anecdotes[selected]}
      <div>
        <button onClick={handleClick}>Next Anecdote </button>
      </div>
    </div>
    
  )
}

export default App