import React, { useState, useEffect } from 'react';
import ImageIcon from './ImageIcon';


export default function DaysOnCityComp(props) {

  const [day, setDay] = useState("");
  const [imgIcon, setImgIcon] = useState("");
  const [metric, setMetric] = useState();
  
  useEffect(() =>
  {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date(props.day.Date);
    let name = weekday[d.getDay()];
    setDay(name)
    setImgIcon(`N_${props.day.Day.Icon}`)

    const c = ((props.day.Temperature.Minimum.Value - 32)*(5/9));
    setMetric(Math.round(c * 10) / 10)
  
  },[])

  return(
    <div className="card ">
      <ImageIcon src={props.day.Day.Icon} ></ImageIcon>
      <br></br>
      {day} <br></br>
      {metric}° C
    </div>
    )

}