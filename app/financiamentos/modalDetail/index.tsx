import React from "react"
import formatarCPF from "@/utils/formatacoes/formatarCPF"
import { formatarData } from "@/utils/formatacoes/formatarData"
import formatarDinheiro from "@/utils/formatacoes/formatarDinheiro"
import formatarTelefone from "@/utils/formatacoes/formatarTelefone"
import { X } from "lucide-react"

import {
  BV_ESTADO_CIVIL,
  BV_NACIONALIDADE,
  BV_PROFISSOES,
  BV_SITUACAO_IMOVEL,
  BV_TIPOS_PROFISSOES,
} from "@/config/const/bv/dominio"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import ResumePage from "@/components/ui/resume-page/resumePage"
import { ParcelaBV, SimulacaoResponse } from "@/components/ui/resume-page/types"

import * as S from "./styles"

interface ModalOrderProps {
  isOpen: boolean
  onRequestClose: () => void
  optionDetail?: ParcelaBV
  simulacao?: SimulacaoResponse
  isView?: boolean
  financiamentoDetail?: any
}
export default function ModalDetail({
  onRequestClose,
  isOpen,
  optionDetail,
  financiamentoDetail,
  simulacao,
  isView,
}: ModalOrderProps) {
  function obterProfissao(codigo: number) {
    const profissao = BV_PROFISSOES.find((item) => item.codigo === codigo)
    return profissao?.descricao
  }

  function obterTipoProfissao(codigo: number) {
    const tipoProfissao = BV_TIPOS_PROFISSOES.find(
      (item) => item.codigo === codigo
    )
    return tipoProfissao?.descricao
  }

  function obterEstadoCivil(codigo: number) {
    const estadoCivil = BV_ESTADO_CIVIL.find((item) => item.codigo === codigo)
    return estadoCivil?.descricao
  }

  function obterSituacaoImovel(codigo: number) {
    const situacaoImovel = BV_SITUACAO_IMOVEL.find(
      (item) => item.codigo === codigo
    )
    return situacaoImovel?.descricao
  }

  const transformSexo = (sexo) => {
    switch (sexo) {
      case 'F':
        return 'Feminino';
      case 'M':
        return 'Masculino';
      default:
        return 'Outro';
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onRequestClose}>
      {isView && (
        <DialogContent className="max-w-[525px]">
          <DialogHeader className="dark:text-emerald-500 text-blue-900">
            <DialogTitle>Dados Cadastrados</DialogTitle>
          </DialogHeader>
          <S.Container>
            <S.ContainerBox>
              <S.TextLabel className="dark:text-emerald-500 text-blue-900">
                Dados Pessoais
              </S.TextLabel>
              <S.StepDivider />
              <div className="grid grid-cols-2 gap-2">
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">Nome</S.TextLabelInfo>
                  <S.TextInfo>{financiamentoDetail.nome}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Telefone
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {formatarTelefone(financiamentoDetail.telefone)}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">CPF</S.TextLabelInfo>
                  <S.TextInfo>
                    {formatarCPF(financiamentoDetail.cpf)}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Nascimento
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {formatarData(financiamentoDetail.dataNascimento)}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">E-mail</S.TextLabelInfo>
                  <S.TextInfo>{financiamentoDetail.email}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Identidade
                  </S.TextLabelInfo>
                  <S.TextInfo>{financiamentoDetail.rg}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">Sexo</S.TextLabelInfo>
                  <S.TextInfo>{transformSexo(financiamentoDetail.sexo)}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">Mãe</S.TextLabelInfo>
                  <S.TextInfo>{financiamentoDetail.nomeMae}</S.TextInfo>
                </S.ContenteInfo>
              </div>
            </S.ContainerBox>

            <S.ContainerBox>
              <S.TextLabel className="dark:text-emerald-500 text-blue-900">
                Dados Complementares
              </S.TextLabel>
              <S.StepDivider />
              <div className="grid grid-cols-2 gap-2">
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Profissão
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {obterProfissao(financiamentoDetail.profissao)}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">Renda</S.TextLabelInfo>
                  <S.TextInfo>
                    {formatarDinheiro(financiamentoDetail.renda)}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Nacionalidade
                  </S.TextLabelInfo>
                  <S.TextInfo>{financiamentoDetail.nacionalidade}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Patrimonio
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {formatarDinheiro(financiamentoDetail.patrimonio)}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Procedimento
                  </S.TextLabelInfo>
                  <S.TextInfo>{financiamentoDetail.procedimento}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Estado Civil
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {obterEstadoCivil(financiamentoDetail.estadoCivil)}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Nº parcelas
                  </S.TextLabelInfo>
                  <S.TextInfo>{financiamentoDetail.qtdParcelas}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Situação do imovel
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {obterSituacaoImovel(financiamentoDetail.situacaoImovel)}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Tipo de profissão
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {obterTipoProfissao(financiamentoDetail.tipoProfissao)}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Valor solicitado
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {formatarDinheiro(financiamentoDetail.valorSolicitado)}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">Anos</S.TextLabelInfo>
                  <S.TextInfo>{financiamentoDetail.anos}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">Meses</S.TextLabelInfo>
                  <S.TextInfo>{financiamentoDetail.meses}</S.TextInfo>
                </S.ContenteInfo>
              </div>
            </S.ContainerBox>

            <S.ContainerBox>
              <S.TextLabel className="dark:text-emerald-500 text-blue-900">
                Dados de Endereço
              </S.TextLabel>
              <S.StepDivider />
              <div>
                <S.ContenteInfoRow>
                  <S.TextLabelInfo className="text-xs">Cep:</S.TextLabelInfo>
                  <S.TextInfo>{financiamentoDetail.cep}</S.TextInfo>
                </S.ContenteInfoRow>
                <S.ContenteInfoRow>
                  <S.TextLabelInfo className="text-xs">UF:</S.TextLabelInfo>
                  <S.TextInfo>{financiamentoDetail.uf}</S.TextInfo>
                </S.ContenteInfoRow>
                <S.ContenteInfoRow>
                  <S.TextLabelInfo className="text-xs">Cidade:</S.TextLabelInfo>
                  <S.TextInfo>{financiamentoDetail.cidade}</S.TextInfo>
                </S.ContenteInfoRow>
                <S.ContenteInfoRow>
                  <S.TextLabelInfo className="text-xs">Bairro:</S.TextLabelInfo>
                  <S.TextInfo>{financiamentoDetail.bairro}</S.TextInfo>
                </S.ContenteInfoRow>
                <S.ContenteInfoRow>
                  <S.TextLabelInfo className="text-xs">
                    Endereço:
                  </S.TextLabelInfo>
                  <S.TextInfo>{financiamentoDetail.endereco}</S.TextInfo>
                </S.ContenteInfoRow>
                <S.ContenteInfoRow>
                  <S.TextLabelInfo className="text-xs">Numero:</S.TextLabelInfo>
                  <S.TextInfo>{financiamentoDetail.numero}</S.TextInfo>
                </S.ContenteInfoRow>
                <S.ContenteInfoRow>
                  <S.TextLabelInfo className="text-xs">
                    Complemento:
                  </S.TextLabelInfo>
                  <S.TextInfo>{financiamentoDetail.complemento}</S.TextInfo>
                </S.ContenteInfoRow>
              </div>
            </S.ContainerBox>
          </S.Container>
        </DialogContent>
      )}

      {!isView && optionDetail && (
        <>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Detalhes</DialogTitle>
            </DialogHeader>
            <ResumePage parcela={optionDetail} simulacao={simulacao} />
          </DialogContent>
        </>
      )}
    </Dialog>
  )
}
