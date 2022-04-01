import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ImageIcon from './ImageIcon';



export default function FavoritesCityComp(props) {

  const [city, setCity] = useState(props.cityF);
  
  useEffect(() =>
  {
    // const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    // const d = new Date(props.day.Date);
    // let name = weekday[d.getDay()];
    // setDay(name)
  },[])

  return(
    <div className="card md-4 input ">
      <ImageIcon src={city.WeatherIcon}></ImageIcon>
      {city.LocalizedName} <br/>
      {city.Temperature.Metric.Value}° {city.Temperature.Metric.Unit}  <br/><br/>
      {city.WeatherText}
    </div>
    )

}