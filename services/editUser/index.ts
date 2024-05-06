import { AxiosResponse } from "axios"

import { api } from "../apiClient"

// export type EditImgAvatarProps = {
//   urlAvatar: File
// }

// export type EditUserProps = {
//   nome?: string
//   email?: string
//   telefone?: string
// }

export const redefinirImgAvatar: (
  arquivo: File
) => Promise<AxiosResponse<string>> = async (arquivo) => {
  const fromData = new FormData()
    fromData.append('Arquivo', arquivo)

    return api.post('/usuario/avatar', fromData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  // return api.post("/usuario/avatar", arquivo)
}




export const redefinirUser: (
  data: any
) => Promise<AxiosResponse<any>> = async (data) => {
  return api.put("/usuario", data)
}