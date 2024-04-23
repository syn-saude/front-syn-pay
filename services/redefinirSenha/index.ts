import { AxiosResponse } from "axios"


import { api } from "../apiClient"


export type RedefinirSenhaProps = {
    token?: string,
    senha: string,
}

export const redefinirSenha: (
  data: RedefinirSenhaProps
) => Promise<AxiosResponse<any>> = async (data) => {
  return api.post("/SynPayAuth/DefinirSenha", data)
}


export const redefinirSenhaToken: (
  data: RedefinirSenhaProps
) => Promise<AxiosResponse<any>> = async (data) => {
  return api.post("/SynPayAuth/DefinirSenhaToken", data)
}