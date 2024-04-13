export type SingInProps = {
  cpf: string;
  email?: string;
  senha: string;
};

export interface AuthResponse {
  id: string;
  cpf: string;
  nome: string;
  perfis: string[];
  perfisPorTenant: any[];
  authToken: string;
  dataExpiracaoToken: Date;
  primeiroAcesso: boolean;
  resetarToken: boolean;
  tipoParceiro: string;
  aceitouPoliticaPrivacidade: boolean;
  verResumoAtualizacoes: boolean;
  setorFuncionario: string;
  aceitouTermo: boolean;
  verDashboard: boolean;
  temPacote: boolean;
  perfisNome: any[];
  mostrarTutorial: boolean;
  lstSetorFuncionario: string[];
}
