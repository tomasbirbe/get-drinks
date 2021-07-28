import Axios from "axios";
import { useState } from "react";
import DrinksCarrousel from "./components/carrousel";

function App() {
  const [drinkName, setDrinkName] = useState("")
  const [randomDrinks, setRandomDrinks] = useState([])
  const [drink, setDrink] = useState({
    name:"",
    img:""
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

      {drink.name !== "" 
      ? <div className="drink">
        <span>Drink: {drink.name} </span>
        <img src={drink.img} width="500" />
      </div>
      : <span>No se encontro esa bebida</span>
      }

      <button onClick={getRandomDrinks}>Random drinks</button>

      <drinks-carrousel drinks={randomDrinks}></drinks-carrousel>
      {/* <ul>
        {
          randomDrinks.map(drink => {
            return(
              <li key={idDrink}>
                <p>{drink.name}</p>
                <img src={drink.img} />
              </li>
            )})
        }
      </ul> */}
      <button onClick={() => console.log(randomDrinks)}>adsfasdf</button>
    </div>
  );
}

export default App;
