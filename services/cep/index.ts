import axios, { AxiosResponse } from "axios"

export interface ICepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export const obterCep: (cep: string) => Promise<AxiosResponse<ICepResponse>> = (
  cep
) => {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
}
