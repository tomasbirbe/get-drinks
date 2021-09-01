import React from 'react';
import PropTypes from 'prop-types';

function Drink({ drink }) {
  return (
    <div className="container">
      <header className="drink-photo">
        <img src="" alt={`${drink.idDrink}`} />
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

Drink.propTypes = {
  drink: PropTypes.shape({
    idDrink: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};
export default Drink;
