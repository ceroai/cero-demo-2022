import { Link } from 'react-router-dom'
import './Bienvenida.css'

const Bienvenida = () => {
  return (
    <div className="Bienvenida">
      <h1 className="Bienvenida__hola">Hola 👋</h1>
      <h1 className="Bienvenida__explicacion">En esta interfaz puedes probar<br />el “cerebro” de Cero.AI</h1>
      <div className="Bienvenida__botones">
        <Link className="Bienvenida__boton" to="/prueba/confirmacion">Confirmaciones</Link>
        <Link className="Bienvenida__boton" to="/prueba/reagendamiento">Reagendamientos</Link>
      </div>
    </div>
  )
}

export default Bienvenida