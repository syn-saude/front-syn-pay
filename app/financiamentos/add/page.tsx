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
  Angry,
  Frown,
} from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { pt } from "yup-locales"

import { APROVADOS } from "@/config/const/common/aprovados"
import { PROCEDIMENTOS } from "@/config/const/common/procedimentos"
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
import { Combobox, ComboboxControlled } from "@/components/ui/combobox"
import Input from "@/components/ui/input"
import InputCurrency from "@/components/ui/input-currency"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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

import CardValorLiberado from "./cardValorLiberado"
import * as S from "./styles"

yup.setLocale(pt)
//#region SCHEMA
const schema = yup
  .object({
    //Step 1
    nome: yup.string().required().label("Nome"),
    telefone: yup.string().required().label("Telefone"),
    cpf: yup.string().required().label("CPF"),
    dataNascimento: yup.string().required().label("Data de nascimento"),
    email: yup.string().email().required().label("E-mail"),
    uf: yup.string().required().label("UF"),
    //Step 2
    procedimento: yup.string().required().label("Procedimento"),
    valorSolicitado: yup.number().required().label("Valor solicitado"),
    renda: yup.number().required().label("Renda"),
    //Step 3
    detalhes: yup.number().required().label("Valor aprovado"),
  })
  .required()
//#endregion

interface FinanciamentoRequest {
  //Step 1
  nome: string
  telefone: string
  cpf: string
  dataNascimento: string
  email: string
  uf: string
  //Step 2
  procedimento: string
  valorSolicitado: number
  renda: number
  //Step 3
  detalhes: any
}
//#region ETAPAS
enum ETAPAS_FINANCIAMENTO {
  proponente = "proponente",
  valores = "valores",
  valorAprovados = "valorAprovados",
}
const etapas = [
  {
    step: ETAPAS_FINANCIAMENTO.proponente,
    titulo: "Dados do proponente",
    descricao: "Informe os dados de contato",
    validacao: ["nome", "telefone", "cpf", "dataNascimento", "email", "uf"],
    ativo: true,
  },
  {
    step: ETAPAS_FINANCIAMENTO.valores,
    titulo: "De quanto você precisa?",
    descricao: "",
    validacao: ["procedimento","valorSolicitado", "renda"],
    ativo: true,
  },
  {
    step: ETAPAS_FINANCIAMENTO.valorAprovados,
    titulo: "Propostas pré-aprovados",
    descricao: "",
    validacao: ["detalhes"],
    ativo: true,
  },
]
//#endregion
function Add() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isHovered, setIsHovered] = useState(null)
  const [aprovado, setAprovado] = useState(true)
  const [reprovado, setReprovado] = useState(false)

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

  const handleFirstStep = () => {
    setCurrentStep(0)
  }

  const handleNextStep = async () => {
    var isValid = await trigger(obterEtapaAtual().validacao as any)

    if (!isValid) {
      return
    }

    setCurrentStep((prevStep) => prevStep + 1)
  }

  const handlePrevStep = () => {
    if (currentStep <= 0) {
      return
    }
    setCurrentStep((prevStep) => prevStep - 1)
  }

  function obterEtapasAtivas() {
    return etapas.filter((e) => e.ativo)
  }

  function obterEtapaAtual() {
    return etapas[currentStep]
  }

  useEffect(() => {
    register("detalhes")
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
          <div className="mx-auto grid w-full  items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            {
              //#region STEPPER
            }
            <nav
              className="grid gap-4 text-sm text-muted-foreground"
              x-chunk="dashboard-04-chunk-0"
            >
              <MultSteps
                steps={obterEtapasAtivas().map((e) => {
                  return { title: e.titulo, subTitle: e.descricao }
                })}
                currentStep={currentStep}
                qtdSteps={obterEtapasAtivas().length}
              />

              <DevTool control={control} />
            </nav>
            {
              //#endregion
            }
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
                      } grid gap-6 md:max-w-[600px]`}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3">
                          <Label>Nome completo</Label>
                          <Input
                            errors={errors}
                            control={control}
                            controlName="nome"
                            placeholder="Informe seu nome"
                          />
                        </div>

                        <div className="flex flex-col gap-3 ">
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
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-3 ">
                          <Label>Informe os numeros do seu CPF</Label>
                          <Input
                            errors={errors}
                            control={control}
                            controlName="cpf"
                            mask="999.999.999-99"
                            placeholder="CPF"
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <Label>Informe sua data de nascimento</Label>
                          <Input
                            errors={errors}
                            control={control}
                            controlName="dataNascimento"
                            mask="99/99/9999"
                            placeholder="Data de nascimento"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-3">
                          <Label>E-mail</Label>
                          <Input
                            errors={errors}
                            control={control}
                            controlName="email"
                            placeholder="Informe seu nome"
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <Label>Em qual estado o cliente mora?</Label>
                          <ComboboxControlled
                            options={ESTADOS.map((p) => {
                              return {
                                label: p.Initials,
                                value: p.Initials,
                                id: p.Id,
                              }
                            })}
                            control={control}
                            controlName="uf"
                            errors={errors}
                            placeholder="Selecione a UF"
                          />
                        </div>
                      </div>
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
                          ETAPAS_FINANCIAMENTO.valores && "hidden"
                      } grid gap-6`}
                    >
                      <div className="flex flex-col gap-3">
                          <Label>Procedimento desejado</Label>
                          <Input
                            errors={errors}
                            control={control}
                            controlName="procedimento"
                            placeholder="Informe seu procedimento"
                          />
                        </div>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col gap-3 ">
                          <Label>De quanto você precisa?</Label>
                          <Input
                            money
                            errors={errors}
                            control={control}
                            controlName="valorSolicitado"
                            placeholder="Informe o valor solicitado!"
                          />
                        </div>
                        <div className="flex flex-col gap-3 ">
                          <Label>Qual é o valor da sua renda?</Label>
                          <Input
                            money
                            errors={errors}
                            control={control}
                            controlName="renda"
                            placeholder="Informe o valor da sua renda!"
                          />
                        </div>
                      </div>
                    </div>
                    {
                      //#endregion
                    }
                    {
                      //#region ETAPA 3
                    }
                    <div
                      className={`${
                        obterEtapaAtual().step !==
                          ETAPAS_FINANCIAMENTO.valorAprovados && "hidden"
                      } grid gap-6`}
                    >
                    { aprovado && (

                      <div className="grid grid-cols-1 gap-3 ">
                        {APROVADOS.map((item, index) => (
                          <CardValorLiberado
                            key={index}
                            selecionado={form.detalhes == item.Id}
                            onValueChange={() =>
                              setValue("detalhes", item.Id)
                            }
                            opcao={item}
                            parcelas={item.Obs}
                            valorLiberado={item.Price}
                          />
                        ))}
                      </div>
                      )}
                      {
                        reprovado && (
                          <div className="grid grid-cols-1 gap-8 justify-items-center">

                            <Frown strokeWidth={1.1} size={70} color="#ff6c2e"/>
                            <div className="grid grid-cols-1 gap-8 w-[420px] ">

                            <S.LabelNotAprov>Infelizmente não encontramos propostas disponíveis.</S.LabelNotAprov>
                            <S.LabelNotAprov>Deseja realizar uma nova sumulação com outro CPF?</S.LabelNotAprov>
                            </div>

                            <S.ButtonNewSimulation onClick={handleFirstStep}>Sim, Simular com outro CPF!</S.ButtonNewSimulation>
                          </div>
                        )
                      }
                    </div>
                    {
                      //#endregion ff6c2e
                    }
                  </form>
                </CardContent>
                {(currentStep !== 2 || !reprovado) && (

                  <CardFooter className="border-t px-6 py-4 gap-4">
                    {currentStep > 0 && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={handlePrevStep}
                      >
                        Voltar
                      </Button>
                    )}
                    <Button size="sm" onClick={handleNextStep}>
                      Continuar
                    </Button>
                  </CardFooter>
                )}
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
