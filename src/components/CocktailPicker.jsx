const cocktails = [
  {
    flavor: 'Fruity',
    ingredient: 'Plum',
    spirit: 'Mezcal',
  },
  {
    flavor: 'Smoky',
    ingredient: 'Grilled shishito peppers',
    spirit: 'Mezcal',
  },
  {
    flavor: 'Herbal',
    ingredient: 'Pickle brine',
    spirit: 'Vodka',
  },
  {
    flavor: 'Funky',
    ingredient: 'Kimchi brine',
    spirit: 'Vodka',
  },
  {
    flavor: 'Briny',
    ingredient: 'Oyster Liquor',
    spirit: 'Gin',
  },
  {
    flavor: 'Umami',
    ingredient: 'Fish sauce',
    spirit: 'vodka',
  },
  {
    flavor: 'Spicy',
    ingredient: 'Horseradish cream',
    spirit: 'Tequila',
  },
  {
    flavor: 'Sour',
    ingredient: 'Bacon fat',
    spirit: 'Rye',
  },
  {
    flavor: 'Sweet',
    ingredient: 'Glazed donut syrup',
    spirit: 'Bourbon',
  },
  {
    flavor: 'Toasted',
    ingredient: 'Torched meringue',
    spirit: 'Mezcal',
  },
]

export default function CocktailPicker() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading text-primary mb-4">Cocktail Picker 🍹</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cocktails.map((cocktail, index) => (
          <div
            key={index}
            className="bg-white rounded-card p-4 hover:scale-105 transition-all duration-300 ease-out shadow-hover"
          >
            <div className="font-heading text-xl mb-3">{cocktail.flavor}</div>
            <ul className="space-y-2">
              <li className="text-sm text-neutral/70">• {cocktail.ingredient}</li>
              <li className="text-sm text-neutral/70">• {cocktail.spirit}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

