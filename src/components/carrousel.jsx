const DrinksCarrousel = (drinks) => {
  return(
    <ul>
        {
          drinks.map(drink => {
            return(
              <li key={idDrink}>
                <p>{drink.name}</p>
                <img src={drink.img} />
              </li>
            )})
        }
      </ul>
  )
}

export default DrinksCarrousel