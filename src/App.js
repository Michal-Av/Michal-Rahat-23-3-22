import React, { Component }  from 'react';
import MainPageComp from './MainPage'
import './App.css'


class App extends Component
{
  render()
  {
    return(
      <div className="container-fluid"> 
          <MainPageComp />
      </div>
    )
  }
}


export default App;