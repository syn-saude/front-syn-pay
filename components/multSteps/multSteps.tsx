import React, { useState } from "react"
import { Check } from "lucide-react"

import { IStepProps } from "./multStepsInterface"
import * as S from "./styles"

export default function MultSteps({ currentStep, qtdSteps }: IStepProps) {
  return (
    <S.Container>
      {[...Array(qtdSteps)].map((_, index) => {
        const stepNumber = index + 1
        const isCurrentStep = stepNumber === currentStep
        const isConfirmated = stepNumber < currentStep

        return (
          <S.StepContainer key={stepNumber}>
            <S.StepContent>
              {isCurrentStep ? (
                <S.StepActive>{stepNumber}</S.StepActive>
              ) : (
                <S.StepNumber isNext={isConfirmated}>
                  {isConfirmated ? (
                    <Check color="var(--white)" strokeWidth={3.5} size={16} />
                  ) : (
                    stepNumber
                  )}
                </S.StepNumber>
              )}
              {stepNumber < 8 && <S.StepDivider />}
            </S.StepContent>
            <S.StepLabel>Step {stepNumber}</S.StepLabel>
          </S.StepContainer>
        )
      })}
    </S.Container>
  )
}
