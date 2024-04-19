export type SingInProps = {
  cpf: string
  email?: string
  senha: string
}

export interface AuthResponse {
  id: string
  cpf: string
  perfisPorTenant: any[]
  authToken: string
  dataExpiracaoToken: Date
  primeiroAcesso: boolean
  aceitouPoliticaPrivacidade: boolean
  verResumoAtualizacoes: boolean
  aceitouTermo: boolean
}
