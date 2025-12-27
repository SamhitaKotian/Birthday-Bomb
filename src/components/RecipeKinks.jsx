import { useState } from 'react'

const recipes = [
  {
    name: 'Chocolate Lava Cake',
    mainIngredient: 'Dark Chocolate',
    ingredients: ['200g dark chocolate', '100g butter', '3 eggs', '50g sugar', '30g flour'],
    emoji: '🍫',
  },
  {
    name: 'Avocado Toast Deluxe',
    mainIngredient: 'Avocado',
    ingredients: ['2 avocados', 'Sourdough bread', 'Cherry tomatoes', 'Feta cheese', 'Lemon'],
    emoji: '🥑',
  },
  {
    name: 'Matcha Latte',
    mainIngredient: 'Matcha Powder',
    ingredients: ['2 tsp matcha', '200ml milk', 'Honey', 'Ice'],
    emoji: '🍵',
  },
]

export default function RecipeKinks() {
  const [selected, setSelected] = useState(null)
  const [ingredientOpen, setIngredientOpen] = useState({})

  const handleIngredientClick = (recipeName) => {
    setIngredientOpen(prev => ({
      ...prev,
      [recipeName]: !prev[recipeName]
    }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading text-primary mb-4">Recipe Kinks 👨‍🍳</h2>
      
      <div className="space-y-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.name}
            className="bg-white rounded-card p-4 hover:scale-105 transition-all duration-300 ease-out shadow-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{recipe.emoji}</div>
                <div>
                  <h3 className="font-heading text-lg">{recipe.name}</h3>
                </div>
              </div>
            </div>
            
            <div
              className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-card p-4 cursor-pointer mb-2"
              onClick={() => handleIngredientClick(recipe.name)}
              style={{
                animation: ingredientOpen[recipe.name] ? 'popOpen 0.5s ease-out' : 'none',
                transform: ingredientOpen[recipe.name] ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">⭐</div>
                <div className="font-heading">{recipe.mainIngredient}</div>
                <div className="text-xs text-neutral/60 mt-1">Tap to see all ingredients</div>
              </div>
            </div>

            {ingredientOpen[recipe.name] && (
              <div className="mt-4 space-y-2">
                {recipe.ingredients.map((ingredient, i) => (
                  <div
                    key={ingredient}
                    className="bg-background rounded-card p-2 text-sm font-body"
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

