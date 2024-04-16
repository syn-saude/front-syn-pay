import * as React from "react"
import { Controller } from "react-hook-form"
import InputMask from "react-input-mask"
import styled from "styled-components"

import { cn } from "@/lib/utils"

export interface ControlledInputProps extends InputProps {
  controlName: any
  control: any
  errors: any
  mask?: string
}
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputShadcn = React.forwardRef<HTMLInputElement, InputProps>(
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

InputShadcn.displayName = "Input"

const StyledInput = styled(InputShadcn)``

export default function Input(props: ControlledInputProps) {
  const { control, controlName, errors, mask, ...rest } = props

  const msgError = () => errors[controlName]?.message
  const isValid = () => !msgError()

  return (
    <>
      {!!mask ? (
        <Controller
          name={controlName}
          control={control}
          render={({ field }) => (
            <InputMask
              mask={mask}
              className={cn(
                "flex h-9 w-full rounded-md border border-input  bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                `${
                  !isValid()
                    ? "border-red-500 focus-visible:ring-red-100 text-red-500"
                    : ""
                } ${props.className}`
              )}
              {...field}
              {...rest}
            />
          )}
        />
      ) : (
        <Controller
          name={controlName}
          control={control}
          render={({ field }) => (
            <StyledInput
              className={`${
                !isValid()
                  ? "border-red-500 focus-visible:ring-red-100 text-red-500"
                  : ""
              }`}
              {...field}
              {...rest}
            />
          )}
        />
      )}
      {!isValid() && (
        <span className="text-sm font-medium text-red-500">{msgError()}</span>
      )}
    </>
  )
}

export { Input }
