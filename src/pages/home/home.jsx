import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RandomDrink from '../../components/random-drink';
import '../../styles/App.css';

const DRINK_INITIALIZE = {
  idDrink: '0',
  strDrink: '',
  strDrinkThumb: '',
};

let isFirstRender = true;

export default function Home({ setterDrink }) {
  const [drinkName, setDrinkName] = useState('');
  const [randomDrink, setRandomDrink] = useState(DRINK_INITIALIZE);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(false);

  function getRandomDrink() {
    setLoading(true);
    Axios({
      method: 'get',
      url: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
    })
      .then(({ data }) => {
        const newDrink = {
          idDrink: data.drinks[0].idDrink,
          strDrink: data.drinks[0].strDrink,
          strDrinkThumb: data.drinks[0].strDrinkThumb,
        };
        setLoading(false);
        setRandomDrink(newDrink);
      });
  }

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
            // console.log(data.drinks);
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

  useEffect(() => {
    if (isFirstRender === true) {
      isFirstRender = false;
      getRandomDrink();
    }
  });

  const showDrink = (drink) => () => {
    // console.log('hola');
    setterDrink(drink);
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
                drinks.map((drink) => (
                  <button type="button" key={drink.idDrink} onClick={showDrink(drink)}>
                    <li className="searchbar--container-results--results--item">
                      <Link to={`/${drink.idDrink}`}>{drink.strDrink}</Link>
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

Home.propTypes = {
  setterDrink: PropTypes.func.isRequired,
};
