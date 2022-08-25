import { Route, Routes } from 'react-router-dom'
import Bienvenida from './Bienvenida'
import Prueba from './Prueba'
import Confirmacion from './Prueba/Confirmacion'
import Reagendamiento from './Prueba/Reagendamiento'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Bienvenida />} />
        <Route path="prueba">
          <Route
            path="confirmacion"
            element={
              <Prueba
                titulo="¿Confirmas tu cita de mañana a las 5:00PM?"
                componenteResultado={<Confirmacion />}
              />
            }
          />
          <Route
            path="reagendamiento"
            element={
              <Prueba
                titulo="¿Para cuándo quieres reagendar tu cita de mañana?"
                componenteResultado={<Reagendamiento />}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
