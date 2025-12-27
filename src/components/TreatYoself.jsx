import { useState } from 'react'

const treats = [
  { id: 1, name: 'Fancy Dinner', emoji: '🍽️', price: '$$$' },
  { id: 2, name: 'Spa Day', emoji: '💆', price: '$$' },
  { id: 3, name: 'New Outfit', emoji: '👗', price: '$$' },
  { id: 4, name: 'Concert Tickets', emoji: '🎫', price: '$$$' },
]

export default function TreatYoself() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  const addToCart = (treat) => {
    setCart([...cart, treat])
    setShowCart(true)
    if (navigator.vibrate) navigator.vibrate(50)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading text-primary mb-4">Treat Yourself 🛍️</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {treats.map((treat) => (
          <div
            key={treat.id}
            className="bg-white rounded-card p-4 hover:scale-105 transition-all duration-300 ease-out shadow-hover"
          >
            <div className="text-4xl mb-2 text-center">{treat.emoji}</div>
            <h3 className="font-heading text-center mb-1">{treat.name}</h3>
            <p className="text-sm text-neutral/60 text-center mb-3">{treat.price}</p>
            <button
              onClick={() => addToCart(treat)}
              className="w-full px-4 py-2 bg-primary text-white rounded-card text-sm font-heading hover:scale-105 transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {showCart && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-white rounded-t-card p-6 shadow-glow transform transition-all duration-300 ease-out"
          style={{
            animation: 'slideIn 0.3s ease-out',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg">Cart ({cart.length})</h3>
            <button
              onClick={() => setShowCart(false)}
              className="text-neutral hover:text-primary"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {cart.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex items-center justify-between bg-background rounded-card p-2"
                style={{
                  animation: `slideIn 0.3s ease-out ${index * 0.1}s both`,
                }}
              >
                <span className="text-2xl mr-2">{item.emoji}</span>
                <span className="flex-1 font-body">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

