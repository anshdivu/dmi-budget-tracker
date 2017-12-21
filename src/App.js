import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './Components/Home';
import NewProject from './Components/NewProject';
import './App.scss';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/new-project" component={NewProject} />
  </Switch>
);

export default App;
