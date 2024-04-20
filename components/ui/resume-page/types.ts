export interface SimulacaoResponse {
  listaStatusRespostaServico: ListaStatusRespostaServico[]
  codigoSimulacaoProposta: number
  indicadorRestricaoCredito: boolean
  codigoTabelaFinanciamento: string
  dataMinimaCarenciaFinanciamento: string
  dataMaximaCarenciaFinanciamento: string
  simulacaoInteligente: boolean
  valorMaximoDeParcelaPermitido: number
  numeroMaximoDeParcelasPermitidas: number
  listaParcelas: ParcelaBV[]
  listaPrazoNaoCalculado: any[]
  valorMaximoFinanciado: number
  existeValorParcial: boolean
}

export interface ListaStatusRespostaServico {
  codigo: number
  mensagem: string
  criticidade: string
  sistemaOrigem: string
  servicoOrigem: string
}

export interface ParcelaBV {
  quantidadeParcelas: number
  elegivel: boolean
  valorParcelaComSeguro: number
  valorParcelaSemSeguro: number
  coeficiente: number
  taxaNet: number
  taxaFinanciamentoMensal: number
  taxaFinanciamentoAnual: number
  valorPercentualCetAnual: number
  valorPercentualCetMensal: number
  valorJurosPrimeiraParcela: number
  valorLiberado: number
  valorFinanciamentoComSeguro: number
  valorFinanciamentoSemSeguro: number
  valorIof: number
  valorTotalCusto: number
  listaSegurosPrestamista: any[]
  listaDadosCustoFinanciamento: ListaDadosCustoFinanciamento[]
}

export interface ListaDadosCustoFinanciamento {
  custoFinanciamento: CustoFinanciamento
  aliquota: number
  valorCusto: number
  aplicaCalculoPmt: boolean
  somaCusto: boolean
}

export interface CustoFinanciamento {
  codigo: number
  descricao: string
}
