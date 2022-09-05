import classNames from 'classnames'
import './BarraConfirmacion.css'

export interface Barra {
  texto: string
  porcentaje: number
}

const BarraConfirmacion = ({ barra, destacada = false } : { barra: Barra, destacada?: boolean }) => {
  return (
    <div
      className={classNames({
        "BarraConfirmacion": true,
        "BarraConfirmacion--destacada": destacada
      })}>
      <div className="BarraConfirmacion__titulo">
        {barra.texto}
      </div>
      <div
        className="BarraConfirmacion__porcentaje"
        style={{
          boxShadow: `inset calc(-30rem * ${1 - barra.porcentaje / 100}) 0 white`
        }}
      >
        {barra.porcentaje < 0 ? <>&nbsp;</> : `${Math.round(barra.porcentaje)}%`}
      </div>
    </div>
  )
}

export default BarraConfirmacion