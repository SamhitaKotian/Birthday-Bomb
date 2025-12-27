import RibbonAnimation from './RibbonAnimation'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <RibbonAnimation />
      <div className="mt-8 text-center">
        <h1 
          className="text-2xl font-heading text-primary mb-4 overflow-hidden whitespace-nowrap"
          style={{
            width: '0',
            animation: 'typewriter 2s steps(40) forwards',
            borderRight: '2px solid var(--primary)',
          }}
        >
          Unwrapping your birthday surprises...
        </h1>
      </div>
    </div>
  )
}

