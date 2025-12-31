import { useState } from 'react'

const areas = [
  {
    id: 'central',
    name: 'Central',
    cafes: [
      { name: 'Maxi Coffee Bar', description: 'Iced cereal milk latte, nostalgic sandwiches' },
      { name: 'Blue Bottle Coffee', description: 'Organic roast' },
      { name: 'Punch', description: 'Open air sets, simple menu' },
      { name: 'Sarnies', description: 'Aus styles coffees and brekkie' },
      { name: 'Average Servcice', description: 'Big breakfast, truffle fries' },
      { name: 'Chye Seng Huat Hardware', description: 'Gourmet coffee, pandan pancakes' },
    ]
  },
  {
    id: 'east',
    name: 'East',
    cafes: [
      { name: 'Simplicity by Fresh Fruits Lab', description: 'Rainbow desserts' },
      { name: 'Kommunal', description: 'Hearty bakes, great matcha' },
      { name: 'Hanco Coffee', description: 'Specialty pours' },
      { name: 'YARA', description: 'Vibrant drinks' },
      { name: '5:59 + Cafe and Bistro', description: 'Pistachio desserts' },
    ]
  },
  {
    id: 'west-northwest',
    name: 'West',
    cafes: [
      { name: 'Better Days Cafe and Bar', description: 'Hilltop chill spot, skyline views' },
      { name: 'Suzuki Cafe and Roastery', description: 'Japanese teahouse' },
      { name: 'Simple Cafe', description: 'Lemon tarts, pet-friendly' },
      { name: 'The Test Kitchen', description: 'Bold cheesecakes' },
      { name: 'Rumifolks', description: 'Sci-Fi decor, Iced drinks' },
      { name: 'Old Hen Coffee', description: 'Strong coffees' },
    ]
  },
  {
    id: 'north',
    name: 'North',
    cafes: [
      { name: 'Twenty Eight Cafe', description: 'Flat whites, work vibes' },
      { name: 'Nana and Friends cafe', description: 'Macro-friendly options' },
      { name: "Rumi the Poet's Cup revival", description: 'Retro charm' },
      { name: 'Keming Bing Sat', description: 'Huge hit in China' },
    ]
  },
]

export default function CafePicker() {
  const [selectedArea, setSelectedArea] = useState(null)
  const [flipped, setFlipped] = useState({})

  const handleFlip = (cafeName) => {
    setFlipped(prev => ({
      ...prev,
      [cafeName]: !prev[cafeName]
    }))
  }

  const getAreaEmoji = (areaName) => {
    switch (areaName) {
      case 'Central': return '🏙️'
      case 'East': return '🌅'
      case 'West': return '🌄'
      case 'North': return '🧭'
      default: return '☕'
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading text-primary mb-4">Cafe Picker ☕</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {areas.map((area) => (
          <button
            key={area.id}
            onClick={() => setSelectedArea(area.id)}
            className={`p-4 rounded-card bg-white hover:scale-105 transition-all duration-300 ease-out shadow-hover ${
              selectedArea === area.id ? 'ring-4 ring-primary' : ''
            }`}
          >
            <div className="text-2xl mb-2">{getAreaEmoji(area.name)}</div>
            <div className="font-heading">{area.name}</div>
          </button>
        ))}
      </div>

      {selectedArea && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {areas.find(a => a.id === selectedArea)?.cafes.map((cafe, index) => (
            <div
              key={cafe.name}
              className="relative h-56 cursor-pointer"
              onClick={() => handleFlip(cafe.name)}
              style={{
                perspective: '1000px',
              }}
            >
              <div
                className="absolute inset-0 bg-white rounded-card p-4 shadow-hover transition-transform duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flipped[cafe.name] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden p-4">
                  <div className="text-4xl mb-2">☕</div>
                  <div className="font-heading text-lg text-center mb-2">{cafe.name}</div>
                  <div className="text-xs text-neutral/40 mt-3">Tap to flip</div>
                </div>
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center backface-hidden p-4"
                  style={{
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="text-3xl mb-2">📸</div>
                  <div className="font-heading text-lg text-center mb-2">{cafe.name}</div>
                  <div className="text-sm text-neutral/60 mt-2 text-center">{cafe.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

