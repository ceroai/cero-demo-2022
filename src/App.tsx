import { Route, Routes } from 'react-router-dom'
import Bienvenida from './components/Bienvenida'
import Prueba from './components/Prueba'
import Confirmacion from './components/Prueba/Confirmacion'
import Reagendamiento from './components/Prueba/Reagendamiento'
import './App.css'
import React, { useEffect, useState } from 'react'

const pruebas = [
  {
    path: "confirmacion",
    titulo: "¿Confirmas tu cita para mañana a las 5:00PM?",
    componenteResultado: <Confirmacion />
  },
  {
    path: "reagendamiento",
    titulo: "¿Para cuándo quieres reagendar tu cita?",
    componenteResultado: <Reagendamiento />
  }
]

const T_ESTABLE = 30_000
const T_FINAL = 2_000
const TICK = 20

const App = () => {

  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const avanzarTimer = setInterval(() => {
      setTimer(prev => prev + TICK)
    }, TICK)
    return () => clearInterval(avanzarTimer)
  }, [])

  useEffect(() => {
    if (timer > T_ESTABLE + T_FINAL) {
      window.location.href = '/'
    }
  }, [timer])

  return (
    <div
      className="App"
      onKeyDown={() => setTimer(0)}
      onMouseMove={() => setTimer(0)}
    >
      <p style={{ position: 'fixed' }}>{timer / 1000}</p>
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
      <div
        className="App__progreso"
        style={{
          background: `linear-gradient(90deg, white 0 ${100 * Math.max(0, (timer - T_ESTABLE) / T_FINAL)}%, transparent 0)`
        }}
      />
    </div>
  )
}

export default App
