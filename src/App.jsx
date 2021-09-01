import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Drink from './pages/drink/drink';

// const DRINK_INITIALIZE = {
//   id: 0,
//   name: '',
//   img: '',
// };

export default function App() {
  const [drink, setDrink] = useState({

  });

  return (
    <Router>
      <Route path="/" exact>
        <Home setterDrink={setDrink} />
      </Route>
      <Route path="/:idDrink" exact>
        <Drink drink={drink} />
      </Route>
    </Router>

  );
}
