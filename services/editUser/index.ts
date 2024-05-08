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
  fromData.append("Arquivo", arquivo)

  return api.post("/usuario/avatar", fromData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

export const removerImgAvatar: () => Promise<
  AxiosResponse<string>
> = async () => {
  return api.delete("/usuario/avatar")
}

export const redefinirUsuario: (
  data: any
) => Promise<AxiosResponse<any>> = async (data) => {
  return api.put("/usuario", data)
}
