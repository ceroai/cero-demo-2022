import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './Prueba.css'

const Prueba = ({ titulo, componenteResultado } : { titulo: String, componenteResultado: ReactNode }) => {
  return (
    <div className="Prueba">
      <div className="Prueba__contenedor_formulario">
        <p>¿Cómo responderías la siguiente pregunta?</p>
        <p>{titulo}</p>
        <textarea />
        <button>Procesar</button>
        {/* <button>Ejemplo</button> */}
      </div>
      <div className="Prueba__contenedor_resultado">
        {componenteResultado}
      </div>
      <Link
        className="Prueba__link_reinicio"
        to="/"
      >
        Reiniciar
      </Link>
    </div>
  )
}

export default Prueba