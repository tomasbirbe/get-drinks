import Axios from "axios";
import { useEffect, useState } from "react";
import DrinksCarrousel from "./components/carrousel";
import "./styles/App.css";

function App() {
  const [drinkName, setDrinkName] = useState("")
  const [randomDrinks, setRandomDrinks] = useState([])
  const [drink, setDrink] = useState({
    name:"",
    img:""
  })
  
  useEffect(() => {
    if(randomDrinks.length === 0) getRandomDrinks()
  })

  function getRandomDrinks(){
    Axios({
      method:"get",
      url:`https://www.thecocktaildb.com/api/json/v1/1/random.php`
    })
    .then(({data}) => {
      let newDrink = {
        id:data.drinks[0].idDrink,
        name:data.drinks[0].strDrink,
        img:data.drinks[0].strDrinkThumb
      }
      setRandomDrinks([...randomDrinks, newDrink])
    })
  }

  function getDrink(event){
    if(event.key === "Enter"){
      Axios({
        method:"get",
        url:`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`
      })
      .then( ({data}) => {
        console.log(data)
        if(data.drinks !== null){
          setDrink({
            name:data.drinks[0].strDrink,
            img:data.drinks[0].strDrinkThumb,
          })
        } else {
          setDrink({
            name:"",
            url:""
          })
        }
      })
    } else {  
      setDrinkName(event.target.value)
    }
  }

  return (
    <div className="App">
      <div className="container-searchbar">
        <span className="container-searchbar--search-icon"></span>
        <input type="text" onKeyPress={getDrink} className="container-searchbar--searchbar"/>
        <span className="container-searchbar--filter-icon"></span>
      </div>

    
      {randomDrinks.length !== 0
      ? <DrinksCarrousel drinks={randomDrinks}></DrinksCarrousel>
      : ''
      }

      <button className="random-btn" onClick={getRandomDrinks}>Random drinks</button>
    </div>
  );
}

export default App;
