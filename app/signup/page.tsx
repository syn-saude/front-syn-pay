"use client"

import { useState } from "react"
import * as S from "./styles"
import MultSteps from "@/components/multSteps/multSteps"

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  return (
  <S.Container>
      <MultSteps currentStep={currentStep} qtdSteps={8} />
      <S.NextButton onClick={handleNextStep}>Next</S.NextButton>
  </S.Container>
  )
}
