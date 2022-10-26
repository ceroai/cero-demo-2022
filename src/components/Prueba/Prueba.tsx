import { ReactNode, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import './Prueba.css'
import classNames from 'classnames'
import OutsideClickHandler from 'react-outside-click-handler'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import _ from 'lodash'

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

const ejemplosConfirmacion = [
  'Confirmo mi hora',
  'Confirmo mi cita',
  'Anulo mi hora',
  'Cuanto cuesta la consulta',
  'Si',
  '👍',
  'No',
  'La confirmo',
  'La cancelo avísele al doctor',
  'Yo no he sacado hora',
  'Este no es mi numero',
  'Te digo más tarde',
  'Esperame tantito',
  'Claro', 
  'voy en el metro, te aviso al rato',
  'ahorita te confirmo',
]

const ejemplosDiaReagendamiento = [
  'Cualquier día',
  'Cualquier día',
  'Todos los días',
  'Mañana',
  'La proxima semana',
  'El lunes',
  'El martes',
  'El miércoles',
  'El jueves',
  'El viernes',
  'El sábado de la próxima semana',
  'El lunes de la próxima semana',
  'El martes de la próxima semana',
  'El miércoles de la próxima semana',
  'El jueves de la próxima semana',
  'El viernes de la próxima semana',
  'El sábado de la próxima semana',
]

const ejemplosHoraReagendamiento = [
  'en la tarde',
  'en la mañana',
  'después de las 11',
  'después de las 12',
  'después de la 1',
  'después de las 2',
  'después de las 3',
  'después de las 4',
  'después de las 5',
  'antes de las 9',
  'antes de las 10',
  'antes de las 11',
  'antes de las 12',
  'antes de la 1',
  'antes de la 1',
  'antes de las 2',
  'antes de las 3',
  'a las 10:00',
  'a las 11:00',
  'a las 12:00',
  'a las 13:00',
  'a las 14:00',
  'a las 15:00',
  'a las 16:00',
  'a las 17:00',
  'a las 18:00',
  'a las 19:00',
]

const obtenerEjemplo = (path: string) => {
  if (path === 'confirmacion') {
    return _.sample(ejemplosConfirmacion) || ''
  }
  else {
    return (_.sample(ejemplosDiaReagendamiento) + ' ' +_.sample(ejemplosHoraReagendamiento)) || ''
  }
}

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
    navigate(`/prueba/${path}/${encodeURIComponent(pregunta)}`)
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
          <button
            className="Prueba__boton_ejemplo"
            onClick={() => {
              setPregunta(obtenerEjemplo(path))
              inputRef.current?.focus()
            }}
          >
            Usar un ejemplo
          </button>
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
      <Link
        className="Prueba__link_reinicio Prueba__link_reinicio--movil"
        to="/"
      >
        <Icon icon="mdi:arrow-left" />
      </Link>
    </div>
  )
}

export default Prueba