import { Route, Routes } from 'react-router-dom'
import Bienvenida from './components/Bienvenida'
import Prueba from './components/Prueba'
import Confirmacion from './components/Prueba/Confirmacion'
import Reagendamiento from './components/Prueba/Reagendamiento'
import './App.css'

const pruebas = [
  {
    path: "confirmacion",
    titulo: "¿Confirmas tu cita de mañana a las 5:00PM?",
    componenteResultado: <Confirmacion />
  },
  {
    path: "reagendamiento",
    titulo: "¿Para cuándo quieres reagendar tu cita de mañana?",
    componenteResultado: <Reagendamiento />
  }
]

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Bienvenida />} />
        <Route path="prueba">
          {pruebas.map(prueba => (
            <Route
              key={`route-prueba-${prueba.path}`}
              path={prueba.path}
              element={
                <Prueba
                  titulo={prueba.titulo}
                  componenteResultado={prueba.componenteResultado}
                />
              }
            />
          ))}
        </Route>
      </Routes>
    </div>
  )
}

export default App
