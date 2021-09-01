import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RandomDrink from '../../components/random-drink';
import '../../styles/App.css';

const DRINK_INITIALIZE = {
  id: 0,
  name: '',
  img: '',
};

let isFirstRender = true;

export default function Home() {
  const [drinkName, setDrinkName] = useState('');
  const [randomDrink, setRandomDrink] = useState(DRINK_INITIALIZE);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function getRandomDrink() {
    setLoading(true);
    Axios({
      method: 'get',
      url: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
    })
      .then(({ data }) => {
        const newDrink = {
          id: data.drinks[0].idDrink,
          name: data.drinks[0].strDrink,
          img: data.drinks[0].strDrinkThumb,
        };
        setLoading(false);
        setRandomDrink(newDrink);
      });
  }

  useEffect(() => {
    if (isFirstRender === true) {
      isFirstRender = false;
      getRandomDrink();
    }
  });

  const handleChange = (event) => {
    event.preventDefault();
    setDrinkName(event.target.value);
  };

  const getDrinks = (event) => {
    if (event.target.value !== '') {
      Axios({
        method: 'get',
        url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`,
      })
        .then(({ data }) => {
          setDrinks([]);
          if (data.drinks !== null) {
            setDrinks([...data.drinks]);
          } else {
            setDrinks([]);
          }
        });
    } else {
      setDrinks([]);
    }
    event.preventDefault();
  };

  const showDrink = (drink) => () => {
    history.push(`/${drink.idDrink}`);
  };

  return (
    <div className="App">
      <div className="searchbar">
        <form className="searchbar--container-searchbar" onSubmit={getDrinks}>
          <span className="searchbar--container-searchbar--search-icon" />
          <input type="text" id="searchbar" onChange={handleChange} className="searchbar--container-searchbar--input" autoComplete="off" />
          <span className="searchbar--container-searchbar--filter-icon" />
        </form>
        {
          drinks.length !== 0
            ? (
              <div className="searchbar--container-results">
                <ul className="searchbar--container-results--results">
                  {
                drinks.map((element) => (
                  <button type="button" key={element.idDrink} onClick={showDrink(element)}>
                    <li className="searchbar--container-results--results--item">
                      {element.strDrink}
                      {/* <Link to={`/${element.idDrink}`}>{element.strDrink}</Link> */}
                    </li>
                  </button>
                ))
              }
                </ul>
              </div>
            )
            : ''
        }
      </div>

      {randomDrink.length !== 0
        ? <RandomDrink drink={randomDrink} isLoading={loading} />
        : ''}

      <button type="button" className="random-btn" onClick={getRandomDrink}>Random drinks</button>
    </div>
  );
}