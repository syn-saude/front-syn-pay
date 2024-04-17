import React, { useState } from "react"
import { Check } from "lucide-react"

import useWindowDimensions from "@/hooks/useWindowDimensions"

import { IStepProps } from "./multStepsInterface"
import * as S from "./styles"

export default function MultSteps({
  steps,
  currentStep,
  qtdSteps,
}: IStepProps) {
  const { width } = useWindowDimensions()
  const isMobile = width && width < 600

  const [progress, setProgress] = useState(0)

  React.useEffect(() => {
    const newProgress = (currentStep / qtdSteps) * 100
    setProgress(newProgress)
  }, [currentStep, qtdSteps])

  return (
    <>
      {isMobile ? (
        <S.progressContainer>
          <S.StepNumberMobile>{`Passo ${currentStep} de ${qtdSteps}`}</S.StepNumberMobile>
          <S.ProgressBarContainer>
            <S.ProgressBar style={{ width: `${progress}%` }} />
          </S.ProgressBarContainer>
        </S.progressContainer>
      ) : (
        <S.Container>
          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isCurrentStep = index === currentStep
            const isConfirmated = index < currentStep

            return (
              <S.StepContainer key={stepNumber}>
                <S.StepContent>
                  {isCurrentStep ? (
                    <S.StepActive>{stepNumber}</S.StepActive>
                  ) : (
                    <S.StepNumber isNext={isConfirmated}>
                      {isConfirmated ? (
                        <Check
                          color="var(--white)"
                          strokeWidth={3.5}
                          size={16}
                        />
                      ) : (
                        stepNumber
                      )}
                    </S.StepNumber>
                  )}
                  {stepNumber < qtdSteps && <S.StepDivider />}
                </S.StepContent>
                <div className="flex flex-col">
                  <S.StepLabel
                    className={`${
                      isCurrentStep
                        ? "text-foreground"
                        : "text-muted-foreground"
                    } `}
                  >
                    {step.title}
                  </S.StepLabel>
                  <span className="text-sm text-muted-foreground">
                    {step.subTitle}
                  </span>
                </div>
              </S.StepContainer>
            )
          })}
        </S.Container>
      )}
    </>
  )
}
