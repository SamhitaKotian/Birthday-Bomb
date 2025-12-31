import { useState } from 'react'

const quotes = [
  { name: "Leslie Knope", quote: "There's nothing we can't do if we work hard, never sleep, and shirk all other responsibilities in our lives." },
  { name: "Ron Swanson", quote: "Never half-ass two things. Whole-ass one thing." },
  { name: "April Ludgate", quote: "Time is money, money is power, power is pizza, pizza is knowledge. Let's go." },
  { name: "Ron Swanson", quote: "I'd wish you the best of luck, but I believe luck is a concept created by the weak." },
  { name: "Moira Rose", quote: "Never let the bastards get you down!" },
  { name: "Moira Rose", quote: "Gossip is the devil's telephone. Best to just hang up." },
  { name: "Harper Spiller", quote: "We're too young to be this old." },
  { name: "Gloria Pritchett", quote: "Sometimes the best thing you can do is not think, not wonder, not imagine, not obsess. Just breathe, and have faith that everything will work out for the best." },
  { name: "Phil Dunphy", quote: "Success is one per cent inspiration, 98 percent perspiration, and two percent attention to detail." },
  { name: "Monica Geller", quote: "Welcome to the real world. It sucks. You're gonna love it." },
  { name: "Joey Tribbiani", quote: "These are just feelings. They'll go away." },
  { name: "Phoebe Buffay", quote: "Everybody looks so happy. I hate that." },
]

export default function MotivateActivate() {
  const [flippedCards, setFlippedCards] = useState(new Set())

  const handleCardClick = (index) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading text-primary mb-4">Motivate & Activate 💪</h2>
      
      <div className="space-y-4">
        {quotes.map((item, index) => (
          <div
            key={index}
            className="flip-card-container"
            onClick={() => handleCardClick(index)}
            style={{ height: '120px' }}
          >
            <div className={`flip-card ${flippedCards.has(index) ? 'flipped' : ''}`}>
              {/* Front of card - Name */}
              <div className="flip-card-front bg-gradient-to-r from-primary/20 to-secondary/20 rounded-card p-6 flex items-center justify-center backdrop-blur border-2 border-primary/30">
                <div className="text-center">
                  <h3 className="text-2xl font-heading text-neutral">{item.name}</h3>
                </div>
              </div>
              
              {/* Back of card - Quote */}
              <div className="flip-card-back bg-gradient-to-r from-secondary/20 to-primary/20 rounded-card p-6 flex items-center justify-center backdrop-blur border-2 border-secondary/30">
                <div className="text-center">
                  <p className="text-lg font-body text-neutral italic">"{item.quote}"</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

