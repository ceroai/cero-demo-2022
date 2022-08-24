import { Route, Routes } from 'react-router-dom'
import './App.css'
import Bienvenida from './Bienvenida'
import Confirmacion from './Confirmacion'
import Reagendamiento from './Reagendamiento'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Bienvenida />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/reagendamiento" element={<Reagendamiento />} />
      </Routes>
    </div>
  )
}

export default App
