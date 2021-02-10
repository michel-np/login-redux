import React, { EventHandler } from 'react';
import {useSelector, useDispatch} from "react-redux"
import './App.css';
import {GlobalStore} from "./store/Store"
import { GetUserToken  } from "./store/actions/UserActions"
import {BrowserRouter as Router, Switch , Route} from "react-router-dom"
import LoginPage from "./components/LoginPage"
import Dashboard from "./components/Dashboard";


function App() { 
    return(
     <Router>
       <Switch>
       <Route exact path="/">
          <LoginPage/>
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
       </Switch>
     </Router>
    );
}

export default App;
