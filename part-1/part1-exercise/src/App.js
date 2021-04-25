import React, { useState ,useEffect } from 'react'
import serverCom from './serverCom';
import './index.css'


const SearchComponent = ({handleSearch,search}) =>(
  <p>filter shown with : <input type="text" onChange={handleSearch} value={search} name="search"/></p>
)


const Person = ({person,handleDelete})=>{

  return (
  <div>
    <p key={person.id}>{person.name} {person.number}</p>
    <button onClick={()=> handleDelete(person.id)}>delete</button>
  </div>
  )
}


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
  const [notifMessage,setNotifMessage] = useState('');
  const [typeOfNotif,setTypeNotifMessage] = useState(0);

  useEffect(()=>{
    serverCom
    .getAll()
    .then(data => setPersons(data))
    .catch(error => {
      setNotifMessage(error.message)
      setTypeNotifMessage(-1);
    });

  },[])

  const handleDelete = (id)=> {
    serverCom
    .deletePerson(id)
    .then(data => {
        let obj = persons.find(person => person.id === id);
        setNotifMessage(`Information of ${obj.name} Deleted !!`);
        setTypeNotifMessage(1);
      })
    .catch(error => {
      setNotifMessage(error.message)
      setTypeNotifMessage(-1);
    });
    setTimeout(() => {
      setNotifMessage('')
    }, 5000);
    setPersons(persons.filter(person => person.id !== id))
  }
  const handleChange = (e) => {

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
      if(persons[i].name === obj.name && persons[i].number !== obj.number)
        return persons[i].id;
    }
    return null;
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    let id = checkPresence(newPerson);
    if(id !== null){
        let val = window.confirm(`${newPerson.name} is already added to phonebook,replace the old number with a new one`);
        if(val)
        {
          let newObj = {
            id,
            ...newPerson
          }
          serverCom
          .update(id,newObj)
          .then(data => {
            setPersons(persons.map(person => person.id !== id ? person : data))
            setNotifMessage(`Phone Number of ${newPerson.name} Updated `);
            console.log(`Phone Number of ${newPerson.name} Updated `);
            setTypeNotifMessage(1);
          })
          .catch(error => {
            setNotifMessage(`Information of ${newPerson.name} has already been removed from server !!`);
            setTypeNotifMessage(-1);
          });
          setNewPerson({name:'',number:''});    
          setTimeout(() => {
            setNotifMessage('')
          }, 5000);
        }
          
      
    }
    else{
      serverCom
      .create(newPerson)
      .then(data=>{
        setPersons(persons.concat(data))
        setNotifMessage(`Added ${newPerson.name}`);
        console.log(`Added ${newPerson.name}`)
        setTypeNotifMessage(1);
      })
      .catch(err => {
        setNotifMessage(err.response.data.error)
        setTypeNotifMessage(-1);
      })
      setTimeout(() => {
        setNotifMessage('')
      }, 5000);
      setNewPerson({name:'',number:''});
    }
    
  }

  return (
    <div>
      <h1>Phonebook</h1>
      {
        notifMessage !== '' ? <div className={typeOfNotif === 1 ? "post-notif":"neg-notif"}>
        {notifMessage}
        </div>:null
      }
      <SearchComponent handleSearch={handleSearch} search={search} />
      <h1>Add a New</h1>
      <AddANewPersonConponent handleChange={handleChange} handleSubmit={handleSubmit} newPerson={newPerson}/>
      <h2>Numbers</h2>
      {
        search ? (filteredPerson.length > 0 ? filteredPerson.map(person => <Person key={person.id} person={person} handleDelete={handleDelete}/>) : <p>No Item Found</p>)
        :
        persons.map(person =>  <Person key={person.id} person={person} handleDelete={handleDelete} />)
      }
    </div>
  )
}

export default App