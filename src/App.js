import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import './style.css'

import Login from './Routes/Login';
import Dashboard from './Routes/Dashboard';

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/" exact component={Dashboard}/>
    </Switch>
  </Router>
);

export default App;
