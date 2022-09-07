import { Route, Routes } from 'react-router-dom'
import Bienvenida from './components/Bienvenida'
import Prueba from './components/Prueba'
import Confirmacion from './components/Prueba/Confirmacion'
import Reagendamiento from './components/Prueba/Reagendamiento'
import './App.css'
import React from 'react'
import Div100vh from 'react-div-100vh'

const pruebas = [
  {
    path: "confirmacion",
    titulo: "¿Confirmas tu cita para mañana a las 5:00 PM?",
    componenteResultado: <Confirmacion />
  },
  {
    path: "reagendamiento",
    titulo: "¿Para cuándo quieres reagendar tu cita?",
    componenteResultado: <Reagendamiento />
  }
]

const App = () => {

  return (
    <Div100vh>
      <div className="App">
        <Routes>
          <Route index element={<Bienvenida />} />
          <Route path="prueba">
            {pruebas.map(prueba => (
              <React.Fragment key={`route-prueba-${prueba.path}`}>
                <Route
                  path={`${prueba.path}/:consulta`}
                  element={
                    <Prueba
                      titulo={prueba.titulo}
                      componenteResultado={prueba.componenteResultado}
                      path={prueba.path}
                    />
                  }
                />
                <Route
                  path={prueba.path}
                  element={
                    <Prueba
                      titulo={prueba.titulo}
                      componenteResultado={prueba.componenteResultado}
                      path={prueba.path}
                    />
                  }
                />
              </React.Fragment>
            ))}
          </Route>
        </Routes>
      </div>

    </Div100vh>
  )
}

export default App
