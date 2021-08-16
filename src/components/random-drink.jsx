const randomDrink = ({drink, isLoading}) => {
  return(
    <div className="drink-card">
      {
        isLoading ?
        <span className="loader"></span>
        : <div className="drink-card-content">
            <div className="drink-card--drink-card-content--title-container">
              <p className="drink-card--drink-card-content--title-container--title">{drink.name}</p>
            </div>
            <img className="drink-card--drink-card-content--drink-img" src={drink.img} loading="lazy" />
        </div>
      }
    </div>
  )
}

export default randomDrink