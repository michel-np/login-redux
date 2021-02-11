import React, { EventHandler } from 'react';
import {useSelector, useDispatch} from "react-redux"
import './App.css';
import {GlobalStore} from "./store/Store"
import { GetUserToken  } from "./store/actions/UserActions"
import {BrowserRouter as Router, Switch , Route} from "react-router-dom"
import LoginPage from "./components/LoginPage"
import Dashboard from "./components/Dashboard";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles"
import CssBaseLine from  "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette:{
    primary:{
      main:"#020b2e"
    },
    secondary:{
      main:"#e8e8e8"
    }
  }
})

function App() { 
    return(
    <ThemeProvider theme={theme}>
      <CssBaseLine/>
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
    </ThemeProvider>
    );
}

export default App;
