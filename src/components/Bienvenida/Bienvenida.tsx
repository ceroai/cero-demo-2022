import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import logo from '../../assets/images/logo_blanco.png'
import './Bienvenida.css'

const Bienvenida = () => {
  return (
    <div className="Bienvenida">
      {/* <p className="Bienvenida__cerebro">🧠</p> */}
      <h1 className="Bienvenida__hola">Hola <span className="Bienvenida__mano">👋</span></h1>
      <h1 className="Bienvenida__explicacion">
        Te invitamos a interactuar <br />
        con el cerebro de <img src={logo} className="Bienvenida__logo" alt='Logo Cero' />
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
          <Icon icon="mdi:calendar-end" />
          Reagendamientos
        </Link>
        <Link
          className="Bienvenida__boton Bienvenida__boton--agendamiento"
          to="/"
        >
          <Icon icon="mdi:calendar-clock" />
          Agendamientos
          <span>Próximamente...</span>
        </Link>
      </div>
    </div>
  )
}

export default Bienvenida