import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
import './Bienvenida.css'

const Bienvenida = () => {
  return (
    <div className="Bienvenida">
      <h1 className="Bienvenida__hola">Hola 👋</h1>
      <h1 className="Bienvenida__explicacion">
        En esta interfaz puedes probar<br />
        el “cerebro” de Cero.AI
      </h1>
      <div className="Bienvenida__botones">
        <Link
          className="Bienvenida__boton"
          to="/prueba/confirmacion"
        >
          <Icon icon="mdi:check-bold" />
          Confirmaciones
        </Link>
        <Link
          className="Bienvenida__boton Bienvenida__boton--reagendamiento"
          to="/prueba/reagendamiento"
        >
          <Icon icon="mdi:calendar-export" />
          Reagendamientos
        </Link>
      </div>
    </div>
  )
}

export default Bienvenida