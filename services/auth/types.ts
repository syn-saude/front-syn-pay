export type SingInProps = {
  cpf: string
  email?: string
  senha: string
}

export type EsqueciSenhaProps = {
  cpf: string
}

export type RedefinirSenhaProps = {
  senha: string
  confirmaSenha: string
}

export interface AuthResponse {
  id: string
  cpf: string
  perfisPorTenant: TenantPerfil[]
  authToken: string
  dataExpiracaoToken: Date
  primeiroAcesso: boolean
  aceitouPoliticaPrivacidade: boolean
  verResumoAtualizacoes: boolean
  aceitouTermo: boolean
}

export interface TenantPerfil {
  tenantId: string
  parceiroId: string
  localAtendimentoId: string
  uf: string
  descricao: string
  perfis: Perfil[]
}

export interface Perfil {
  idPerfil: string
  nome: string
}
