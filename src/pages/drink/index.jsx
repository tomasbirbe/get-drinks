import { useEffect } from "react";

function Drink({drink}) {
  useEffect(() => {
    console.log(drink)
  })

  return(
    <div className="container">
      <header className="drink-photo">
        <img src="" alt="drink-photo" />
      </header>
      <section className="card">
        <article className="card__stats">
          <span className="alcohol"></span>
          <span className="fruits"></span>
          <span className="water"></span>
          <span className="tacc"></span>
        </article>
        <article className="card__ingredients">
          <span className="ingredient-title">INGREDIENTS</span>
          <ul className="ingredients-list">
            <li className="ingredient-list__item"></li>
          </ul>
          <span className="line"></span>
        </article>
        <article className="card__instructions">
          <span className="instructions-title">INSTRUCTIONS</span>
          <p></p>
          <span className="line"></span>
        </article>
      </section>
    </div>
  )
}

export default Drink;