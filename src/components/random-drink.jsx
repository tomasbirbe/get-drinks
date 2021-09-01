import React from 'react';
import PropTypes from 'prop-types';

const RandomDrink = ({ drink, isLoading }) => (
  <div className="drink-card">
    {
        isLoading
          ? <span className="loader" />
          : (
            <div className="drink-card-content">
              <div className="drink-card--drink-card-content--title-container">
                <p className="drink-card--drink-card-content--title-container--title">{drink.strDrink}</p>
              </div>
              <img alt={drink.strDrink} className="drink-card--drink-card-content--drink-img" src={drink.strDrinkThumb} loading="lazy" />
            </div>
          )
      }
  </div>
);

RandomDrink.propTypes = {
  drink: PropTypes.shape({
    idDrink: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default RandomDrink;
