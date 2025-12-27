import { useState } from 'react'

const cocktails = [
  {
    name: 'Wasabi Margarita',
    ingredients: ['Tequila', 'Lime', 'Wasabi', 'Agave'],
    emoji: '🌶️',
  },
  {
    name: 'Lychee Chilli',
    ingredients: ['Vodka', 'Lychee', 'Chilli', 'Lime'],
    emoji: '🌶️',
  },
  {
    name: 'Tropical Sunset',
    ingredients: ['Rum', 'Pineapple', 'Coconut', 'Grenadine'],
    emoji: '🌴',
  },
]

export default function CocktailPicker() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading text-primary mb-4">Cocktail Picker 🍹</h2>
      
      <div className="space-y-4">
        {cocktails.map((cocktail, index) => (
          <div
            key={cocktail.name}
            className="bg-white rounded-card p-4 cursor-pointer hover:scale-105 transition-all duration-300 ease-out shadow-hover"
            onClick={() => setSelected(selected === index ? null : index)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{cocktail.emoji}</div>
                <div>
                  <h3 className="font-heading text-lg">{cocktail.name}</h3>
                </div>
              </div>
              <div className="text-2xl">{selected === index ? '▼' : '▶'}</div>
            </div>
            
            {selected === index && (
              <div className="mt-4 space-y-2">
                {cocktail.ingredients.map((ingredient, i) => (
                  <div
                    key={ingredient}
                    className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-card p-2 text-sm font-body"
                    style={{
                      animation: `fadeInStagger 0.3s ease-out ${i * 0.1}s both`,
                    }}
                  >
                    {ingredient}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

