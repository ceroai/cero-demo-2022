import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './Prueba.css'
import TextareaMasBkn from './TextareaMasBkn'

const Prueba = ({ titulo, componenteResultado } : { titulo: String, componenteResultado: ReactNode }) => {
  return (
    <div className="Prueba">
      <div>
        <p>¿Cómo responderías a la siguiente pregunta?</p>
        <p>{titulo}</p>
        <button>Ejemplo</button>
        <TextareaMasBkn />
        <button>Procesar</button>
      </div>
      <div>
        {componenteResultado}
      </div>
      <Link to="/">Reiniciar</Link>
    </div>
  )
}

export default Prueba