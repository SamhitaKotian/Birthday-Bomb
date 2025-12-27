import { useState } from 'react'

const quotes = [
  "Adulting = googling how long to boil eggs",
  "You're doing better than you think",
  "Progress, not perfection",
  "Today is a good day to have a good day",
  "You've survived 100% of your bad days",
]

export default function MotivateActivate() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const handleNextQuote = () => {
    setIsTyping(true)
    setTimeout(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
      setIsTyping(false)
    }, 500)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading text-primary mb-4">Motivate & Activate 💪</h2>
      
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-card p-8 min-h-[200px] flex items-center justify-center backdrop-blur">
        <div className="text-center">
          <div
            className="text-xl font-body text-neutral mb-4"
            style={{
              animation: isTyping ? 'none' : 'typewriter 2s steps(40) forwards',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              borderRight: isTyping ? 'none' : '2px solid var(--primary)',
            }}
          >
            {quotes[currentQuote]}
          </div>
          <div
            className="text-4xl"
            style={{
              animation: 'bounce 1s ease-in-out infinite',
            }}
          >
            ✨
          </div>
        </div>
      </div>

      <button
        onClick={handleNextQuote}
        className="w-full px-6 py-4 bg-primary text-white rounded-card font-heading hover:scale-105 transition-all duration-300 ease-out shadow-hover hover:shadow-glow"
      >
        Next Quote
      </button>
    </div>
  )
}

