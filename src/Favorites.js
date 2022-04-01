import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FavoritesCityComp from './FavoritesCity';

function FavoritesComp() {
  // const [favorites, setfavorites] = useState([]);
    
  const favorites = useSelector((state) => state.favorites);
  // useEffect(() =>
  // {
  //   console.log(this.props.data.favorites);
  //   setfavorites(this.props.data.favorites)
  // },[])

  let items = favorites.map((item,index) =>
  {
    return(
    <div className="col " key={index}>
     <FavoritesCityComp key={index} cityF={item}></FavoritesCityComp>
    </div>
    )
  })

  return(
    <div className="favorite container">
      <h3>Your Favorities Cities</h3>
      <div className="row align-self-center">
        {items}
      </div>
    </div>)
  }

export default FavoritesComp;

