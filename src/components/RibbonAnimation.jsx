export default function RibbonAnimation() {
  return (
    <div className="relative w-32 h-32">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl animate-ribbon-curl"
        style={{
          animation: 'ribbonCurl 0.8s ease-out forwards',
        }}
      >
        🎁
      </div>
      <div 
        className="absolute -top-2 -right-2 w-16 h-16 bg-primary rotate-45 opacity-80"
        style={{
          animation: 'ribbonCurl 0.8s ease-out 0.2s forwards',
          transform: 'rotate(-180deg) scale(0)',
        }}
      />
    </div>
  )
}

