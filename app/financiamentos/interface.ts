export interface IFinanciamentoRequest {
    id?: string
    //Step 1
    nome: string
    telefone: string
    cpf: string
    dataNascimento: string
    uf: string
    email: string
    //Step 2
    procedimento: string
    valorSolicitado: number
    renda: number
    //Step 3
    qtdParcelas: number
    //Step 4
    //visualizar arquivo de validação
    //Step 5
    nacionalidade: string
    estadoCivil: number
    rg: string
    sexo: string
    nomeMae: string
    patrimonio: number
    //Step 6
    cep: string
    endereco: string
    estado: string
    bairro: string
    cidade: string
    complemento: string
    numero: string
    situacaoImovel: number
    //Step 7
    tipoProfissao: number
    profissao: number
    anos: number
    meses: number
    //Step 8
    ciente: boolean
    //visualização e validação
  }