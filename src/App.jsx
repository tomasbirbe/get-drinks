import Home from "./pages/home/index";
import Drink from "./pages/drink/index"
import { BrowserRouter as Router, Route } from 'react-router-dom';

// const DRINK_INITIALIZE = {
//   id:0,
//   name:"",
//   img:""
// }


export default function App() {
  return(
    <Router>
      <Route path="/" exact>
        <Home/>
      </Route>
      <Route path="/:idDrink" exact>
        <Drink></Drink>
      </Route>
    </Router>

  )
}