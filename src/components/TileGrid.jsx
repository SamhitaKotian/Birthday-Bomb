export default function TileGrid({ tiles, onTileClick }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {tiles.map((tile, index) => (
          <div
            key={tile.id}
            className="tile bg-white rounded-tile p-6 cursor-pointer hover:scale-105 transition-all duration-300 ease-out shadow-hover hover:shadow-glow"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'forwards',
            }}
            onClick={() => onTileClick(tile.id)}
          >
            <div className="text-4xl mb-2 text-center">{tile.icon}</div>
            <div className="text-sm font-heading text-neutral text-center">{tile.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

