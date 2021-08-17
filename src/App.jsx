import Axios from "axios";
import { useEffect, useState } from "react";
import RandomDrink from "./components/random-drink"
import "./styles/App.css";

const DRINK_INITIALIZE = {
  id:0,
  name:"",
  img:""
}

let isFirstRender = true

function App() {
  const [drinkName, setDrinkName] = useState("")
  const [randomDrink, setRandomDrink] = useState(DRINK_INITIALIZE)
  const [drinks, setDrinks] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if(isFirstRender === true){
      isFirstRender = false
      getRandomDrink()
    } 
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
    if(event.key === "Enter" && event.target.value !== ''){
      Axios({
        method:"get",
        url:`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`
      })
      .then( ({data}) => {
        setDrinks([])
        if(data.drinks !== null){
          console.log(data.drinks)
          setDrinks([...data.drinks])
        } else {
          setDrinks([])
        }
      })
    } else if(event.target.value === ''){  
      setDrinks([])
    } else {
      setDrinkName(event.target.value.trim())
    }
  }

  return (
    <div className="App">
      <div className="searchbar">
        <div className="searchbar--container-searchbar">
          <span className="searchbar--container-searchbar--search-icon"></span>
          <input type="text" onKeyPress={getDrink} className="searchbar--container-searchbar--input"/>
          <span className="searchbar--container-searchbar--filter-icon"></span>
        </div>
        {
          drinks.length !== 0 ?
          <div className="searchbar--container-results">
            <ul className="searchbar--container-results--results">
              {
                drinks.map((element,index) => <li key={index} className="searchbar--container-results--results--item">{element.strDrink}</li>)
              }
            </ul>
          </div>
          : ''
        }
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
