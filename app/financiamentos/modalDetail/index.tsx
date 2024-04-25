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
      case "F":
        return "Feminino"
      case "M":
        return "Masculino"
      default:
        return "Outro"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onRequestClose}>
      {isView && (
        <DialogContent className="max-w-[525px] max-h-[85vh] overflow-auto">
          <DialogHeader className="dark:text-emerald-500 text-blue-900">
            <DialogTitle>Dados Cadastrados</DialogTitle>
          </DialogHeader>
          <S.Container>
            <S.ContainerBox>
              <S.TextLabel className="dark:text-emerald-500 text-blue-900">
                Dados Pessoais
              </S.TextLabel>
              <S.StepDivider />
              <div className="grid grid-cols-2 gap-1">
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">Nome</S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.nome
                      ? financiamentoDetail.nome
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Telefone
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.telefone
                      ? formatarTelefone(financiamentoDetail.telefone)
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">CPF</S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.cpf
                      ? formatarCPF(financiamentoDetail.cpf)
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Nascimento
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.dataNascimento
                      ? formatarData(financiamentoDetail.dataNascimento)
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">E-mail</S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.email
                      ? financiamentoDetail.email
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Identidade
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.rg
                      ? financiamentoDetail.rg
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">Sexo</S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.sexo
                      ? transformSexo(financiamentoDetail.sexo)
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">Mãe</S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.nomeMae
                      ? financiamentoDetail.nomeMae
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
              </div>
            </S.ContainerBox>

            <S.ContainerBox>
              <S.TextLabel className="dark:text-emerald-500 text-blue-900">
                Dados Complementares
              </S.TextLabel>
              <S.StepDivider />
              <div className="grid grid-cols-2 gap-1">
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Profissão
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.profissao
                      ? obterProfissao(financiamentoDetail.profissao)
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">Renda</S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.renda
                      ? formatarDinheiro(financiamentoDetail.renda)
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Nacionalidade
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.nacionalidade
                      ? financiamentoDetail.nacionalidade
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Patrimonio
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.patrimonio
                      ? formatarDinheiro(financiamentoDetail.patrimonio)
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Procedimento
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.procedimento
                      ? financiamentoDetail.procedimento
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Estado Civil
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.estadoCivil
                      ? obterEstadoCivil(financiamentoDetail.estadoCivil)
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Nº parcelas
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.qtdParcelas
                      ? financiamentoDetail.qtdParcelas
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Situação do imovel
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.situacaoImovel
                      ? obterSituacaoImovel(financiamentoDetail.situacaoImovel)
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Tipo de profissão
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.tipoProfissao
                      ? obterTipoProfissao(financiamentoDetail.tipoProfissao)
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Valor solicitado
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.valorSolicitado
                      ? formatarDinheiro(financiamentoDetail.valorSolicitado)
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">Anos</S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.anos
                      ? financiamentoDetail.anos
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">Meses</S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.meses
                      ? financiamentoDetail.meses
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
              </div>
            </S.ContainerBox>

            <S.ContainerBox>
              <S.TextLabel className="dark:text-emerald-500 text-blue-900">
                Dados de Endereço
              </S.TextLabel>
              <S.StepDivider />
              <div>
                <div className="grid grid-cols-2 gap-1">
                  <S.ContenteInfo>
                    <S.TextLabelInfo className="text-xs">Cep</S.TextLabelInfo>
                    <S.TextInfo>
                      {financiamentoDetail.cep
                        ? financiamentoDetail.cep
                        : "Não preenchido"}
                    </S.TextInfo>
                  </S.ContenteInfo>
                  <S.ContenteInfo>
                    <S.TextLabelInfo className="text-xs">UF</S.TextLabelInfo>
                    <S.TextInfo>
                      {financiamentoDetail.uf
                        ? financiamentoDetail.uf
                        : "Não preenchido"}
                    </S.TextInfo>
                  </S.ContenteInfo>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <S.ContenteInfo>
                    <S.TextLabelInfo className="text-xs">
                      Cidade
                    </S.TextLabelInfo>
                    <S.TextInfo>
                      {financiamentoDetail.cidade
                        ? financiamentoDetail.cidade
                        : "Não preenchido"}
                    </S.TextInfo>
                  </S.ContenteInfo>

                  <S.ContenteInfo>
                    <S.TextLabelInfo className="text-xs">
                      Endereço
                    </S.TextLabelInfo>
                    <S.TextInfo>
                      {financiamentoDetail.endereco
                        ? financiamentoDetail.endereco
                        : "Não preenchido"}
                    </S.TextInfo>
                  </S.ContenteInfo>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <S.ContenteInfo>
                    <S.TextLabelInfo className="text-xs">
                      Bairro
                    </S.TextLabelInfo>
                    <S.TextInfo>
                      {financiamentoDetail.bairro
                        ? financiamentoDetail.bairro
                        : "Não preenchido"}
                    </S.TextInfo>
                  </S.ContenteInfo>
                  <S.ContenteInfo>
                    <S.TextLabelInfo className="text-xs">
                      Numero
                    </S.TextLabelInfo>
                    <S.TextInfo>
                      {financiamentoDetail.numero
                        ? financiamentoDetail.numero
                        : "Não preenchido"}
                    </S.TextInfo>
                  </S.ContenteInfo>
                </div>
                <S.ContenteInfo>
                  <S.TextLabelInfo className="text-xs">
                    Complemento
                  </S.TextLabelInfo>
                  <S.TextInfo>
                    {financiamentoDetail.complemento
                      ? financiamentoDetail.complemento
                      : "Não preenchido"}
                  </S.TextInfo>
                </S.ContenteInfo>
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
