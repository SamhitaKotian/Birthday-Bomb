import { useState } from 'react'

const puzzlePieces = [
  { id: 1, emoji: '🎉', position: 0 },
  { id: 2, emoji: '🎈', position: 1 },
  { id: 3, emoji: '🎂', position: 2 },
  { id: 4, emoji: '🎁', position: 3 },
  { id: 5, emoji: '🎊', position: 4 },
  { id: 6, emoji: '🎀', position: 5 },
]

export default function Masti2min() {
  const [pieces, setPieces] = useState([...puzzlePieces].sort(() => Math.random() - 0.5))
  const [selected, setSelected] = useState(null)
  const [solved, setSolved] = useState(false)

  const handlePieceClick = (index) => {
    if (solved) return

    if (selected === null) {
      setSelected(index)
    } else if (selected === index) {
      setSelected(null)
    } else {
      // Swap pieces
      const newPieces = [...pieces]
      ;[newPieces[selected], newPieces[index]] = [newPieces[index], newPieces[selected]]
      setPieces(newPieces)
      setSelected(null)

      // Check if solved
      const isSolved = newPieces.every((p, i) => p.position === i)
      if (isSolved) {
        setSolved(true)
        if (navigator.vibrate) navigator.vibrate([100, 50, 100])
      }
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading text-primary mb-4">2 Min Masti 🧩</h2>
      <p className="text-neutral/60 mb-6">Drag to rearrange the pieces!</p>

      {solved && (
        <div className="bg-success/20 text-success rounded-card p-4 mb-4 text-center animate-pulse-glow">
          🎉 Puzzle Solved! 🎉
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {pieces.map((piece, index) => (
          <div
            key={piece.id}
            onClick={() => handlePieceClick(index)}
            className={`aspect-square bg-white rounded-card flex items-center justify-center text-5xl cursor-pointer hover:scale-105 transition-all duration-300 ease-out shadow-hover ${
              selected === index ? 'ring-4 ring-primary scale-110' : ''
            }`}
            style={{
              transform: selected === index ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
            }}
          >
            {piece.emoji}
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-neutral/60">
        Click two pieces to swap them
      </div>
    </div>
  )
}

