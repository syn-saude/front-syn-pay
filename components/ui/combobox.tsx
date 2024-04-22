"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Controller, FieldErrors } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface IOptionCombobox {
  id?: string | number
  label: string
  value: any
}
interface IProps {
  placeholder?: string
  className?: string
  value?: any
  isInvalid?: boolean
  textNotFound?: string
  options?: IOptionCombobox[]
  onValueChange?: (value: any) => void
}

interface IControlledProps extends IProps {
  controlName: string
  control: any
  errors: any
}

export function Combobox({
  onValueChange = () => {},
  options = [],
  placeholder = "Selecione",
  textNotFound = "Nenhum resultado encontrado.",
  value = "",
  isInvalid,
  className,
}: IProps) {
  const [open, setOpen] = React.useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [valueSelected, setValueSelected] = React.useState<string>(value)

  useEffect(() => {
    //se for a primeira vez e zerado
    if (!value && !valueSelected) {
      return
    }
    onValueChange(valueSelected)
  }, [valueSelected])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between ${
            isInvalid && "border-red-500 text-red-500"
          } ${className}`}
        >
          {valueSelected
            ? options.find(
                (o) =>
                  o.value?.toLowerCase() ===
                  valueSelected?.toString()?.toLowerCase()
              )?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        key={"chave" + buttonRef.current?.offsetWidth}
        className={`w-[${buttonRef.current?.offsetWidth}px] p-0`}
      >
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>{textNotFound}</CommandEmpty>
          <CommandGroup className="max-h-[200px]  overflow-y-scroll">
            {options.map((o) => (
              <CommandItem
                key={o.value}
                value={o.value}
                onSelect={(currentValue: any) => {
                  let v = currentValue === valueSelected ? "" : currentValue
                  // onValueChange(v)
                  setValueSelected(
                    currentValue === valueSelected ? "" : currentValue
                  )
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    valueSelected === o.value?.toLowerCase()
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {o.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export function ComboboxControlled({
  control,
  controlName,
  errors,
  ...props
}: IControlledProps) {
  return (
    <Controller
      name={controlName}
      control={control}
      render={({ field }) => (
        <>
          <Combobox
            key={field.value}
            onValueChange={field.onChange}
            value={field.value}
            isInvalid={!!errors?.[controlName]}
            {...props}
          />
          {!!errors?.[controlName] && (
            <span className="text-sm font-medium text-red-500">
              {errors?.[controlName]?.message}
            </span>
          )}
        </>
      )}
    />
  )
}
