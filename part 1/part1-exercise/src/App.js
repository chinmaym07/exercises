import React from 'react'

const Header = ({course})=>{
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Part = ({part,exercises}) => {
  return (
    <p>
      {part} {exercises}
    </p>
    )
}

const Content = ({parts})=>{
  return (
    <div>
    {
      parts.map(({name,exercises,id})=>(
        <Part key={id} part={name} exercises={exercises} />
      ))
    }
    </div>
  )
}

const Total = ({parts}) => {
  return (
    <p>
      Total Number of exercises {parts.reduce((acc,obj)=> acc + obj.exercises,0)}
    </p>
  )
}

const Course = ({course})=>{
  return <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
};
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }


  return (
    <Course course={course}/>
  )
}

export default App