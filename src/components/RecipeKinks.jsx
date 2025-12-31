import { useState } from 'react'

const recipes = [
  {
    name: 'Honey garlic chicken',
    time: '12 mins',
    steps: [
      'Cube thighs',
      'stir-fry w with garlic, soy, honey 8 mins',
      'add sesame seeds'
    ],
  },
  {
    name: 'Kimchi fried rice',
    time: '10 mins',
    steps: [
      'Leftover rice + kimchi, egg, spam'
    ],
  },
  {
    name: 'Garlic shrimp zucchini boats',
    time: '15 mins',
    steps: [
      'Sauté shrimp/garlic 4 mins',
      'stuff zucchini halves',
      'bake 10 mins'
    ],
  },
  {
    name: 'Caprese quesadilla',
    time: '8 mins',
    steps: [
      'Layer mozzarella, tomato, basil in tortilla',
      'pan-fry 4 mins per side, balsamic drizzle'
    ],
  },
  {
    name: 'Miso edamame hummus bowl',
    time: '20 mins',
    steps: [
      'Blend edamame, hummus, miso',
      'microwave 2 mins',
      'eat with cucumber/pita'
    ],
  },
  {
    name: 'Chickpea smash salad',
    time: '12 mins',
    steps: [
      'Rinse chickpeas',
      'smash with olive oil, lemon, feta',
      'scoop with crackers'
    ],
  },
  {
    name: 'Yogurt bark bites',
    time: '20 mins',
    steps: [
      'Spread yogurt on plate',
      'top berries, nuts, chia',
      'freeze 20 mins (break & eat)'
    ],
  },
  {
    name: 'Sesame cold noodles',
    time: '10 mins',
    steps: [
      'Boil instant noodles 3 mins',
      'toss sesame oil, soy, vinegar, cucumber'
    ],
  },
  {
    name: 'Mapo tofu solo',
    time: '15 mins',
    steps: [
      'Silken tofu + chili bean paste/ground pork in pan 10 mins',
      'sesame sprinkle'
    ],
  },
  {
    name: 'Aloo Methi',
    time: '25 mins',
    steps: [
      'Potatoes, fenugreek, chili',
      'Dice potatoes',
      'sauté methi 3 mins',
      'add potatoes/spices simmer 8 mins'
    ],
  },
]

export default function RecipeKinks() {
  const [flipped, setFlipped] = useState({})

  const handleFlip = (recipeName) => {
    setFlipped(prev => ({
      ...prev,
      [recipeName]: !prev[recipeName]
    }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading text-primary mb-4">Recipe Inspo 👨‍🍳</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.name}
            className="relative h-56 cursor-pointer"
            onClick={() => handleFlip(recipe.name)}
            style={{
              perspective: '1000px',
            }}
          >
            <div
              className="absolute inset-0 bg-white rounded-card p-4 shadow-hover transition-transform duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: flipped[recipe.name] ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden p-4">
                <div className="text-4xl mb-2">👨‍🍳</div>
                <div className="font-heading text-lg text-center mb-2">{recipe.name}</div>
                <div className="text-sm text-neutral/60">({recipe.time})</div>
                <div className="text-xs text-neutral/40 mt-3">Tap to flip</div>
              </div>
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center backface-hidden p-4"
                style={{
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="text-3xl mb-2">📝</div>
                <div className="font-heading text-lg text-center mb-3">{recipe.name}</div>
                <div className="text-sm text-neutral/60 space-y-1 text-left w-full">
                  {recipe.steps.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

