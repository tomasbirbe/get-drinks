const DrinksCarrousel = ({drinks}) => {
  return(
    <ul className="drinks">
        {
          drinks.map((drink,index) => 
              <li key={index} className="drinks--drink-card">
                <div className="drinks--drink-card--title-container">
                  <p className="drinks--drink-card--title-container--title">{drink.name}</p>
                </div>
                <img className="drinks--drink-card--img" src={drink.img} />
              </li>
            )
        }
      </ul>
  )
}

export default DrinksCarrousel