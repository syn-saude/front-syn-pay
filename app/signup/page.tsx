"use client"

import { useEffect, useState } from "react"
import * as S from "./styles"
import MultSteps from "@/components/multSteps/multSteps"
import InputCurrency from "@/components/ui/input-currency"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { pt } from "yup-locales"
import Input from "@/components/ui/input"
import { DevTool } from "@hookform/devtools"

yup.setLocale(pt)

const schema = yup
  .object({
    inputCurrency: yup.string().required(),
  })
  .required()

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, watch, handleSubmit, setValue, formState, control } =
    useForm<any>({
      resolver: yupResolver(schema),
    })
  const form = watch()
  const { errors } = formState
  console.log(form.inputCurrency)

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  }
  
  useEffect(() => {
    register("inputCurrency")
  }, [register])
  console.log(form)

  return (
    <S.Container>

      <MultSteps currentStep={currentStep} qtdSteps={8} />
      <div>
        <S.NextButton onClick={handleNextStep}>Next</S.NextButton>
        <S.NextButton onClick={handlePrevStep}>Prev</S.NextButton>
        <InputCurrency 
          control={control}
          errors={errors}
          controlName="inputCurrency"
          type="text"
          />
        <form>
        </form>
      
      </div>
      <DevTool control={control} />
    </S.Container>
  )
}
