import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Drink from './pages/drink/drink';

export default function App() {
  return (
    <Router>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/:idDrink" exact>
        <Drink />
      </Route>
    </Router>

  );
}
