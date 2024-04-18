import React from 'react';
import * as S from './styles';

const ResumePage = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => (
    <div ref={ref} {...props} className="grid gap-4">
      <div>
        <S.LabelTitleSimulation>Valor solicitado</S.LabelTitleSimulation>
        <S.StepDivider />
        <S.ContainerBoxSimulation>
          <S.ContentBoxSimulation>
            <S.TextSimulation>Valor solicitado</S.TextSimulation>
            <S.TextInfoSimulation>R$ 20.000,00</S.TextInfoSimulation>
          </S.ContentBoxSimulation>
          <S.ContentBoxSimulation>
            <S.TextSimulation>Valor total do crédito</S.TextSimulation>
            <S.TextInfoSimulation>R$ 20.223,00</S.TextInfoSimulation>
          </S.ContentBoxSimulation>
        </S.ContainerBoxSimulation>
        <S.ContentBoxSimulation>
          <S.TextSimulation>Valor da entrada</S.TextSimulation>
          <S.TextInfoSimulation>R$ 0,00</S.TextInfoSimulation>
        </S.ContentBoxSimulation>
      </div>

      <div>
        <S.LabelTitleSimulation>Prazos e parcelas</S.LabelTitleSimulation>
        <S.StepDivider />
        <S.ContentBoxSimulation>
          <S.TextSimulation>Vencimento</S.TextSimulation>
          <S.TextInfoSimulation>1ª parcela 18/05/2024 "(daqui a 30 dias)"</S.TextInfoSimulation>
        </S.ContentBoxSimulation>
        <S.ContainerBoxSimulation>
          <S.ContentBoxSimulation>
            <S.TextSimulation>quantidade de parcelas</S.TextSimulation>
            <S.TextInfoSimulation>24 vezes</S.TextInfoSimulation>
          </S.ContentBoxSimulation>
          <S.ContentBoxSimulation>
            <S.TextSimulation>Valor da entrada</S.TextSimulation>
            <S.TextInfoSimulation>R$ 2.000,00</S.TextInfoSimulation>
          </S.ContentBoxSimulation>
        </S.ContainerBoxSimulation>
      </div>

      <div>
        <S.LabelTitleSimulation>Taxas e impostos</S.LabelTitleSimulation>
        <S.StepDivider />
        <S.ContainerBoxSimulation>
          <S.ContentBoxSimulation>
            <S.TextSimulation>Valor solicitado</S.TextSimulation>
            <S.TextInfoSimulation>R$ 20.000,00</S.TextInfoSimulation>
          </S.ContentBoxSimulation>
          <S.ContentBoxSimulation>
            <S.TextSimulation>Valor total do crédito</S.TextSimulation>
            <S.TextInfoSimulation>R$ 20.223,00</S.TextInfoSimulation>
          </S.ContentBoxSimulation>
        </S.ContainerBoxSimulation>
      </div>

      <div className="grid grid-cols-1">
        <S.LabelTitleSimulation>Total a pagar</S.LabelTitleSimulation>
        <S.StepDivider />
        <S.ContentBoxSimulation>
          <S.TextSimulation>24x de R$ 2.000,00</S.TextSimulation>
          <S.TextSimulation>R$ 48.000,00</S.TextSimulation>
        </S.ContentBoxSimulation>
      </div>
      <S.InforBox>
        <S.LabelTitleSimulation>Periodo de carência</S.LabelTitleSimulation>
        <S.TextSimulation>
          Caso aprovada a proposta possui carência de 30 dias, com data da 1ª parcela prevista para 18/05/2024
        </S.TextSimulation>
      </S.InforBox>
    </div>
  )
);

export { ResumePage };
