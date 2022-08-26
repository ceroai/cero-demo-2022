import BarraConfirmacion from './BarraConfirmacion'
import './Confirmacion.css'

const Confirmacion = () => {

  const barrasPrincipales = [
    {
      texto: 'Confirmar',
      porcentaje: 100 * Math.random()
    },
    {
      texto: 'Anular',
      porcentaje: 100 * Math.random()
    },
    {
      texto: 'Otro',
      porcentaje: 100 * Math.random()
    },
  ]

  const barrasSecundarias = [
    {
      texto: 'Pregunta precio',
      porcentaje: 100 * Math.random()
    },
  ]

  return (
    <div className="Confirmacion">
      <div className="Confirmacion__barras">
        {barrasPrincipales.map((barra, i) => (
          <BarraConfirmacion
            key={`barra-principal-confirmacion-${i}`}
            barra={barra}
            destacada={barrasPrincipales.reduce((x, y) => Math.max(x, y.porcentaje), 0) === barra.porcentaje}
          />
        ))}
      </div>
      <h2 className="Confirmacion__titulo_barras_secundarias">Intención</h2>
      <div className="Confirmacion__barras">
        {barrasSecundarias.map((barra, i) => (
          <BarraConfirmacion
            key={`barra-secundaria-confirmacion-${i}`}
            barra={barra}
            destacada={barrasSecundarias.reduce((x, y) => Math.max(x, y.porcentaje), 0) === barra.porcentaje}
          />
        ))}
      </div>
    </div>
  )
}

export default Confirmacion