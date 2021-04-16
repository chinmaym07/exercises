import axios from 'axios';
import React , {useState , useEffect } from 'react';


const CountryInfo = ({country}) => {
  const [weatherInfo,setWeatherInfo] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(()=>{
    
    axios.get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.capital}`)
    .then(response => setWeatherInfo(response.data));

  },[setWeatherInfo]);

  if(country)
    return (  
      <div>
        <h1>{country.name}</h1>
        <p>Captial :{country.capital}</p>
        <p>Population :{country.population}</p>
        <h4>Languages</h4>
        <ul>
        {
          country.languages.map((lang,i) => <li key={i}>{lang.name}</li>)
        }
        </ul>
        <div>
          <img src={country.flag} alt="flag" width="150px" height="150px"/>
        </div>
       {
          weatherInfo !== null ? <div>
            <h3>Weather in {country.capital}</h3>
            <div>
              <p>temperature : {weatherInfo.current.temperature} Celsius</p>
              <div>
                {
                  weatherInfo.current.weather_icons.map((img_src,ind)=> <img key={ind} src={img_src} alt={ind} />)
                }
              </div>
              <p>wind: {weatherInfo.current.wind_speed} mph direction {weatherInfo.current.wind_dir}</p>
            </div>
          </div>:null
       } 
      </div>
    )
}

const CountryLessInfo = ({country,handleShow ,ind})=>{
  return (
    <div>
      <p>{country.name}</p>
      <button id={ind} onClick={handleShow} >Show</button>
    </div>
  )
}


const App = () => {
  const [countries,setCountries] = useState([]);
  const [search,setSearch] = useState('');
  const [filteredArr,setFiteredArr] = useState([]);
  const [message,setMessage] = useState('');
  const [selectedElem,setSelectedElem] = useState(null);
  

  const handleShow = (e) => {
    setSelectedElem(filteredArr[e.target.id])
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
    setSelectedElem(null);
  }
  
  const handleSubmit = (e) =>{
    if(search !== '')
    {
      const arr = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()));
      if(arr.length > 10)
      {
        setMessage('Too Many Matches, Specify Another filter');
        setFiteredArr([]);
        setSelectedElem(null);
      }
      else
      {
        setFiteredArr(arr);
        setMessage('');
        setSelectedElem(null);
      }
    }
    else
    {
      setFiteredArr([]);
      setMessage('');
      setSelectedElem(null);
    } 
  }

  useEffect(()=> {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => setCountries(response.data));

  },[]);

  useEffect(()=>{
    handleSubmit();
  },[search]);

  return (
    <div className="App">
      <div>
        Find countries <input type="text" onChange={handleChange} value={search}/>
      </div>  
      {
        message ? <p>{message}</p> : null
      }
      <div>
        {
          filteredArr.length > 1 ? filteredArr.map((country,i) => <CountryLessInfo handleShow={handleShow} country={country} key={i} ind={i}/>):null
        }
        {
          filteredArr.length === 1  ? <CountryInfo country={filteredArr[0]}/>:null
        }
        {
          selectedElem != null ? <CountryInfo country={selectedElem}/> : null
        } 
      </div>
    </div>
  );
}

export default App;
