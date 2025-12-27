import RibbonAnimation from './RibbonAnimation'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 px-4 py-6">
      <RibbonAnimation />
      <div className="mt-8 text-center w-full max-w-[90vw] md:max-w-4xl mx-auto px-4 md:px-8">
        <h1 
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading text-primary mb-4 inline-block typewriter-text"
          style={{
            width: '0',
            animation: 'typewriter 2s steps(40) forwards',
            borderRight: '2px solid var(--primary)',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: '100%',
          }}
        >
          Unwrapping your birthday surprises...
        </h1>
      </div>
    </div>
  )
}

