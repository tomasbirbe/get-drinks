import Home from "./pages/home/index";
import Drink from "./pages/drink/index"
import { useState } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

const DRINK_INITIALIZE = {
  id:0,
  name:"",
  img:""
}


export default function App() {
  const [drink, setDrink] = useState({

  })

  return(
    <Router>
      <Route path="/" exact>
        <Home setterDrink={setDrink}/>
      </Route>
      <Route path="/:idDrink" exact>
        <Drink drink={drink}></Drink>
      </Route>
    </Router>

  )
}