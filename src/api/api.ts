import axios, { AxiosResponse } from 'axios'

export const confirmacion = (consulta: string): Promise<AxiosResponse | null> => {
  if (consulta) {
    return axios.post(
      `https://demo-expo.cero.ai/confirmacion`,
      {
        message: consulta
      }
    )
  }
  else {
    return new Promise((resolve, reject) => null)
  }
}

export const reagendamiento = (consulta: string): Promise<AxiosResponse | null> => {
  if (consulta) {
    return axios.post(
      `https://demo-expo.cero.ai/reagendamiento`,
      {
        message: consulta
      }
    )
  }
  else {
    return new Promise((resolve, reject) => null)
  }
}