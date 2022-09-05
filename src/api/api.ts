// {
//   "etiquetas_confirmacion": {
//       "yes": 0.011581536382436752,
//       "no": 0.0012718980433419347,
//       "out": 0.9871466159820557
//   },
//   "etiquetas_otro": {
//       "PC_PRECIO": 0.9957051873207092
//   }
// }

import axios, { Axios, AxiosResponse } from 'axios'

export interface ConfirmacionResponse {
  etiquetas_confirmacion: { yes: number, no: number, out: number }
  etiquetas_otro: any[]
}


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