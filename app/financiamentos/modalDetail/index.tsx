import React from "react"
import formatarCPF from "@/utils/formatacoes/formatarCPF"
import { formatarData } from "@/utils/formatacoes/formatarData"
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

  return (
    <Dialog open={isOpen} onOpenChange={onRequestClose}>
      {isView && (
        <DialogContent className="max-w-[525px]">
          <DialogHeader className="text-teal-600">
            <DialogTitle>Dados Cadastrados</DialogTitle>
          </DialogHeader>
          <S.ContainerBox>
            <S.ContainerBox>
              <S.TextLabel>Dados Pessoais</S.TextLabel>
              <div className="grid grid-cols-2">
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Nome:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.nome}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Telefone:</S.TextInfo>
                  <S.TextInfo>
                    {formatarTelefone(financiamentoDetail.telefone)}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">CPF:</S.TextInfo>
                  <S.TextInfo>
                    {formatarCPF(financiamentoDetail.cpf)}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Nascimento:</S.TextInfo>
                  <S.TextInfo>
                    {formatarData(financiamentoDetail.dataNascimento)}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">E-mail:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.email}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Identidade:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.rg}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Sexo:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.sexo}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Mãe:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.nomeMae}</S.TextInfo>
                </S.ContenteInfo>
              </div>
            </S.ContainerBox>

            <S.ContainerBox>
              <S.TextLabel>Dados Complementares</S.TextLabel>
              <div className="grid grid-cols-2">
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Profissão:</S.TextInfo>
                  <S.TextInfo>
                    {obterProfissao(financiamentoDetail.profissao)}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Renda:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.renda}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Nacionalidade:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.nacionalidade}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Patrimonio:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.patrimonio}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Procedimento:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.procedimento}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Estado Civil:</S.TextInfo>
                  <S.TextInfo>
                    {obterEstadoCivil(financiamentoDetail.estadoCivil)}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Nº parcelas</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.qtdParcelas}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">
                    Situação do imovel:
                  </S.TextInfo>
                  <S.TextInfo>
                    {obterSituacaoImovel(financiamentoDetail.situacaoImovel)}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">
                    Tipo de profissão:
                  </S.TextInfo>
                  <S.TextInfo>
                    {obterTipoProfissao(financiamentoDetail.tipoProfissao)}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Valor solicitado:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.valorSolicitado}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Anos:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.anos}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Meses:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.meses}</S.TextInfo>
                </S.ContenteInfo>
              </div>
            </S.ContainerBox>

            <S.ContainerBox>
              <S.TextLabel>Dados de Endereço</S.TextLabel>
              <div>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Cep:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.cep}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">UF:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.uf}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Cidade:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.cidade}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Bairro:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.bairro}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Endereço:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.endereco}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Numero:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.numero}</S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextInfo className="text-xs">Complemento:</S.TextInfo>
                  <S.TextInfo>{financiamentoDetail.complemento}</S.TextInfo>
                </S.ContenteInfo>
              </div>
            </S.ContainerBox>
          </S.ContainerBox>
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
