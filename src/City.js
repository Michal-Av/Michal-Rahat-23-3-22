import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import DaysOnCityComp from './DaysOnCity';
import ImageIcon from './ImageIcon';

export default function CityComp(props) {

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  function addFavoritesHandler()
  {
    console.log('add fav')
    dispatch({ type : "APPEND", payload : props.datacity })
      } 

   const [currentCity, setCurrentCity] = useState(props.datacity);
   
  
  useEffect(() => {
    setCurrentCity(props.datacity)
    console.log(currentCity);
    
  },[])

  let days_items = props.nextdays.map((item,index) =>
  {
    return  <div className="flex-container space-between" key={index}> 
            <DaysOnCityComp day={item} /> 
            </div> 
  })


  return(
  <div className="city container">
    <div className="row">
      <div className="col">
            <div className="icon"><ImageIcon size={"50px"} src={props.datacity.WeatherIcon}/></div> <div><h4>{props.city.LocalizedName}</h4>
            {/* <h5> {props.datacity.Temperature.Metric.Value}° C</h5> */}
            </div>     
      </div>
      <div className="col">
      </div>
      <div className="left col">
        <Button onClick={()=> {addFavoritesHandler()}} variant="contained" endIcon={<FavoriteIcon sx={{ fontSize: 35 }}  />}>
        Add To Favorites
        </Button>
      </div>
    </div>
    <div className="maintxt col align-self-center">
      {props.datacity.WeatherText}
    </div>

    <div className="row">
      {days_items}
        </div>
  </div>
  )
}

