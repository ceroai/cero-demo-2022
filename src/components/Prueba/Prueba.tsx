import { ReactNode, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
import './Prueba.css'
import classNames from 'classnames';

const emojis = [
  {
    emoji: '👌',
    alt: 'mano con signo de aprobación'
  },
  {
    emoji: '👍',
    alt: 'mano con pulgar hacia arriba'
  },
  {
    emoji: '👎',
    alt: 'mano con pulgar hacia abajo'
  },
  {
    emoji: '✌',
    alt: 'mano con signo de victoria'
  },
  {
    emoji: '😄',
    alt: 'sonrisa'
  },
  {
    emoji: '😊',
    alt: 'sonrisa con sonrojo'
  },
  {
    emoji: '🤔',
    alt: 'cara pensativa'
  },
  {
    emoji: '😠',
    alt: 'enojo'
  },
  {
    emoji: '😡',
    alt: 'rabia'
  },
  {
    emoji: '❤',
    alt: 'corazón'
  },
  {
    emoji: '✅',
    alt: 'aprobación'
  }
]

const Prueba = ({ titulo, componenteResultado, path } : { titulo: string, componenteResultado: ReactNode, path: string }) => {

  const [pregunta, setPregunta] = useState('')
  const [modalEmojisVisible, setModalEmojisVisible] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="Prueba">
      <div className="Prueba__contenedor_formulario">
        <h1 className="Prueba__titulo">{titulo}</h1>
        <div className="Prueba__contenedor_textarea">
          <textarea
            className="Prueba__textarea"
            onChange={e => setPregunta(e.target.value)}
            onClick={() => setModalEmojisVisible(false)}
            value={pregunta}
            ref={inputRef}
            placeholder="Escribe tu respuesta"
          />
          <div className="Prueba__contenedor_botones_input">
            <button
              className="Prueba__boton_input"
              onClick={() => setModalEmojisVisible(!modalEmojisVisible)}
            >
              <Icon icon="mdi:emoticon" />
            </button>
            <button
              className="Prueba__boton_input"
            >
              <Icon icon="mdi:volume-high" />
            </button>
          </div>
          <div
            className={classNames({
              "Prueba__modal_emojis": true,
              "Prueba__modal_emojis--visible": modalEmojisVisible
            })}
          >
            {emojis.map((emoji, i) => (
              <button
                key={`emoji-${i}`}
                title={emoji.alt}
                className="Prueba__modal_emojis_boton"
                onClick={() => {
                  setPregunta(prev => prev + emoji.emoji)
                  inputRef.current?.focus()
                }}
              >
                {emoji.emoji}
              </button>
            ))}
          </div>
        </div>
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