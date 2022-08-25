import classNames from 'classnames'
import { addMonths, endOfDay, endOfWeek, format, getDate, getDay, isPast, isSameDay, isToday, startOfWeek } from 'date-fns'
import { addDays, endOfMonth } from 'date-fns/esm'
import { useMemo } from 'react'
import './Reagendamiento.css'

const horas = {
  0: [],
  1: [
    '10:00',
    '12:00',
    '14:00',
    '16:00',
    '18:00',
  ],
  2: [
    '10:00',
    '12:00',
    '14:00',
    '16:00',
    '18:00',
  ],
  3: [
    '10:00',
    '12:00',
    '14:00',
    '16:00',
    '18:00',
  ],
  4: [
    '10:00',
    '12:00',
    '14:00',
    '16:00',
    '18:00',
  ],
  5: [
    '10:00',
    '12:00',
    '14:00',
    '16:00',
    '18:00',
  ],
  6: [
    '10:00',
    '12:00',
    '14:00',
  ]
}

const Reagendamiento = () => {

  const fechas = useMemo(() => {
    const fin = addDays(endOfWeek(endOfMonth(addMonths(Date.now(), 13))), 1)
    let fecha = startOfWeek(Date.now())
    const fechas = []
    while (!isSameDay(fecha, fin)) {
      fechas.push(fecha)
      fecha = addDays(fecha, 1)
    }
    return fechas
  }, [])

  return (
    <div className="Reagendamiento">
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
        {fechas.map((fecha, i) => (
          <div
            key={`celda-calendario-${i}`}
            className={classNames({
              "Reagendamiento__celda_calendario": true,
              "Reagendamiento__celda_calendario--pasado": isPast(endOfDay(fecha))
            })}
          >
            <div
              className={classNames({
                "Reagendamiento__fecha": true,
                "Reagendamiento__fecha--hoy": isToday(fecha),
              })}
            >
            {format(fecha, getDate(fecha) === 1 && !isToday(fecha) ? 'd MMM' : 'd')}
            </div>
            <div className="Reagendamiento__contenedor_horas">
              {horas[getDay(fecha)].map((hora, j) => (
                <div
                  className="Reagendamiento__hora"
                  key={`hora-${i}-${j}`}
                >
                  <div className="Reagendamiento__circulito"/>
                  {hora}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reagendamiento