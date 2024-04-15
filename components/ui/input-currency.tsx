import * as React from "react"
import { Controller } from "react-hook-form"
import CurrencyInput from 'react-currency-input-field';
import styled from "styled-components"

import { cn } from "@/lib/utils"

export interface ControlledInputProps extends InputCurrencyProps {
  controlName: any
  control: any
  errors: any
}
export interface InputCurrencyProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const InputShadcn = React.forwardRef<HTMLInputElement, InputCurrencyProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

InputShadcn.displayName = "InputCurrency"

const StyledInput = styled(InputShadcn)``

export default function InputCurrency(props: ControlledInputProps) {
  const { control, controlName, errors, ...rest } = props

  return (
        <Controller
          name={controlName}
          control={control}
          render={({ field }) => (
            console.log(field.value),
            <CurrencyInput
              id="input-example"
              name="input-name"
              prefix=" R$ "
              placeholder="Digite seus valores aqui"
              defaultValue={0}
              decimalsLimit={2}
              value={field.value}
            />
          )}
        />
  )
}

export { InputCurrency }