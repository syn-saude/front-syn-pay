import React, { useEffect, useState } from "react"
import { formatarData } from "@/utils/formatacoes/formatarData"
import formatarDinheiro from "@/utils/formatacoes/formatarDinheiro"

import * as S from "./styles"
import { ParcelaBV, SimulacaoResponse } from "./types"

interface IParcela {
  parcela: ParcelaBV
  simulacao: SimulacaoResponse | undefined
}

export default function ResumePage({ parcela, simulacao }: IParcela) {
  return (
    <div className="grid gap-4">
      <div>
        <S.LabelTitleSimulation>Valor solicitado</S.LabelTitleSimulation>
        <S.StepDivider />
        <S.TextInfoSimulation>
          {formatarDinheiro(parcela?.valorLiberado)}
        </S.TextInfoSimulation>
        <S.ContentBoxSimulation>
          <S.TextSimulation>Valor da entrada</S.TextSimulation>
          <S.TextInfoSimulation>R$ 0,00</S.TextInfoSimulation>
        </S.ContentBoxSimulation>
        <div>
          <S.TextSimulation>Valor total do crédito</S.TextSimulation>
          <S.TextInfoSimulation>
            {formatarDinheiro(
              parcela?.valorFinanciamentoSemSeguro + parcela?.valorIof
            )}
          </S.TextInfoSimulation>
        </div>
      </div>

      <div>
        <S.LabelTitleSimulation>Prazos e parcelas</S.LabelTitleSimulation>
        <S.StepDivider />
        <S.ContentBoxSimulation>
          <S.TextSimulation>Vencimento</S.TextSimulation>
          <S.TextInfoSimulation>
            {`1ª parcela ${formatarData(
              simulacao?.dataMinimaCarenciaFinanciamento
            )} "(daqui a 30 dias)"`}
          </S.TextInfoSimulation>
        </S.ContentBoxSimulation>
        <S.ContainerBoxSimulation>
          <S.ContentBoxSimulation>
            <S.TextSimulation>quantidade de parcelas</S.TextSimulation>
            <S.TextInfoSimulation>
              {parcela?.quantidadeParcelas} vezes
            </S.TextInfoSimulation>
          </S.ContentBoxSimulation>
          <S.ContentBoxSimulation>
            <S.TextSimulation>Valor da parcela</S.TextSimulation>
            <S.TextInfoSimulation>
              {formatarDinheiro(parcela?.valorParcelaSemSeguro)}
            </S.TextInfoSimulation>
          </S.ContentBoxSimulation>
        </S.ContainerBoxSimulation>
      </div>

      <div>
        <S.LabelTitleSimulation>Taxas e impostos</S.LabelTitleSimulation>
        <S.StepDivider />
        <S.ContainerBoxSimulation>
          <S.ContentBoxSimulation>
            <S.TextSimulation>Tarifa de cadastro</S.TextSimulation>
            <S.TextInfoSimulation>
              {parcela?.listaDadosCustoFinanciamento?.find(
                (c: any) => c?.custoFinanciamento?.codigo === 6
              )?.somaCusto
                ? formatarDinheiro(
                    parcela?.listaDadosCustoFinanciamento?.find(
                      (c: any) => c?.custoFinanciamento?.codigo === 6
                    )?.valorCusto
                  )
                : "Isento"}
            </S.TextInfoSimulation>

            <S.TextSimulation>Taxa de juros mensal</S.TextSimulation>
            <S.TextInfoSimulation>
              {parcela?.taxaFinanciamentoMensal}% ao mês
            </S.TextInfoSimulation>

            <S.TextSimulation>Taxa de juros anual</S.TextSimulation>
            <S.TextInfoSimulation>
              {parcela?.taxaFinanciamentoAnual}% ao ano
            </S.TextInfoSimulation>
          </S.ContentBoxSimulation>
          <S.ContentBoxSimulation>
            <S.TextSimulation>IOF</S.TextSimulation>
            <S.TextInfoSimulation>
              {" "}
              {`${formatarDinheiro(parcela?.valorIof)} `}
            </S.TextInfoSimulation>

            <S.TextSimulation>CET mensal</S.TextSimulation>
            <S.TextInfoSimulation>
              {parcela?.valorPercentualCetMensal}% ao mês
            </S.TextInfoSimulation>

            <S.TextSimulation>CET anual</S.TextSimulation>
            <S.TextInfoSimulation>
              {parcela?.valorPercentualCetAnual}% ao ano
            </S.TextInfoSimulation>
          </S.ContentBoxSimulation>
        </S.ContainerBoxSimulation>
      </div>

      <div className="grid grid-cols-1 align-end">
        <S.LabelTitleSimulation>Total a pagar</S.LabelTitleSimulation>
        <S.StepDivider />
        <S.ContentBoxSimulation>
          <S.TextSimulation>
            {parcela?.quantidadeParcelas + "x de "}
            {formatarDinheiro(parcela?.valorParcelaSemSeguro)}
          </S.TextSimulation>
          <S.TextSimulation>{`${formatarDinheiro(
            parcela?.valorParcelaSemSeguro * parcela?.quantidadeParcelas
          )} `}</S.TextSimulation>
        </S.ContentBoxSimulation>
      </div>
      <S.InforBox>
        <S.LabelTitleSimulation>Periodo de carência</S.LabelTitleSimulation>
        <S.TextSimulation>
          Caso aprovada a proposta possui carência de 30 dias, com data da 1ª
          parcela prevista para{" "}
          {formatarData(simulacao?.dataMinimaCarenciaFinanciamento)}
        </S.TextSimulation>
      </S.InforBox>
    </div>
  )
}
