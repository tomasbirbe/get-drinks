import Axios from "axios";
import { useEffect, useState } from "react";
import RandomDrink from "./components/random-drink"
import "./styles/App.css";

const DRINK_INITIALIZE = {
  id:0,
  name:"",
  img:""
}

function App() {
  const [drinkName, setDrinkName] = useState("")
  const [randomDrink, setRandomDrink] = useState(DRINK_INITIALIZE)
  const [drink, setDrink] = useState(DRINK_INITIALIZE)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if(randomDrink.id === 0) getRandomDrink()
  })

  function getRandomDrink(){
    setLoading(true) 
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
      setLoading(false)
      setRandomDrink(newDrink)
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

    
      {randomDrink.length !== 0
      ? <RandomDrink drink={randomDrink} isLoading={loading}></RandomDrink>
      : ''
      }

      <button className="random-btn" onClick={getRandomDrink}>Random drinks</button>
    </div>
  );
}

export default App;
