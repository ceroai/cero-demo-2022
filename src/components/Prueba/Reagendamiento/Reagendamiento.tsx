import { endOfWeek, format, isSameDay, startOfMonth, startOfWeek } from 'date-fns'
import { addDays, endOfMonth } from 'date-fns/esm'
import { useMemo } from 'react'
import './Reagendamiento.css'

const Reagendamiento = () => {

  const fechas = useMemo(() => {
    const fin = addDays(endOfWeek(endOfMonth(Date.now())), 1)
    let fecha = startOfWeek(startOfMonth(Date.now()))
    const fechas = []
    while (!isSameDay(fecha, fin)) {
      fechas.push(fecha)
      fecha = addDays(fecha, 1)
    }
    return fechas
  }, [])

  return (
    <div className="Reagendamiento">
      <h1>Septiembre 2022</h1>
      <div className="Reagendamiento__calendario">
        {fechas.map((fecha, i) => (
          <div
            key={`celda-calendario-${i}`}
            className="Reagendamiento__celda_calendario"
          >
            {format(fecha, 'yyyy-MM-dd')}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reagendamiento