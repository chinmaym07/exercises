import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]) 
  const [ newPerson, setNewPerson ] = useState({name:'',number:''})
  const [filteredPerson,setFilteredPerson] = useState([]);
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setNewPerson({
      ...newPerson,
      [e.target.name] : e.target.value
    });
  }
  const handleSearch =(e) => {
    setSearch(e.target.value);

    setFilteredPerson(persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())));
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
      filter shown with : <input type="text" onChange={handleSearch} value={search} name="search"/>
      <h1>Add a New</h1>
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
        search ? (filteredPerson.length > 0 ? filteredPerson.map(person => <p key={person.name}>{person.name} {person.number}</p>) : <p>No Item Found</p>)
        :
        persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
      }
    </div>
  )
}

export default App