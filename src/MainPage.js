import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import HomeComp from './Home';

import FavoritesComp from './Favorites';

function MainPageComp()  {

    return (
      <div>
      <div className="container">
      
        <Switch>
          <Route exact path="/" component={HomeComp} />
          <Route path= "/home" component={HomeComp} />
          <Route path= "/favorites" component={FavoritesComp} />
        </Switch>
      </div>
    </div>
    );
  }
  
  export default MainPageComp;