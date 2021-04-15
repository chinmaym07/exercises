import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' ,number:"040-1234567"}
  ]) 
  const [ newPerson, setNewPerson ] = useState({name:'',number:''})

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setNewPerson({
      ...newPerson,
      [e.target.name] : e.target.value
    });
  }
  
  const checkPresence= (obj)=> {
    for(let i = 0 ; i < persons.length;i++)
    {
      if(persons[i].name === obj.name)
        return true;
    }
    return false;
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    
    if(checkPresence(newPerson)){
      alert(`${newPerson.name} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(newPerson));
      setNewPerson({name:'',number:''});
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input type="text" onChange={handleChange} value={newPerson.name} name="name"/>
        </div>
        <div>number: <input type="text" onChange={handleChange} value={newPerson.number} name="number" /></div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
      }
    </div>
  )
}

export default App