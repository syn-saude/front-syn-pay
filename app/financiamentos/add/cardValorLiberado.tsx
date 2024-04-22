import React, { useEffect, useState } from "react"
import formatarDinheiro from "@/utils/formatacoes/formatarDinheiro"
import { Check } from "lucide-react"

import Button from "@/components/ui/button"
import { RadioGroupItem } from "@/components/ui/radio-group"
import ResumePage from "@/components/ui/resume-page/resumePage"

import * as S from "./styles"
import ModalDetail from "../modalDetail/page"
import { ParcelaBV } from "@/components/ui/resume-page/types"

interface IProps {
  opcao: ParcelaBV
  selecionado: boolean
  onValueChange: (value: any) => void
}

export default function CardValorLiberado({
  onValueChange,
  opcao,
  selecionado,
  ...props
}: IProps) {
  const [modalDetailIsOpen, setModalDetailIsOpen] = useState(false);

  function handleCloseModal() {
    setModalDetailIsOpen(false);
  }
  
  function handleOpemModalView(qtdParcelas: number) {
    setModalDetailIsOpen(true);
  }

  function handleChange() {
    onValueChange(opcao)
  }
  return (
    <S.AprovadoContainer
      onClick={handleChange}
      {...props}
      className={`text-purple-800 ${
        selecionado && "selecionado"
      } w-full md:max-w-[300px]`}
    >
      <div>
        {selecionado ? (
          <Check className="h-4 w-4 bg-green-800 rounded-xl p-1" />
        ) : (
          <div
            className={`h-4 w-4 d-block rounded-xl  ${
              selecionado
                ? "bg-white  hover:bg-slate-300 border-purple-900 border"
                : "bg-white  hover:bg-slate-300 border-purple-900 border"
            } `}
          ></div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="text-sm">Valor liberado:</div>
        <div className="text-lg font-bold">
          {formatarDinheiro(opcao.valorLiberado)}
        </div>
        <div className="text-sm font-bold">
          x{opcao.quantidadeParcelas} de {formatarDinheiro(opcao.valorParcelaSemSeguro)}
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
        {modalDetailIsOpen && 
        <ModalDetail 
        isOpen={modalDetailIsOpen} 
        onRequestClose={handleCloseModal} 
        optionDetail={opcao}

        />
        }
      </div>
    </S.AprovadoContainer>
  )
}
