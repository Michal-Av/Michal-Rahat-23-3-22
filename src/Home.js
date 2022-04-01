import React, { useState, useEffect } from 'react';
import useDebounce from './useDebounce';
import { useDispatch, useSelector } from 'react-redux';
import NavbarComp from './Navbar';
import './styles.css'
import axios from 'axios';
import CityComp from './City';
import FavoritesComp from './Favorites';
import defaultCity from './jsonFiles/defaultCity';
// const API_KEY = '0r6bDyXeQJqMu2lkr3TraNZxdGcWrAbz' 'GrflztxvjXBxxA94uOpKBdVK7GCocfzJ' 'MG6mXoTaUgHbChoshaiF8Aiyf86rZoWN'; 


function HomeComp() {
  const API_KEY = 'GrflztxvjXBxxA94uOpKBdVK7GCocfzJ'; 
  const URL_AUTO = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete/";
  const URL_CURRENT = "http://dataservice.accuweather.com/currentconditions/v1/";
  const URL_5days = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
  const favorites = useSelector((state) => state.favorites);

  const [cities, setCities] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [currentCity, setCurrentCity] = useState(defaultCity.autocomplete[0]);
  const [isChosen, setIsChosen] = useState(true);
  const [fivenext, setfivenext] = useState( []);
  const [dataCity, setDataCity] = useState( {});
  
  const comp = useSelector((state) => state.comp);
  const debouncedText = useDebounce(text, 500);
  
  let defaultTelAviv= async() =>{
        setCities(defaultCity.autocomplete);
        setText('Tel Aviv');
        setCurrentCity(defaultCity.autocomplete[0]);
        if(isChosen)
        {
          setDataCity(defaultCity.currentCity)
          setfivenext(defaultCity.DailyForecasts)
        }
  }
  
  useEffect( async() => {
    defaultTelAviv();
  }, [])

  useEffect( async() => {
    let matches = [];
    setText(text)
    if (text.length > 3) {
      // axios.get("http://localhost:8000/api/autocomplete/") 
      axios.get(URL_AUTO, { headers: {"Access-Control-Allow-Origin": "*",
                                      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                                      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"} ,
                            params: { apikey : API_KEY, q: text } })
      .then(resp =>
        {
          setCities(resp.data);
          matches = cities.filter(city => { 
            return city.Country.ID === "IL"
            
          })
          setSuggestions(matches)
        })
        .catch(error => {
          console.log(error.response);
          // throw new Error(alert('Something went wrong'))
    });
    }
   
  }, [debouncedText])

    useEffect( async() => {
      if(isChosen)
      {
        axios.get(URL_CURRENT+currentCity.Key,{ params: { apikey : API_KEY } })
        .then(resp => { setDataCity({...resp.data[0], LocalizedName: currentCity.LocalizedName}) })
        .catch(error => {
          console.log(error.response)
          // throw new Error(alert('Something went wrong'))
        });
        axios.get(URL_5days+currentCity.Key,{ params: { apikey : API_KEY } })
        .then(resp => { setfivenext(resp.data.DailyForecasts) 
        })
        .catch(error => {
          console.log(error.response);
          // throw new Error(alert('Something went wrong'))
      });
    }
    }, [currentCity])

  const onChangeHandler = (text) =>{
    setText(text);
    
  }

  const onSuggestHandler = (text) =>{
    setText(text);
    setSuggestions([]);
  }


  let showcomponent;
  if(comp === "home")
    showcomponent = true; 
  if(comp === "favorite")
    showcomponent = false;

  return (
    <div className="home">
        <NavbarComp />
      {showcomponent ?  
      <div>
        <h3>Wellcome!</h3>
      <div className="container-fluid">
        <input type="text" className='col-md-12 input' style={{ marginTop: 10 }}
          onChange={e => setText(e.target.value)}
          value={text}
          onBlur={() => {
            // setTimeout(() =>{
              // setSuggestions([]);
            // },100);
          }}
          placeholder="Please Enter your City.."
        ></input>
        {suggestions && suggestions.map((suggestion, i) =>
        <div key={i} className='suggestion col-md-12 justify-content-md-center'
        onClick={()=>{
          onSuggestHandler(suggestion.LocalizedName);
          setCurrentCity(suggestion);
          setIsChosen(true);
          }}>
          {suggestion.LocalizedName}</div>
        )}
      </div>
     
       <div>
        {showcomponent}
        {isChosen && <CityComp city={currentCity} datacity={dataCity} nextdays={fivenext} />} </div></div> :
        <div>
          <FavoritesComp></FavoritesComp>
      </div>}
    </div>
  );

}


export default HomeComp;
