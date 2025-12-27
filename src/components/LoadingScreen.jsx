import RibbonAnimation from './RibbonAnimation'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 p-4 sm:p-6">
      <RibbonAnimation />
      <div className="mt-8 w-full max-w-full">
        <div className="text-center overflow-hidden px-2">
          <h1 
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-heading text-primary mb-4 inline-block typewriter-text"
            style={{
              width: '0',
              animation: 'typewriter 2s steps(40) forwards',
              borderRight: '2px solid var(--primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxWidth: 'calc(100vw - 4rem)',
            }}
          >
            Unwrapping your birthday surprises...
          </h1>
        </div>
      </div>
    </div>
  )
}

