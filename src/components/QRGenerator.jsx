import { useState, useRef, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useNavigate } from 'react-router-dom'

export default function QRGenerator() {
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const qrRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Get current app URL
    const currentUrl = window.location.origin
    setUrl(currentUrl)
  }, [])
  
  const switchToLocalIP = () => {
    const port = window.location.port || '5173'
    const localIP = '192.168.18.3' // Your local IP - update if needed
    setUrl(`http://${localIP}:${port}`)
  }
  
  const switchToLocalhost = () => {
    const port = window.location.port || '5173'
    setUrl(`http://localhost:${port}`)
  }

  const handleDownload = () => {
    if (!qrRef.current) return

    // Get the SVG element
    const svg = qrRef.current.querySelector('svg')
    if (!svg) return

    // Convert SVG to canvas, then to image
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    // Set canvas size (QR code is 300px + padding)
    canvas.width = 400
    canvas.height = 400

    img.onload = () => {
      // Fill background
      ctx.fillStyle = '#FFF8F0'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw SVG image centered
      const scale = 300 / Math.max(img.width, img.height)
      const x = (canvas.width - img.width * scale) / 2
      const y = (canvas.height - img.height * scale) / 2
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
      
      // Download
      const dataURL = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = 'birthday-qr-code.png'
      link.href = dataURL
      link.click()
    }

    img.onerror = () => {
      console.error('Failed to load SVG image')
    }

    // Create data URL from SVG
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    img.src = url
  }

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      if (navigator.vibrate) {
        navigator.vibrate(50)
      }
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handlePrint = () => {
    window.print()
  }


  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
          }
          .print-container {
            page-break-inside: avoid;
          }
        }
      `}</style>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 no-print">
          <button
            onClick={() => navigate('/')}
            className="absolute top-4 left-4 text-neutral hover:text-primary transition-colors font-heading z-50"
          >
            ← Back
          </button>
          <h1 
            className="text-4xl font-heading text-primary mb-2"
            style={{
              animation: 'fadeInStagger 0.5s ease-out',
            }}
          >
            Share Your Birthday Surprises 🎉
          </h1>
          <p className="text-neutral/60 font-body">
            Scan this QR code to access the birthday app
          </p>
          {!url && (
            <div className="mt-4 p-4 bg-yellow-100 rounded-card text-sm">
              Loading URL...
            </div>
          )}
        </div>

        {/* QR Code Container */}
        <div 
          className="bg-white rounded-card p-8 shadow-glow print-container"
          style={{
            animation: 'popOpen 0.5s ease-out',
          }}
        >
          <div className="flex flex-col items-center justify-center">
            {/* QR Code */}
            <div 
              ref={qrRef}
              className="p-6 bg-background rounded-card mb-6 flex items-center justify-center"
            >
              {url ? (
                <QRCodeSVG
                  value={url}
                  size={300}
                  level="H"
                  includeMargin={true}
                  fgColor="#2D3436"
                  bgColor="#FFF8F0"
                />
              ) : (
                <div className="w-[300px] h-[300px] flex items-center justify-center bg-background rounded-card">
                  <div className="animate-pulse text-neutral/60">Loading QR code...</div>
                </div>
              )}
            </div>

            {/* URL Display */}
            <div className="w-full mb-6">
              <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-card p-4 backdrop-blur">
                <p className="text-sm text-neutral/60 mb-2 font-body">App URL:</p>
                <p 
                  className="text-sm font-mono text-neutral break-all font-body mb-3"
                  style={{
                    animation: 'typewriter 1s steps(40) forwards',
                  }}
                >
                  {url}
                </p>
                {url.includes('localhost') && (
                  <div className="mt-3 pt-3 border-t border-primary/20">
                    <p className="text-xs text-neutral/60 mb-2">For phone access:</p>
                    <button
                      onClick={switchToLocalIP}
                      className="text-xs bg-secondary text-white px-3 py-1 rounded-card hover:scale-105 transition-all"
                    >
                      Use Local IP (192.168.18.3)
                    </button>
                  </div>
                )}
                {url.includes('192.168') && (
                  <div className="mt-3 pt-3 border-t border-primary/20">
                    <button
                      onClick={switchToLocalhost}
                      className="text-xs bg-neutral/20 text-neutral px-3 py-1 rounded-card hover:scale-105 transition-all"
                    >
                      Switch back to localhost
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full no-print">
              <button
                onClick={handleCopyUrl}
                className={`flex-1 px-6 py-4 rounded-card font-heading hover:scale-105 transition-all duration-300 ease-out shadow-hover hover:shadow-glow ${
                  copied 
                    ? 'bg-success text-white' 
                    : 'bg-primary text-white'
                }`}
                style={{
                  animation: copied ? 'pulse-glow 0.5s ease-out' : 'none',
                }}
              >
                {copied ? '✓ Copied!' : '📋 Copy URL'}
              </button>

              <button
                onClick={handleDownload}
                className="flex-1 px-6 py-4 rounded-card font-heading bg-secondary text-white hover:scale-105 transition-all duration-300 ease-out shadow-hover hover:shadow-glow"
              >
                💾 Download QR
              </button>

              <button
                onClick={handlePrint}
                className="flex-1 px-6 py-4 rounded-card font-heading bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 transition-all duration-300 ease-out shadow-hover hover:shadow-glow"
              >
                🖨️ Print
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center no-print">
          <div className="bg-white rounded-card p-6 shadow-hover">
            <h3 className="font-heading text-lg text-primary mb-3">How to use:</h3>
            <ul className="text-sm text-neutral/80 font-body space-y-2 text-left max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-secondary">1.</span>
                <span>Share the QR code or URL with your friend</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary">2.</span>
                <span>They scan the QR code with their phone camera</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary">3.</span>
                <span>The birthday app opens automatically!</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

