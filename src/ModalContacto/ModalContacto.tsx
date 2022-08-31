import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import './ModalContacto.css'

const ModalContacto = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const mutation = useMutation(data => {
    return axios.post('https://southamerica-east1-ceroai.cloudfunctions.net/submit-contact-form', data)
  })

  const enviar = (data: any) => {
    mutation.mutate(data)
  }

  return (
    <div className="ModalContacto">
      <h1 className="ModalContacto__titulo">
        DEJANOS TUS DATOS PARA LLAMARTE JAJA
      </h1>
      <form
        className="ModalContacto__formulario"
        onSubmit={handleSubmit(enviar)}
      >
        <label>
          name
          <input {...register('name')} type="text" />
        </label>
        <label>
          email
          <input {...register('email')} type="email" />
        </label>
        <label>
          phone
          <input {...register('phone')} type="text" />
        </label>
        <label>
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
  )
}

export default ModalContacto