
import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Switch,Route } from"react-router-dom";

const  App =()=> {
  const apiKey=process.env.REACT_APP_API_KEY
  const [progress, setProgress] = useState(0);
  // setProgress(progress);
    return (
      <div>
        <Router>
       <Navbar/>
       <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
       <Switch>
          <Route exact path="/general">  <News setProgress={ setProgress} apiKey={ apiKey} pageSize={5}  key="general" country="in" category="general"/>  </Route>
          <Route exact path="/business">  <News setProgress={ setProgress} apiKey={ apiKey} pageSize={5} key="business" country="in" category="business"/>  </Route>
          <Route exact path="/science">  <News setProgress={ setProgress} apiKey={ apiKey} pageSize={5} key="science" country="in" category="science"/>  </Route>
          <Route exact path="/entertainment">  <News setProgress={ setProgress} apiKey={ apiKey} pageSize={5} key="entertainment" country="in" category="entertainment"/>  </Route>
          <Route  exactpath="/sports">  <News setProgress={ setProgress} apiKey={ apiKey} pageSize={5} key="sports" country="in" category="sports"/>  </Route>
          <Route exact path="/technology">  <News setProgress={ setProgress} apiKey={ apiKey} pageSize={5} key="technology" country="in" category="technology"/>  </Route>
          <Route  exactpath="/health">  <News setProgress={ setProgress} apiKey={ apiKey} pageSize={5} key="health" country="in" category="health"/>  </Route>  
        </Switch>
       </Router>
      </div>
    )
}

export default App