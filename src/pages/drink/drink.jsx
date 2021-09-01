import '../../styles/drink.css';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import { useParams } from 'react-router-dom';

function Drink() {
  const [drink, setDrink] = useState({});
  const { idDrink } = useParams();

  useEffect(() => {
    if (drink.idDrink === undefined) {
      Axios({
        method: 'get',
        url: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`,
      })
        .then(({ data }) => {
          setDrink(data.drinks[0]);
        });
    }
  });

  return (
    <div className="container">
      <header className="banner">
        <img src={drink.strDrinkThumb} className="banner__photo" alt={drink.strDrinkThumb} />
      </header>
      <section className="card">
        <article className="card__stats">
          <span className="alcohol" />
          <span className="fruits" />
          <span className="water" />
          <span className="tacc" />
        </article>
        <article className="card__ingredients">
          <span className="ingredient-title">INGREDIENTS</span>
          <ul className="ingredients-list">
            <li className="ingredient-list__item" />
          </ul>
          <span className="line" />
        </article>
        <article className="card__instructions">
          <span className="instructions-title">INSTRUCTIONS</span>
          <p />
          <span className="line" />
        </article>
      </section>
    </div>
  );
}

export default Drink;
