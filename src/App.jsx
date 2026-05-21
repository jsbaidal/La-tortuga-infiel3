// App — componente raíz
// Orquesta el layout principal: Navbar + página actual + Footer
// Cuando agregues routing (React Router), lo harás aquí

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <HomePage />
      </div>
      <Footer />
    </div>
  )
}

export default App
