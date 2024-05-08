"use client"

import { useEffect, useState } from "react"
import { DevTool } from "@hookform/devtools"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { pt } from "yup-locales"

import Input from "@/components/ui/input"
import InputCurrency from "@/components/ui/input-currency"
import MultSteps from "@/components/multSteps/multSteps"

import * as S from "./styles"

yup.setLocale(pt)

const schema = yup
  .object({
    inputCurrency: yup.string().required(),
  })
  .required()

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1)
  const { register, watch, handleSubmit, setValue, formState, control } =
    useForm<any>({
      resolver: yupResolver(schema),
    })
  const form = watch()
  const { errors } = formState

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }

  useEffect(() => {
    register("inputCurrency")
  }, [register])

  return (
    <S.Container>
      <div>
        <form>
          <InputCurrency
            control={control}
            errors={errors}
            controlName="inputCurrency"
            type="text"
          />
        </form>
        <S.NextButton onClick={handleNextStep}>Next</S.NextButton>
        <S.NextButton onClick={handlePrevStep}>Prev</S.NextButton>
      </div>
      <DevTool control={control} />
    </S.Container>
  ) 
}
