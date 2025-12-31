import { useState } from 'react'

const treats = [
  { id: 1, message: 'Take a spa day, unwind and play' },
  { id: 2, message: 'Get your claws polished quirky, feel fierce and smirky' },
  { id: 3, message: 'Sip a quirky brew, caffeine voodoo' },
  { id: 4, message: 'Score a quirky new fit, strut like you own it' },
  { id: 5, message: 'Grab solo sushi bliss, chopstick kiss' },
  { id: 6, message: 'Empty that cart with a click, treat yo\' self quick' },
  { id: 7, message: 'Scoop that dessert delight, sugar rush all night' },
  { id: 8, message: 'Ditch the gym grind, peace of mind you\'ll find' },
  { id: 9, message: 'Take a day off track, chillax and relax' },
  { id: 10, message: 'Book that next trip\'s jaunt, let wanderlust haunt' },
]

export default function TreatYoself() {
  const [flipped, setFlipped] = useState({})

  const handleFlip = (treatId) => {
    setFlipped(prev => ({
      ...prev,
      [treatId]: !prev[treatId]
    }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading text-primary mb-4">Treat Yourself 🛍️</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {treats.map((treat) => (
          <div
            key={treat.id}
            className="relative h-56 cursor-pointer"
            onClick={() => handleFlip(treat.id)}
            style={{
              perspective: '1000px',
            }}
          >
            <div
              className="absolute inset-0 bg-white rounded-card p-4 shadow-hover transition-transform duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: flipped[treat.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden p-4">
                <div className="text-4xl mb-2">🛍️</div>
                <div className="font-heading text-lg text-center mb-2">Pick Me</div>
                <div className="text-xs text-neutral/40 mt-3">Tap to flip</div>
              </div>
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center backface-hidden p-4"
                style={{
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="text-3xl mb-2">✨</div>
                <div className="font-heading text-sm text-center text-neutral/80 leading-relaxed px-2">
                  {treat.message}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

