import RibbonAnimation from './RibbonAnimation'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 p-4 sm:p-6">
      <RibbonAnimation />
      <div className="mt-8 w-full px-4">
        {/* Mobile version - simple fade-in, no typewriter to avoid overflow */}
        <h1 
          className="md:hidden text-sm font-heading text-primary mb-4 text-center"
          style={{
            animation: 'fadeInStagger 1s ease-out forwards',
            opacity: 0,
          }}
        >
          Unwrapping surprises...
        </h1>
        
        {/* Desktop version - full text with typewriter */}
        <div className="hidden md:block text-center overflow-hidden">
          <h1 
            className="text-lg lg:text-xl xl:text-2xl font-heading text-primary mb-4 inline-block typewriter-text"
            style={{
              width: '0',
              animation: 'typewriter 2s steps(40) forwards',
              borderRight: '2px solid var(--primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            Unwrapping your birthday surprises...
          </h1>
        </div>
      </div>
    </div>
  )
}

