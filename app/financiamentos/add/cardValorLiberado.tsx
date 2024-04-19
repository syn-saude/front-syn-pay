import React from "react"
import formatarDinheiro from "@/utils/formatacoes/formatarDinheiro"
import { Check } from "lucide-react"

import Button from "@/components/ui/button"
import { RadioGroupItem } from "@/components/ui/radio-group"

import * as S from "./styles"

interface IProps {
  opcao: any
  selecionado: boolean
  valorLiberado: number
  parcelas: string
  onValueChange: (value: any) => void
}

export default function CardValorLiberado({
  valorLiberado,
  opcao,
  onValueChange,
  parcelas,
  selecionado,
  ...props
}: IProps) {
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
        {/* <div className="h-6 w-6 d-flex center bg-white d-block rounded-xl">
        </div> */}
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
          {formatarDinheiro(valorLiberado)}
        </div>
        <div className="text-sm font-bold">{parcelas}</div>
      </div>
      <div>
        <Button
          className={`${selecionado && "selecionado"}`}
          variant="link"
          type="button"
        >
          ver mais
        </Button>
      </div>
    </S.AprovadoContainer>
  )
}
