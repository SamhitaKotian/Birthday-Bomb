import { useState, useEffect } from 'react'

export default function StressReliever() {
  const [isBreathing, setIsBreathing] = useState(false)
  const [phase, setPhase] = useState('inhale') // inhale, hold, exhale
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isBreathing) return

    const cycle = () => {
      setPhase('inhale')
      setTimeout(() => setPhase('hold'), 4000)
      setTimeout(() => setPhase('exhale'), 6000)
      setTimeout(() => {
        setPhase('inhale')
        setCount(c => c + 1)
        if (isBreathing) cycle()
      }, 10000)
    }

    cycle()
  }, [isBreathing])

  const getInstruction = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In...'
      case 'hold': return 'Hold...'
      case 'exhale': return 'Breathe Out...'
      default: return 'Ready?'
    }
  }

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-3xl font-heading text-primary mb-4">Breathe 🌬️</h2>
      
      <div className="relative w-64 h-64 mx-auto">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border-4 border-secondary/30"
            style={{
              animation: isBreathing && phase === 'inhale' 
                ? 'breathe 4s ease-in-out infinite' 
                : isBreathing && phase === 'exhale'
                ? 'breathe 4s ease-in-out infinite reverse'
                : 'none',
              animationDelay: `${i * 0.5}s`,
              transform: `scale(${1 + i * 0.3})`,
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl font-heading text-primary">{getInstruction()}</div>
        </div>
      </div>

      <div className="text-2xl font-heading text-secondary mb-4">Round {count}</div>

      <button
        onClick={() => {
          setIsBreathing(!isBreathing)
          if (!isBreathing) setCount(0)
        }}
        className="px-8 py-4 bg-primary text-white rounded-card font-heading hover:scale-105 transition-all duration-300 ease-out shadow-hover hover:shadow-glow"
      >
        {isBreathing ? 'Pause' : 'Start'}
      </button>
    </div>
  )
}

