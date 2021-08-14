const randomDrink = ({drink, isLoading}) => {
  return(
    <div className="drink-card">
      <div className="drink-card--title-container">
        <p className="drink-card--title-container--title">{drink.name}</p>
      </div>
      {
        isLoading ? 
        <span className="loader"></span>
        : <img className="drink-card--img" src={drink.img} loading="lazy" />
      }
    </div>
  )
}

export default randomDrink