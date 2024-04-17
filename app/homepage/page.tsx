"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { DevTool } from "@hookform/devtools"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Bird,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Rabbit,
  ShoppingCart,
  Users,
} from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { pt } from "yup-locales"

import { ESTADOS } from "@/config/const/common/states"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Combobox } from "@/components/ui/combobox"
import Input from "@/components/ui/input"
import InputCurrency from "@/components/ui/input-currency"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import MultSteps from "@/components/multSteps/multSteps"
import withAuth from "@/components/with-auth"

// import * as S from "./styles"

yup.setLocale(pt)
//#region SCHEMA
const schema = yup
  .object({
    //Step 1
    nome: yup.string().required().label("Nome"),
    telefone: yup.string().required().label("Telefone"),
    email: yup.string().email().required().label("E-mail"),
    uf: yup.string().required(),
    //Step 2
    procedimento: yup.string().required(),
    possuiPedidoMedico: yup.boolean().required(),
    //Step 3
    valorSolicitado: yup.number().required(),
    renda: yup.number().required(),
    //Step 4
    cpf: yup.string().required(),
    dataNascimento: yup.string().required(),
  })
  .required()
//#endregion

interface FinanciamentoRequest {
  //Step 1
  nome: string
  telefone: string
  email: string
  uf: string
  //Step 2
  procedimento: string //Objeto Id Descricao
  possuiPedidoMedico: boolean
  //Step 3
  valorSolicitado: number
  renda: number
  //Step 4
  cpf: string
  dataNascimento: string
}
//#region ETAPAS
export enum ETAPAS_FINANCIAMENTO {
  proponente = "proponente",
  procedimento = "procedimento",
  valores = "valores",
}
const etapas = [
  {
    step: ETAPAS_FINANCIAMENTO.proponente,
    titulo: "Dados do proponente",
    descricao: "Informe os dados de contato",
    validacao: ["nome", "telefone", "email", "uf"],
    ativo: true,
  },
  {
    step: ETAPAS_FINANCIAMENTO.procedimento,
    titulo: "Tipo de procedimento",
    descricao: "",
    validacao: ["possuiPedidoMedico"],
    ativo: true,
  },
  {
    step: ETAPAS_FINANCIAMENTO.valores,
    titulo: "Valores",
    descricao: "",
    validacao: ["valorSolicitado", "renda"],
    ativo: true,
  },
]
//#endregion
function Add() {
  const [currentStep, setCurrentStep] = useState(0)

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    trigger,
    formState,
    control,
  } = useForm<FinanciamentoRequest>({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {},
  })
  const form = watch()
  const { errors } = formState

  const handleNextStep = async () => {
    var isValid = await trigger(obterEtapaAtual().validacao as any)

    if (!isValid) {
      return
    }

    setCurrentStep((prevStep) => prevStep + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }

  function obterEtapasAtivas() {
    return etapas.filter((e) => e.ativo)
  }

  function obterEtapaAtual() {
    return etapas[currentStep]
  }

  useEffect(() => {
    // register("inputCurrency")
  }, [register])
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="container flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Financiamentos</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Todos Financiamentos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4  md:gap-8 md:p-10">
          {/* <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Settings</h1>
          </div> */}
          <div className="mx-auto grid w-full  items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <nav
              className="grid gap-4 text-sm text-muted-foreground"
              x-chunk="dashboard-04-chunk-0"
            >
              <MultSteps
                title={obterEtapaAtual().titulo}
                subTitle={obterEtapaAtual().descricao}
                currentStep={currentStep}
                qtdSteps={obterEtapasAtivas().length}
              />

              <DevTool control={control} />
            </nav>
            <div className="grid gap-6 ">
              <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                  <CardTitle>{obterEtapaAtual().titulo}</CardTitle>
                  <CardDescription>
                    {obterEtapaAtual().descricao}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    {
                      //#region ETAPA 1
                    }
                    <div
                      className={`${
                        obterEtapaAtual().step !==
                          ETAPAS_FINANCIAMENTO.proponente && "hidden"
                      } grid gap-6`}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-3 ">
                          <Label>Nome completo</Label>
                          <Input
                            errors={errors}
                            control={control}
                            controlName="nome"
                            placeholder="Informe seu nome"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label>Telefone</Label>
                          <Input
                            errors={errors}
                            control={control}
                            mask="(99) 99999-9999"
                            controlName="telefone"
                            placeholder="Informe seu nome"
                          />
                        </div>
                      </div>
                      <div className="grid gap-3">
                        <Label>E-mail</Label>
                        <Input
                          errors={errors}
                          control={control}
                          controlName="email"
                          placeholder="Informe seu nome"
                        />
                      </div>
                      <Controller
                        name="uf"
                        control={control}
                        render={({ field }) => (
                          <Combobox
                            options={ESTADOS.map((e) => {
                              return {
                                label: e.Initials.toUpperCase(),
                                value: e.Initials.toUpperCase(),
                              }
                            })}
                            value={field.value}
                            placeholder="Selecione UF"
                            onValueChange={(value) => setValue("uf", value)}
                          />
                        )}
                      />
                      {/* <div className="grid gap-3">
                        <Label>UF</Label>
                        <Controller
                          name="uf"
                          control={control}
                          render={({ field }) => (
                            <>
                              <Select
                                onValueChange={(value) => setValue("uf", value)}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Selecione a UF" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>UF</SelectLabel>
                                    {ESTADOS.map((e) => (
                                      <SelectItem value={e.Initials}>
                                        {e.Initials}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              {!!errors?.uf && (
                                <span className="text-sm font-medium text-red-500">
                                  {errors?.uf?.message}
                                </span>
                              )}
                            </>
                          )}
                        />
                      </div> */}
                    </div>
                    {
                      //#endregion
                    }
                    {
                      //#region ETAPA 2
                    }
                    <div
                      className={`${
                        obterEtapaAtual().step !==
                          ETAPAS_FINANCIAMENTO.procedimento && "hidden"
                      } grid gap-6`}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-3 ">
                          <Label>Nome completo</Label>
                          <Input
                            errors={errors}
                            control={control}
                            controlName="nome"
                            placeholder="Informe seu nome"
                          />
                        </div>
                      </div>
                    </div>
                    {
                      //#endregion
                    }
                  </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4 gap-4">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handlePrevStep}
                  >
                    Voltar
                  </Button>
                  <Button size="sm" onClick={handleNextStep}>
                    Continuar
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default withAuth(<Add />)
// export default Add
