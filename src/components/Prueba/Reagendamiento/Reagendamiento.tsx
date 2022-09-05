import { InlineIcon } from '@iconify/react'
import classNames from 'classnames'
import { addMonths, endOfDay, endOfWeek, format, getDate, getDay, isPast, isSameDay, isToday, isWithinInterval, startOfWeek } from 'date-fns'
import { addDays, endOfMonth, startOfMonth } from 'date-fns/esm'
import { useMemo, useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { reagendamiento } from '../../../api/api'
import './Reagendamiento.css'

const horas = {
  0: [],
  1: [
    '09:00',
    '11:00',
    '13:00',
    '15:00',
    '17:00',
  ],
  2: [
    '09:00',
    '11:00',
    '13:00',
    '15:00',
    '17:00',
  ],
  3: [
    '09:00',
    '11:00',
    '13:00',
    '15:00',
    '17:00',
  ],
  4: [
    '09:00',
    '11:00',
    '13:00',
    '15:00',
    '17:00',
  ],
  5: [
    '09:00',
    '11:00',
    '13:00',
    '15:00',
    '17:00',
  ],
  6: [
    '09:00',
    '11:00',
    '13:00',
  ]
}

const feriados = [
  {
    fecha: '2022-09-19',
    motivo: 'Glorias del Ejército'
  },
  {
    fecha: '2022-10-10',
    motivo: 'Encuentro de Dos Mundos'
  },
  {
    fecha: '2022-10-31',
    motivo: 'Día de las Iglesias Evangélicas y Protestantes'
  },
  {
    fecha: '2022-11-01',
    motivo: 'Día de Todos los Santos'
  },
  {
    fecha: '2022-12-08',
    motivo: 'Inmaculada Concepción'
  },
  {
    fecha: '2022-12-24',
    motivo: 'Navidad'
  },
]

const obtenerDisponibilidad = (consulta: string | undefined, fecha: Date, hora: string) => {
  return true
}

const Reagendamiento = () => {

  const { consulta } = useParams()
  const [desfaseMes, setDesfaseMes] = useState(0)
  const { data } = useQuery(
    ['reagendamiento', consulta],
    () => reagendamiento(consulta || '')
  )
  const [horasDisponibles, setHorasDisponibles] = useState<{
    fecha: Date,
    horas: {
      hora: string,
      disponible: boolean
    }[]
  }[]>([])

  const fechas = useMemo(() => {
    const fechaBase = addMonths(Date.now(), desfaseMes)
    const fin = addDays(endOfWeek(endOfMonth(endOfWeek((fechaBase)))), 1)
    let fecha = startOfWeek(startOfMonth(endOfWeek(fechaBase)))
    const fechas = []
    while (!isSameDay(fecha, fin)) {
      fechas.push(fecha)
      fecha = addDays(fecha, 1)
    }
    return fechas
  }, [desfaseMes])

  useEffect(() => {
    setHorasDisponibles(fechas.map(fecha => {
      const esFeriado = feriados.find(f => f.fecha === format(fecha, 'yyyy-MM-dd'))
      return {
        fecha,
        horas: esFeriado
         ? []
         : horas[getDay(fecha)].map(hora => ({
            hora,
            disponible: obtenerDisponibilidad(consulta, fecha, hora)
          }))
      }
    }))
  }, [consulta, fechas])

  return (
    <div className={classNames({
      "Reagendamiento": true,
      "Reagendamiento--visible": consulta,
    })}>
      <h1 className="Reagendamiento__consulta">{consulta ? `"${consulta}"` : <>&nbsp;</>}</h1>
      <div className="Reagendamiento__herramientas">
        <button
          className="Reagendamiento__boton_navegacion_meses"
          title="Mes anterior"
          onClick={() => setDesfaseMes(prev => Math.max(0, prev -1))}
          disabled={desfaseMes === 0}
        >
          <InlineIcon icon="mdi:chevron-left" />
        </button>
        <button
          className="Reagendamiento__boton_navegacion_meses"
          title="Mes siguiente"
          onClick={() => setDesfaseMes(prev => prev + 1)}
        >
          <InlineIcon icon="mdi:chevron-right" />
        </button>
        <div className="Reagendamiento__texto_mes">
          {format(endOfWeek(fechas[0]), 'MMMM yyyy')}
        </div>
      </div>
      <div className="Reagendamiento__contenedor_titulos_dias">
        <div className="Reagendamiento__dia">Lun</div>
        <div className="Reagendamiento__dia">Mar</div>
        <div className="Reagendamiento__dia">Mié</div>
        <div className="Reagendamiento__dia">Jue</div>
        <div className="Reagendamiento__dia">Vie</div>
        <div className="Reagendamiento__dia">Sáb</div>
        <div className="Reagendamiento__dia">Dom</div>
      </div>
      <div className="Reagendamiento__calendario">
        {horasDisponibles.map(({ fecha, horas }, i) => {
          const infoFeriado = feriados.find(f => f.fecha === format(fecha, 'yyyy-MM-dd'))
          return (
            <div
              key={`celda-calendario-${i}`}
              className={classNames({
                "Reagendamiento__celda_calendario": true,
                "Reagendamiento__celda_calendario--pasado": isPast(endOfDay(fecha))
              })}
            >
              {/* {infoFeriado && <div className="Reagendamiento__fecha_motivo">{infoFeriado.motivo}</div>} */}
              <div
                className={classNames({
                  "Reagendamiento__fecha": true,
                  "Reagendamiento__fecha--hoy": isToday(fecha),
                  "Reagendamiento__fecha--feriado": getDay(fecha) === 0 || infoFeriado
                })}
              >
                {format(fecha, getDate(fecha) === 1 && !isToday(fecha) ? 'd MMMM' : 'd')}
              </div>
              <div className="Reagendamiento__contenedor_horas">
                {horas.map((hora, j) => (
                  <div
                    className="Reagendamiento__hora"
                    key={`hora-${i}-${j}`}
                  >
                    <div
                      className={classNames({
                        "Reagendamiento__circulito": true,
                        "Reagendamiento__circulito--disponible": hora.disponible
                      })}
                    />
                    <span className={classNames({
                      "Reagendamiento__texto_hora": true,
                      "Reagendamiento__texto_hora--disponible": hora.disponible,
                    })}>
                      {hora.hora}
                    </span>
                    {hora.disponible && (
                      <span className="Reagendamiento__texto_disponible">
                        <InlineIcon icon="mdi:check" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Reagendamiento