import classNames from 'classnames'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { confirmacion } from '../../../api/api'
import BarraConfirmacion from './BarraConfirmacion'
import { Barra } from './BarraConfirmacion/BarraConfirmacion'
import './Confirmacion.css'

const traducirEtiquetaOtro = (etiqueta: string) => {
  switch (etiqueta) {
    case 'CONFIRMA_DESPUES':
      return 'Confirma más tarde'
    case 'EQUIVOCADO':
      return 'Número equivocado'
    case 'IN_CONTRADICCION':
      return 'Contradicción'
    case 'OUT':
      return 'Sin información'
    case 'PC_DIRECCION':
      return 'Pregunta por dirección'
    case 'PC_PRECIO':
      return 'Pregunta por valores'
    case 'PC_SEGURO':
      return 'Pregunta por forma de pago o seguro de salud'
    case 'QUIERE_HABLAR':
      return 'Necesita atención'
    case 'REAGENDA':
      return 'Reagenda'
    case 'REAGENDA_SOFT':
      return 'Pregunta por cambio de horario'
    case 'RESPUESTA_AUTO':
      return 'Respuesta automática'
    case 'SMALL_TALK':
      return 'Plática informal'
    case 'YA_CONFIRMO':
      return 'Sin información'
    default:
      return etiqueta
  }
}

const Confirmacion = () => {

  const { consulta } = useParams()
  const { data } = useQuery(
    ['confirmacion', consulta],
    () => confirmacion(consulta || '')
  )
  const [barras, setBarras] = useState<[Barra[], Barra[]]>([[
    {
      texto: 'Confirma',
      porcentaje: 0
    },
    {
      texto: 'Anula',
      porcentaje: 0
    },
    {
      texto: 'Otro',
      porcentaje: 100
    }
  ], []])
  const [barrasPrincipales, barrasSecundarias] = barras

  useEffect(() => {
    if (!data) {
      return
    }
    setBarras([
      [
        {
          texto: 'Confirma',
          porcentaje: 100 * data.data.etiquetas_confirmacion.yes
        },
        {
          texto: 'Anula',
          porcentaje: 100 * data.data.etiquetas_confirmacion.no
        },
        {
          texto: 'Otro',
          porcentaje: 100 * data.data.etiquetas_confirmacion.out
        }
      ],
      Object.keys(data.data.etiquetas_otro).map(etiqueta => (
        {
          texto: traducirEtiquetaOtro(etiqueta),
          porcentaje: 100 * data.data.etiquetas_otro[etiqueta]
        }
      ))
    ])
  }, [data])

  return (
    <div className={classNames({
      "Confirmacion": true,
      "Confirmacion--visible": consulta,
    })}>
      <h1 className="Confirmacion__consulta">{consulta ? `"${consulta}"` : <>&nbsp;</>}</h1>
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
        {barrasSecundarias.length > 0
          ? barrasSecundarias.map((barra, i) => (
            <BarraConfirmacion
              key={`barra-secundaria-confirmacion-${i}`}
              barra={barra}
              destacada={barrasSecundarias.reduce((x, y) => Math.max(x, y.porcentaje), 0) === barra.porcentaje}
            />
          ))
          : <BarraConfirmacion 
              barra={{ porcentaje: -1, texto: '-' }}
              destacada={false}
            />
        }
      </div>
    </div>
  )
}

export default Confirmacion