import { ReactNode, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
import './Prueba.css'

const Prueba = ({ titulo, componenteResultado, path } : { titulo: string, componenteResultado: ReactNode, path: string }) => {

  const [pregunta, setPregunta] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="Prueba">
      <div className="Prueba__contenedor_formulario">
        <h2 className="Prueba__subtitulo">¿Cómo responderías la siguiente pregunta?</h2>
        <h1 className="Prueba__titulo">{titulo}</h1>
        <textarea
          className="Prueba__textarea"
          onChange={e => setPregunta(e.target.value)}
          ref={inputRef}
        />
        <Link
          className="Prueba__boton_procesar"
          to={`/prueba/${path}/${pregunta}`}
          onClick={() => inputRef.current?.focus()}
        >
          <Icon icon="mdi:robot" />
          Procesar
        </Link>
        {/* <button>Ejemplo</button> */}
      </div>
      <div className="Prueba__contenedor_resultado">
        {componenteResultado}
      </div>
      <Link
        className="Prueba__link_reinicio"
        to="/"
      >
        <Icon icon="mdi:arrow-left" /> Volver
      </Link>
    </div>
  )
}

export default Prueba