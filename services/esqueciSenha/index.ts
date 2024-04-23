import { AxiosResponse } from "axios"

import { api } from "../apiClient"

export type EsqueciSenhaProps = {
    cpf: string
}

export const esqueciSenha: (
  data: EsqueciSenhaProps
) => Promise<AxiosResponse<any>> = async (data) => {
  return api.post("/SynPayAuth/EsqueciSenha", data)
}
