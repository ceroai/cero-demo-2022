import { ReactNode, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import './Prueba.css'
import classNames from 'classnames'
import OutsideClickHandler from 'react-outside-click-handler'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

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
  const {
    transcript,
    listening,
    resetTranscript
  } = useSpeechRecognition();
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    setPregunta(transcript)
    inputRef.current?.focus()
  }, [transcript])

  useEffect(() => {
    navigate(`/prueba/${path}/${pregunta.replace('/', '%2F')}`)
  }, [navigate, path, pregunta])

  return (
    <div className="Prueba">
      <div className="Prueba__contenedor_formulario">
        <h1 className="Prueba__titulo">{titulo}</h1>
        <div className="Prueba__contenedor_textarea">
          <textarea
            className="Prueba__textarea"
            onChange={e => setPregunta(e.target.value)}
            value={pregunta}
            ref={inputRef}
            // disabled={listening || transcript !== ''}
            placeholder={listening ? "Habla" : "Escribe tu respuesta"}
          />
          {false && transcript && !listening && (
            <div className="Prueba__audio">
              <button className="Prueba__audio_boton_play">
                <Icon icon="mdi:play" />
              </button>
              <div className="Prueba__audio_track">
                <div className="Prueba__audio_thumb" />
              </div>
              <div className="Prueba__audio_duracion">1:02</div>
              <button
                className="Prueba__audio_boton_borrar"
                onClick={() => {
                  inputRef.current?.focus()
                  setPregunta('')
                  resetTranscript()
                }}
              >
                <Icon icon="mdi:close" />
              </button>
            </div>
          )}
          <div className="Prueba__contenedor_botones_input">
            <button
              className="Prueba__boton_input"
              onClick={() => setModalEmojisVisible(!modalEmojisVisible)}
            >
              <Icon icon="mdi:emoticon" />
            </button>
            <button
              className={classNames({
                "Prueba__boton_input": true,
                "Prueba__boton_input--microfono-abierto": listening
              })}
              onClick={() => {
                if (listening) {
                  SpeechRecognition.stopListening()
                  setPregunta(transcript)
                }
                else {
                  resetTranscript()
                  setPregunta('')
                  SpeechRecognition.startListening()
                }
              }}
            >
              <Icon icon="mdi:microphone" />
            </button>
          </div>
          <OutsideClickHandler onOutsideClick={() => setModalEmojisVisible(false)}>
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
          </OutsideClickHandler>
        </div>
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