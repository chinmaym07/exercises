import React, { useState ,useEffect } from 'react'
import serverCom from './serverCom';


const SearchComponent = ({handleSearch,search}) =>(
  <p>filter shown with : <input type="text" onChange={handleSearch} value={search} name="search"/></p>
)

const AddANewPersonConponent = ({handleChange,newPerson,handleSubmit})=> (
  <form>
    <div>
      name: <input type="text" onChange={handleChange} value={newPerson.name} name="name"/>
    </div>
    <div>number: <input type="text" onChange={handleChange} value={newPerson.number} name="number" /></div>
    <div>
      <button type="submit" onClick={handleSubmit}>add</button>
    </div>
  </form>
)

const App = () => {
  const [ persons, setPersons ] = useState([]) ;
  const [ newPerson, setNewPerson ] = useState({id:'',name:'',number:''})
  const [filteredPerson,setFilteredPerson] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(()=>{
    serverCom
    .getAll()
    .then(data => setPersons(data))
  },[])

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
      serverCom
      .create(newPerson)
      .then(data=>console.log(data));
      setPersons(persons.concat(newPerson));
      setNewPerson({name:'',number:''});
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchComponent handleSearch={handleSearch} search={search} />
      <h1>Add a New</h1>
      <AddANewPersonConponent handleChange={handleChange} handleSubmit={handleSubmit} newPerson={newPerson}/>
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