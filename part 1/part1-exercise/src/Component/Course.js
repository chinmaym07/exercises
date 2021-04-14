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

export default Course;