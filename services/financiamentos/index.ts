import axios, { AxiosResponse } from "axios"

import { setupAPIClient } from "../api"

export interface IFinanciamentoResponse {}

export const sendFinanciamento: (data: any) => Promise<void> = async (data) => {
  const apiClient = setupAPIClient()
  const response = await apiClient.post("/synpay/financiamentos", data)
}

export const obterListagemFinanciamento: (data: any) => Promise<void> = async (
  data
) => {
  const apiClient = setupAPIClient()
  const response = await apiClient.post("/synpay/financiamentos", data)
}
