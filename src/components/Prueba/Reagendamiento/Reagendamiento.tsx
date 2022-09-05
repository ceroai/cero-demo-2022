import { InlineIcon } from '@iconify/react'
import classNames from 'classnames'
import { addMonths, endOfDay, endOfWeek, format, getDate, getDay, isPast, isSameDay, isToday, parse, startOfWeek } from 'date-fns'
import { addDays, endOfMonth, startOfMonth } from 'date-fns/esm'
import { useMemo, useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { reagendamiento } from '../../../api/api'
import './Reagendamiento.css'

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

const obtenerDisponibilidad = (fecha: Date, date_spec: { 0: string | null, 1: string | null, 2: string | null }[]) => {
  let fechaEnDateSpec = date_spec?.find(d => isSameDay(parse(d[0] || '', 'yyyy-MM-dd', new Date()), fecha))
  if (!fechaEnDateSpec && (!date_spec || date_spec.some(d => d[0]))) {
    return []
  }
  else if (!fechaEnDateSpec) {
    fechaEnDateSpec = date_spec.find(d => !d[0]) as { 0: null, 1: string, 2: string }
  }
  const { 1: horaInicial, 2: horaFinal } = fechaEnDateSpec
  if (!horaInicial && !horaFinal) {
    return ['Todo el día']
  }
  const horas = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  if (!horaInicial && horaFinal) {
    return horas.filter(h => h < parse(horaFinal, 'HH:mm:ss', new Date()).getHours()).map(hora => (
      format(parse(hora.toString(), 'H', new Date()), 'HH:mm')
    ))
  }
  else if (horaInicial && !horaFinal) {
    return horas.filter(h => h >= parse(horaInicial, 'HH:mm:ss', new Date()).getHours()).map(hora => (
      format(parse(hora.toString(), 'H', new Date()), 'HH:mm')
    ))
  }
  else if (horaInicial && horaFinal) {
    return [format(parse(horaInicial, 'HH:mm:ss', new Date()), 'HH:mm')]
  }
  return []
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
    horas: string[]
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
    if (!data) {
      return
    }
    setHorasDisponibles(fechas.map(fecha => {
      return {
        fecha,
        horas: obtenerDisponibilidad(fecha, data.data.date_spec)
      }
    }))
  }, [fechas, data])

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
                        "Reagendamiento__circulito--disponible": true
                      })}
                    />
                    <span className={classNames({
                      "Reagendamiento__texto_hora": true,
                      "Reagendamiento__texto_hora--disponible": true,
                    })}>
                      {hora}
                    </span>
                    <span className="Reagendamiento__texto_disponible">
                      <InlineIcon icon="mdi:check" />
                    </span>
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