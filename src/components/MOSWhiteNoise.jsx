import { useState } from 'react'

const episodes = [
  { number: 47, title: 'This Friday got us crying' },
  { number: 3, title: 'Hot girls hate working' },
  { number: 51, title: 'Why are we all failing as adults?' },
  { number: 81, title: 'Pros and Cons of Marriage' },
  { number: 73, title: 'How to be a girl\'s girl' },
  { number: 44, title: 'Is our underwear hookup friendly' },
  { number: 22, title: 'We can\'t make everyone happy' },
  { number: 12, title: 'Delhi vs Mumbai' },
  { number: 48, title: '90\'s kids grew up with the worst TV shows' },
  { number: 108, title: 'A MOS for things that broke us' },
]

export default function MOSWhiteNoise() {
  const [flippedCards, setFlippedCards] = useState(new Set())

  const handleCardClick = (episodeNumber) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(episodeNumber)) {
        newSet.delete(episodeNumber)
      } else {
        newSet.add(episodeNumber)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading text-primary mb-6">MOS White Noise</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {episodes.map((episode) => {
          const isFlipped = flippedCards.has(episode.number)
          return (
            <div
              key={episode.number}
              className="flip-card-container"
              onClick={() => handleCardClick(episode.number)}
            >
              <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
                <div className="flip-card-front">
                  <div className="p-6 h-full flex flex-col items-center justify-center bg-white rounded-card shadow-hover">
                    <div className="text-2xl font-heading text-primary">
                      Ep {episode.number}
                    </div>
                  </div>
                </div>
                <div className="flip-card-back">
                  <div className="p-6 h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-card shadow-hover">
                    <div className="text-sm font-heading text-neutral text-center leading-tight">
                      {episode.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

