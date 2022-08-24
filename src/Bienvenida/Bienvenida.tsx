import { Link } from 'react-router-dom'
import './Bienvenida.css'

const Bienvenida = () => {
  return (
    <div className="Bienvenida">
      <h1>Hola 👋 </h1>
      <h1>En esta interfaz puedes probar el “cerebro” de Cero.AI</h1>
      <div>
        <Link to="/confirmacion">Confirmaciones</Link>
        <Link to="/reagendamiento">Reagendamientos</Link>
      </div>
    </div>
  )
}

export default Bienvenida