import formatarDinheiro from "@/utils/formatacoes/formatarDinheiro"
import moment from "moment"

import { ParcelaBV, SimulacaoResponse } from "./types"

interface IResumoSimulacao {
  parcelaSelecionada: ParcelaBV
  condicoes: SimulacaoResponse
}

export function ResumoSimulacao({
  parcelaSelecionada,
  condicoes,
}: IResumoSimulacao) {
  return (
    <div>
      <p>
        <b>Resumo da simulação em {parcelaSelecionada?.quantidadeParcelas}x</b>
      </p>
      <div
        className="box-resumo"
        style={{ border: "1px solid #ddd", borderRadius: "8px" }}
      >
        <div>
          <div>
            {/* <div   xs={3}>
          <p  >
            <small>Valor total da proposta</small>
            <br />
            {formatarDinheiro(30000)}
          </p>
        </div> */}
            <div>
              <p>
                <small>Valor solicitado</small>
                <br />
                {formatarDinheiro(parcelaSelecionada?.valorLiberado)}
              </p>
            </div>
            <div>
              <p>
                <small>Valor da entrada</small>
                <br />
                {formatarDinheiro(0)}
              </p>
            </div>
            <div>
              <p>
                <small>Valor total do crédito</small>
                <br />
                {formatarDinheiro(
                  parcelaSelecionada?.valorFinanciamentoSemSeguro +
                    parcelaSelecionada?.valorIof
                )}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div>
            <p>
              <b>Prazos e parcelas</b>
            </p>
            <hr />
          </div>

          <div>
            <div>
              <p>
                <small>Vencimento</small>
                <br />
                1ª parcela{" "}
                {moment(
                  condicoes?.dataMinimaCarenciaFinanciamento,
                  "YYYY-MM-DD"
                ).format("DD/MM/YYYY")}{" "}
                (daqui a 30 dias)
              </p>
            </div>
            <div>
              <p>
                <small>Valor da parcela</small>
                <br />
                {formatarDinheiro(parcelaSelecionada?.valorParcelaSemSeguro)}
              </p>
            </div>
            <div>
              <p>
                <small>Quantidade de parcelas</small>
                <br />
                {parcelaSelecionada?.quantidadeParcelas} vezes
              </p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p>
              <b>Taxas e impostos</b>
            </p>
            <hr />
          </div>
          <div>
            <div>
              <p>
                <small>Tarifa de cadastro</small>
                <br />
                {parcelaSelecionada?.listaDadosCustoFinanciamento?.find(
                  (c: any) => c?.custoFinanciamento?.codigo === 6
                )?.somaCusto
                  ? formatarDinheiro(
                      parcelaSelecionada?.listaDadosCustoFinanciamento?.find(
                        (c: any) => c?.custoFinanciamento?.codigo === 6
                      )?.valorCusto
                    )
                  : "Isento"}
                {/* Isento */}
              </p>
            </div>
            <div>
              <p>
                <small>Taxa de juros mensal</small>
                <br />
                {parcelaSelecionada?.taxaFinanciamentoMensal}% ao mês
              </p>
            </div>
            <div>
              <p>
                <small>Taxa de juros anual</small>
                <br />
                {parcelaSelecionada?.taxaFinanciamentoAnual}% ao ano
              </p>
            </div>
            <div>
              <p>
                <small>IOF</small>
                <br />
                {`${formatarDinheiro(parcelaSelecionada?.valorIof)} `}
                {/* (2.85%) */}
              </p>
            </div>
            <div>
              <p>
                <small>CET mensal</small>
                <br />
                {parcelaSelecionada?.valorPercentualCetMensal}% ao mês
              </p>
            </div>
            <div>
              <p>
                <small>CET anual</small>
                <br />
                {parcelaSelecionada?.valorPercentualCetAnual}%
              </p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <hr />
          </div>
          <div>
            <div>
              <p>
                <small>Total a pagar:</small>
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p>
                <b>
                  {parcelaSelecionada?.quantidadeParcelas}x de{" "}
                  {formatarDinheiro(parcelaSelecionada?.valorParcelaSemSeguro)}
                </b>
                <br />
                <small>
                  {`${formatarDinheiro(
                    parcelaSelecionada?.valorParcelaSemSeguro *
                      parcelaSelecionada?.quantidadeParcelas
                  )} `}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
