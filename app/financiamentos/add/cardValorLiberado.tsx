import React, { useEffect, useState } from "react"
import formatarDinheiro from "@/utils/formatacoes/formatarDinheiro"
import { Check } from "lucide-react"

import Button from "@/components/ui/button"
import { RadioGroupItem } from "@/components/ui/radio-group"
import ResumePage from "@/components/ui/resume-page/resumePage"
import { ParcelaBV, SimulacaoResponse } from "@/components/ui/resume-page/types"

import ModalDetail from "../modalDetail"
import * as S from "./styles"

interface IProps {
  opcao: ParcelaBV
  selecionado: boolean
  simulacao: SimulacaoResponse
  onValueChange: (value: any) => void
}

export default function CardValorLiberado({
  onValueChange,
  opcao,
  selecionado,
  simulacao,
  ...props
}: IProps) {
  const [modalDetailIsOpen, setModalDetailIsOpen] = useState(false)

  function handleCloseModal() {
    setModalDetailIsOpen(false)
  }

  function handleOpemModalView(qtdParcelas: number) {
    setModalDetailIsOpen(true)
  }

  function handleChange() {
    onValueChange(opcao)
  }
  return (
    <S.AprovadoContainer
      onClick={handleChange}
      {...props}
      className={`text-primary border-slate-400 ${
        selecionado && "selecionado"
      } w-full max-w-[500px] hover:bg-slate-300 `}
    >
      <div className="max-w[60px]">
        {selecionado ? (
          <Check className="h-4 w-4 bg-green-800 rounded-xl p-1" />
        ) : (
          <div
            className={`h-4 w-4 d-block rounded-xl  ${
              selecionado
                ? "bg-white  hover:bg-slate-300 border-primary border"
                : "bg-white  hover:bg-slate-300 border-primary border"
            } `}
          ></div>
        )}
      </div>
      <div className="flex flex-col w-full sm:flex-row">
        <div className="flex flex-col w-full mx-4">
          <div className="text-sm">Valor liberado:</div>
          <div className="text-lg font-bold">
            {formatarDinheiro(opcao.valorLiberado)}
          </div>
        </div>
        <div className="flex flex-col w-full mx-4">
          <div className="text-sm font-bold">
            {opcao.quantidadeParcelas}x de{" "}
          </div>
          <div className="text-sm font-bold">
            {formatarDinheiro(opcao.valorParcelaSemSeguro)}
          </div>
        </div>
      </div>

      <div>
        <Button
          className={`${selecionado && "selecionado"}`}
          variant="link"
          type="button"
          onClick={() => handleOpemModalView(opcao.quantidadeParcelas)}
        >
          ver mais
        </Button>
        {modalDetailIsOpen && (
          <ModalDetail
            isOpen={modalDetailIsOpen}
            simulacao={simulacao}
            onRequestClose={handleCloseModal}
            optionDetail={opcao}
          />
        )}
      </div>
    </S.AprovadoContainer>
  )
}
