export interface ListagemResponse<T> {
  qtdTotal: number
  items: T[]
}

export interface ObjetoDescricaoGenerico {
  id: string
  descricao: string
  detalhe?: string
  grupo?: string
  tipo?: string
}
