import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleChange = (e) => {
    setNewName(e.target.value);
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
    
    let newObj = {
      name: newName
    };
    if(checkPresence(newObj)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(newObj));
      setNewName('');
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleChange} value={newName}/>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person=> <p key={person.name}>{person.name}</p>)
      }
    </div>
  )
}

export default App