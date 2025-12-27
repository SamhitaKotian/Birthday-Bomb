import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import QRGenerator from './components/QRGenerator'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/qr" element={<QRGenerator />} />
      {/* Fallback for any other route */}
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default App

