import axios, { AxiosResponse } from "axios"

import { ListagemResponse } from "@/hooks/listagem/types"
import { SimulacaoResponse } from "@/components/ui/resume-page/types"
import { FinanciamentoRequest } from "@/app/financiamentos/add/page"

import { setupAPIClient } from "../api"
import { api } from "../apiClient"

export interface IFinanciamentoResponse {
  id: string
  simulacao: SimulacaoResponse
}
export interface ListagemQuery extends Record<string, any> {
  pagina: number
  qtdPorPagina: number
  termoPesquisa?: string
}

export const salvarFinanciamento: (
  data: any
) => Promise<AxiosResponse<any>> = async (data) => {
  return api.post("/synpay/financiamentos", data)
}

export interface ItemListagemFinanciamento {
  id: string
  nome: string
  descricaoStatusSyn: string
  statusSyn: string
  etapa: number
  valorSolicitado: number
  valorParcialLiberado: number
  criado: string
  avatarUrl?: string
  procedimento: string
}

export const obterListagemFinanciamento: (
  query: ListagemQuery
) => Promise<AxiosResponse<ListagemResponse<ItemListagemFinanciamento>>> = (
  query
) => {
  var params = new URLSearchParams(query)
  return api.get(`/synpay/financiamentos?${params}`)
}

export const obterFinanciamentoPorId: (
  id: string
) => Promise<AxiosResponse<FinanciamentoRequest>> = (id) => {
  return api.get(`/synpay/financiamentos/${id}`)
}
