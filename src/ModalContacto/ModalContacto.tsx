import axios from 'axios'
import classNames from 'classnames'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import './ModalContacto.css'

const ModalContacto = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const mutation = useMutation(data => (
    axios.post('https://southamerica-east1-ceroai.cloudfunctions.net/submit-contact-form', data)
  ))
  const [modalActivo, setModalActivo] = useState(false)

  const enviar = async (data: any) => {
    mutation.mutate(data)
  }

  return (
    <div
      className={classNames({
        "ModalContacto": true,
        "ModalContacto--activo": modalActivo
      })}
    >
      <div className="ModalContacto__contenedor">
        <button
          className="ModalContacto__boton_cerrar"
          onClick={() => setModalActivo(false)}
        >
          Cerrar
        </button>
        <h1 className="ModalContacto__titulo">
          DEJANOS TUS DATOS PARA LLAMARTE
        </h1>
        <form
          className="ModalContacto__formulario"
          onSubmit={handleSubmit(enviar)}
        >
          <label className="ModalContacto__formulario_campo">
            name
            <input {...register('name')} type="text" />
          </label>
          <label className="ModalContacto__formulario_campo">
            email
            <input {...register('email')} type="email" />
          </label>
          <label className="ModalContacto__formulario_campo">
            phone
            <input {...register('phone')} type="text" />
          </label>
          <label className="ModalContacto__formulario_campo">
            institution
            <input {...register('institution')} type="text" />
          </label>
          <button
            className="ModalContacto__boton"
            type="submit"
          >
            embiar
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalContacto