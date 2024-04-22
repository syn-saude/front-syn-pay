"use client"

import { SetStateAction, useEffect, useState } from "react"
import Link from "next/link"
import { setupAPIClient } from "@/services/api"
import { obterCep } from "@/services/cep"
import { salvarFinanciamento } from "@/services/financiamentos"
import { DevTool } from "@hookform/devtools"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Frown,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  ShoppingCart,
  Users,
} from "lucide-react"
import moment from "moment"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { pt } from "yup-locales"

import {
  BV_ESTADO_CIVIL,
  BV_NACIONALIDADE,
  BV_PROFISSOES,
  BV_SITUACAO_IMOVEL,
  BV_TIPOS_PROFISSOES,
} from "@/config/const/bv/dominio"
import { APROVADOS } from "@/config/const/common/aprovados"
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
import { ComboboxControlled } from "@/components/ui/combobox"
import Input from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ParcelaBV, SimulacaoResponse } from "@/components/ui/resume-page/types"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import MultSteps from "@/components/multSteps/multSteps"
import withAuth from "@/components/with-auth"

import CardValorLiberado from "./cardValorLiberado"
import * as S from "./styles"
import { useRouter } from 'next/navigation'
// import Router from "next/router"
import ResumePage from "@/components/ui/resume-page/resumePage"

yup.setLocale(pt)
//#region SCHEMA
const schema = yup
  .object({
    //Step 1
    id: yup.string().nullable().label("Nome"),
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
    qtdParcelas: yup.number().required().label("Valor aprovado"),
    //Step 4
    //visualizar arquivo de validação
    //Step 5
    nacionalidade: yup.string().required().label("Nacionalidade"),
    estadoCivil: yup.number().required().label("Estado civil"),
    rg: yup.string().required().label("Identidade"),
    sexo: yup.string().label("Gênero"),
    nomeMae: yup.string().required().label("Nome da mãe"),
    patrimonio: yup.number().required().label("Valor do Patrimônio"),
    //Step 6
    cep: yup.string().required().label("CEP"),
    endereco: yup.string().required().label("Endereço"),
    estado: yup.string().required().label("UF Residencial"),
    bairro: yup.string().required().label("Bairro"),
    cidade: yup.string().required().label("Cidade"),
    complemento: yup.string().label("Complemento"),
    numero: yup.string().required().label("Número"),
    situacaoImovel: yup.number().required().label("Situação do imóvel"),
    //Step 7
    tipoProfissao: yup.number().required().label("Tipo de emprego"),
    profissao: yup.number().required().label("profissao"),
    anos: yup.number().required().label("Anos"),
    meses: yup.number().required().label("Meses"),
    //Step 8
    ciente: yup
      .boolean()
      .required()
      .oneOf([true], "Você precisa aceitar os termos"),
    //visualização e validação
  })
  .required()
//#endregion

interface FinanciamentoRequest {
  id?: string
  //Step 1
  nome: string
  telefone: string
  cpf: string
  dataNascimento: string
  uf: string
  email: string
  //Step 2
  procedimento: string
  valorSolicitado: number
  renda: number
  //Step 3
  qtdParcelas: number
  //Step 4
  //visualizar arquivo de validação
  //Step 5
  nacionalidade: string
  estadoCivil: number
  rg: string
  sexo: string
  nomeMae: string
  patrimonio: number
  //Step 6
  cep: string
  endereco: string
  estado: string
  bairro: string
  cidade: string
  complemento: string
  numero: string
  situacaoImovel: number
  //Step 7
  tipoProfissao: number
  profissao: number
  anos: number
  meses: number
  //Step 8
  ciente: boolean
  //visualização e validação
}
//#region ETAPAS
enum ETAPAS_FINANCIAMENTO {
  proponente = "proponente",
  valores = "valores",
  valorAprovados = "valorAprovados",
  resumoSimulacao = "resumoSimulacao",
  dadosPessoais = "dadosPessoais",
  residencia = "residencia",
  profissao = "profissao",
  resumoSolicitacao = "resumoSolicitacao",
}
const etapas = [
  {
    //step 1
    nuStep: 1,
    step: ETAPAS_FINANCIAMENTO.proponente,
    titulo: "Dados do proponente",
    descricao: "Informe os dados de contato",
    validacao: ["nome", "telefone", "cpf", "dataNascimento", "email", "uf"],
    ativo: true,
  },
  {
    //step 2
    nuStep: 2,
    step: ETAPAS_FINANCIAMENTO.valores,
    titulo: "De quanto você precisa?",
    descricao: "",
    validacao: ["procedimento", "valorSolicitado", "renda"],
    ativo: true,
  },
  {
    //step 3
    nuStep: 3,
    step: ETAPAS_FINANCIAMENTO.valorAprovados,
    titulo: "Propostas pré-aprovados",
    descricao: "",
    validacao: ["qtdParcelas"],
    ativo: true,
  },
  {
    //step 4
    nuStep: 4,
    step: ETAPAS_FINANCIAMENTO.resumoSimulacao,
    titulo: "Confira os detalhes da sua simulação",
    descricao: "",
    validacao: ["detalhes"],
    ativo: true,
  },
  {
    //step 5
    nuStep: 5,
    step: ETAPAS_FINANCIAMENTO.dadosPessoais,
    titulo: "Complete seus dados pessoais",
    descricao: "",
    validacao: [
      "nacionalidade",
      "estadoCivil",
      "rg",
      "sexo",
      "nomeMae",
      "patrimonio",
    ],
    ativo: true,
  },
  {
    //step 6
    nuStep: 6,
    step: ETAPAS_FINANCIAMENTO.residencia,
    titulo: "Qual é o seu endereço residencial?",
    descricao: "",
    validacao: [
      "cep",
      "endereco",
      "estado",
      "bairro",
      "cidade",
      "complemento",
      "numero",
      "situacaoImovel",
    ],
    ativo: true,
  },
  {
    //step 7
    nuStep: 7,
    step: ETAPAS_FINANCIAMENTO.profissao,
    titulo: "Informe seus dados profissionais",
    descricao: "",
    validacao: [
      "tipoProfissao",
      "profissao",
      // "rendaProfissional",
      "anos",
      "meses",
    ],
    ativo: true,
  },
  {
    //step 8
    nuStep: 8,
    step: ETAPAS_FINANCIAMENTO.resumoSolicitacao,
    titulo: "Revise o resumo da sua solicitação",
    descricao: "",
    validacao: ["ciente"],
    ativo: true,
  },
]
//#endregion
function Add() {
  const router = useRouter()
  // const router = useRouter()
  //#region USE STATE
  const [currentStep, setCurrentStep] = useState(7)
  const [id, setId] = useState("")
  const [aprovado, setAprovado] = useState(false)
  const [reprovado, setReprovado] = useState(false)

  const [respSimulacao, setRespSimulacao] = useState<SimulacaoResponse>()

  const [detailSimulacao, setDetailSimulacao] = useState<ParcelaBV>()
  // console.log("detailSimulacao", detailSimulacao)

  //#endregion

  //#region USE FORM
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
    resolver: yupResolver<FinanciamentoRequest>(schema as any),
    defaultValues: {},
  })
  const form = watch()
  const { errors } = formState
  const msgError = () => errors.ciente?.message
  const isValid = () => !msgError()

  //#endregion
  //#region Request Cep
  const handleCEPChange = async (event: any) => {
    const cep = event.target.value.replace(/\D/g, "")
    if (cep.length === 8) {
      try {
        const response = await obterCep(cep)
        const data = response.data
        setValue("cep", data.cep)
        setValue("estado", data.uf)
        setValue("cidade", data.localidade)
        setValue("endereco", data.logradouro)
        setValue("bairro", data.bairro)
        setValue("complemento", data.complemento)
      } catch (error) {
        console.error("Erro ao obter CEP:", error)
        setValue("cep", "")
        setValue("estado", "")
        setValue("cidade", "")
        setValue("endereco", "")
        setValue("bairro", "")
        setValue("complemento", "")
      }
    }
  }
  //#endregion

  //#region Request Envio
  async function handleCreateFinanciamento(event: React.FormEvent) {
    event.preventDefault()

    try {
      let body = {
        ...form,
        etapa: etapas[currentStep].nuStep,
        dataNascimento: moment(form.dataNascimento, "DD/MM/yyyy").format(
          "yyyy-MM-DD"
        ),
      } as FinanciamentoRequest
      if (id) {
        body.id = id
      }
      const response = await salvarFinanciamento(body)
      setId(response.data.id)
      if (etapas[currentStep].nuStep === 2) {
        setRespSimulacao(response.data.simulacao)
      }
    } catch (error) {
      console.error(error)
    }
  }
  //#endregion

  useEffect(() => {
    if (respSimulacao?.listaParcelas !== null) {
      setAprovado(true)
    } else {
      setReprovado(true)
    }
  }, []);

  useEffect(() => {
    const filteredSimulacao = respSimulacao?.listaParcelas?.filter((simulacao: ParcelaBV) => simulacao.quantidadeParcelas === form.qtdParcelas);
    setDetailSimulacao(filteredSimulacao as SetStateAction<ParcelaBV | undefined>);
    // console.log(filteredSimulacao)
  }, [form.qtdParcelas, respSimulacao]);

  const handleFirstStep = () => {
    setCurrentStep(0)
  }

  const handleNextStep = async (event: React.FormEvent<Element>) => {
    if (etapas[currentStep].nuStep <= 7) {
      handleCreateFinanciamento(event)
      var isValid = await trigger(obterEtapaAtual().validacao as any)
      if (!isValid) {
        return
      }
      setCurrentStep((prevStep) => prevStep + 1)
    }
  }

  function handleConfirm() {
    router.push('/financiamentos')
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
                <BreadcrumbLink>Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/financiamentos">Financiamentos</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Novo financiamento</BreadcrumbPage>
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
                      className={`${obterEtapaAtual().step !==
                        ETAPAS_FINANCIAMENTO.proponente && "hidden"
                        } grid gap-6 md:max-w-[600px]`}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <Label className="text-xs">Nome completo</Label>
                          <Input
                            errors={errors}
                            control={control}
                            controlName="nome"
                            placeholder="Informe seu nome"
                          />
                        </div>

                        <div className="flex flex-col gap-1 ">
                          <Label className="text-xs">Telefone</Label>
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
                        <div className="flex flex-col gap-1 ">
                          <Label className="text-xs">
                            Informe os numeros do seu CPF
                          </Label>
                          <Input
                            errors={errors}
                            control={control}
                            controlName="cpf"
                            mask="999.999.999-99"
                            placeholder="CPF"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <Label className="text-xs">
                            Informe sua data de nascimento
                          </Label>
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
                        <div className="flex flex-col gap-1">
                          <Label className="text-xs">E-mail</Label>
                          <Input
                            errors={errors}
                            control={control}
                            controlName="email"
                            placeholder="Informe seu nome"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <Label className="text-xs">
                            Em qual estado o cliente mora?
                          </Label>
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
                      className={`${obterEtapaAtual().step !==
                        ETAPAS_FINANCIAMENTO.valores && "hidden"
                        } grid gap-6`}
                    >
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs">Procedimento desejado</Label>
                        <Input
                          errors={errors}
                          control={control}
                          controlName="procedimento"
                          placeholder="Informe seu procedimento"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col gap-1 ">
                          <Label className="text-xs">
                            De quanto você precisa?
                          </Label>
                          <Input
                            money
                            errors={errors}
                            control={control}
                            controlName="valorSolicitado"
                            placeholder="Informe o valor solicitado!"
                          />
                        </div>
                        <div className="flex flex-col gap-1 ">
                          <Label className="text-xs">
                            Qual é o valor da sua renda?
                          </Label>
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
                      className={`${obterEtapaAtual().step !==
                        ETAPAS_FINANCIAMENTO.valorAprovados && "hidden"
                        } grid gap-6`}
                    >
                      {aprovado && (
                        <Controller
                          control={control}
                          name="qtdParcelas"
                          render={({ field }) => (
                            <div className="grid grid-cols-1 gap-2 ">
                              {respSimulacao?.listaParcelas?.map(
                                (item: ParcelaBV, index: number) => (
                                  <CardValorLiberado
                                    key={index}
                                    selecionado={
                                      form.qtdParcelas ===
                                      item.quantidadeParcelas
                                    }
                                    onValueChange={() =>
                                      setValue("qtdParcelas",
                                        item.quantidadeParcelas
                                      )
                                    }
                                    opcao={item}
                                  />
                                )
                              )}
                            </div>
                          )}
                        />
                      )}
                      {reprovado && (
                        <div className="grid grid-cols-1 gap-8 justify-items-center">
                          <Frown strokeWidth={1.1} size={70} color="#ff6c2e" />
                          <div className="grid grid-cols-1 gap-8 w-[420px] ">
                            <S.LabelNotAprov>
                              Infelizmente não encontramos propostas
                              disponíveis.
                            </S.LabelNotAprov>
                            <S.LabelNotAprov>
                              Deseja realizar uma nova sumulação com outro CPF?
                            </S.LabelNotAprov>
                          </div>

                          <Button
                            size="lg"
                            variant="default"
                            type="button"
                            onClick={handleFirstStep}
                          >
                            Sim, Simular com outro CPF!
                          </Button>
                        </div>
                      )}
                    </div>
                    {
                      //#endregion
                    }

                    {
                      //#region ETAPA 4
                    }
                    <div
                      className={`${obterEtapaAtual().step !==
                        ETAPAS_FINANCIAMENTO.resumoSimulacao && "hidden"
                        } grid gap-6`}
                    >
                      {detailSimulacao && <ResumePage parcela={detailSimulacao} />}
                    </div>

                    {
                      //#endregion
                    }

                    {
                      //#region ETAPA 5
                    }
                    <div
                      className={`${obterEtapaAtual().step !==
                        ETAPAS_FINANCIAMENTO.dadosPessoais && "hidden"
                        } grid gap-6`}
                    >
                      <div className="flex grid-cols-2 gap-1">
                        <div>
                          <Label className="text-xs">
                            Em qual sua nacionalidade?
                          </Label>
                          <ComboboxControlled
                            options={BV_NACIONALIDADE.map((p) => {
                              return {
                                label: p.Name,
                                value: p.Name,
                                id: p.Id,
                              }
                            })}
                            control={control}
                            controlName="nacionalidade"
                            errors={errors}
                            placeholder="Sua nacionalidade"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">
                            Qual seu estado civil
                          </Label>
                          <ComboboxControlled
                            options={BV_ESTADO_CIVIL.map((p) => {
                              return {
                                label: p.descricao,
                                value: p.codigo.toString(),
                                id: p.codigo as number,
                              }
                            })}
                            control={control}
                            controlName="estadoCivil"
                            errors={errors}
                            placeholder="Seus estado civil"
                          />
                        </div>
                      </div>
                      <div className="flex gap-8 grid-cols-2">
                        <div className="flex flex-col gap-3 ">
                          <Label className="text-xs">
                            Informe os numeros da sua identidade
                          </Label>
                          <div className="flex gap-8 grid-cols-2">
                            <Input
                              errors={errors}
                              control={control}
                              controlName="rg"
                              // mask="9999999999"
                              placeholder="RG ou RNE"
                            />
                          </div>
                        </div>
                        <div className="flex gap-3 flex-col justify-end">
                          <Label className="text-xs">Informe seu genero</Label>
                          <Controller
                            control={control}
                            name="sexo"
                            render={({ field }) => (
                              <RadioGroup
                                defaultValue="comfortable"
                                onValueChange={field.onChange}
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="M" id="r1" />
                                  <Label htmlFor="r1">Masculino</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="F" id="r2" />
                                  <Label htmlFor="r2">Feminino</Label>
                                </div>
                              </RadioGroup>
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs">Nome da mãe</Label>
                        <Input
                          errors={errors}
                          control={control}
                          controlName="nomeMae"
                          placeholder="Informe o nome da sua mãe"
                        />
                      </div>
                      <div className="flex flex-col gap-1 ">
                        <Label className="text-xs">
                          Valor do seu patrimonio
                        </Label>
                        <Input
                          money
                          errors={errors}
                          control={control}
                          controlName="patrimonio"
                          placeholder="Informe o valor"
                        />
                      </div>
                      {/* <Check className="h-4 w-4 bg-green-800 rounded-xl p-1" /> */}
                    </div>
                    {
                      //#endregion
                    }
                    {
                      //#region ETAPA 6
                    }
                    <div
                      className={`${obterEtapaAtual().step !==
                        ETAPAS_FINANCIAMENTO.residencia && "hidden"
                        } grid gap-6`}
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1 ">
                          <Label className="text-xs">
                            Informe seu RG ou RNE
                          </Label>
                          <Input
                            errors={errors}
                            control={control}
                            controlName="cep"
                            mask="99999-999"
                            placeholder="RG ou RNE"
                            onChange={handleCEPChange}
                          />
                        </div>
                        <div className="flex gap-3 grid-cols-2">
                          <div className="flex flex-col gap-1">
                            <Label className="text-xs">
                              Em qual estado o cliente mora?
                            </Label>
                            <ComboboxControlled
                              options={ESTADOS.map((p) => {
                                return {
                                  label: p.Initials,
                                  value: p.Initials,
                                  id: p.Id,
                                }
                              })}
                              control={control}
                              controlName="estado"
                              errors={errors}
                              placeholder="UF"
                            />
                          </div>
                          <div className="flex flex-col gap-1 ">
                            <Label className="text-xs">
                              Informe sua cidade
                            </Label>
                            <Input
                              errors={errors}
                              control={control}
                              controlName="cidade"
                              placeholder="Qual a sua cidade?"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 ">
                          <Label className="text-xs">
                            Informe seu endereço
                          </Label>
                          <Input
                            errors={errors}
                            control={control}
                            controlName="endereco"
                            placeholder="Qual a seu endereço?"
                          />
                        </div>
                        <div className="flex flex-col gap-1 ">
                          <Label className="text-xs">Informe seu bairro</Label>
                          <Input
                            errors={errors}
                            control={control}
                            controlName="bairro"
                            placeholder="Qual a seu bairro?"
                          />
                        </div>

                        <div className="flex flex-col gap-1 ">
                          <Label className="text-xs">Complemento</Label>
                          <Input
                            errors={errors}
                            control={control}
                            controlName="complemento"
                            placeholder="Possui algum complemento?"
                          />
                        </div>
                        <div className="flex flex-col gap-1 ">
                          <Label className="text-xs">Numero</Label>
                          <Input
                            errors={errors}
                            control={control}
                            controlName="numero"
                            placeholder="Informe o numero da sua residência"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <Label className="text-xs">
                            Situação do seu imovel
                          </Label>
                          <ComboboxControlled
                            options={BV_SITUACAO_IMOVEL.map((p) => {
                              return {
                                label: p.descricao,
                                value: p.codigo.toString(),
                                id: p.codigo,
                              }
                            })}
                            control={control}
                            controlName="situacaoImovel"
                            errors={errors}
                            placeholder="Qual a situação do seu imovel?"
                          />
                        </div>
                      </div>
                    </div>
                    {
                      //#endregion
                    }
                    {
                      //#region ETAPA 7
                    }
                    <div
                      className={`${obterEtapaAtual().step !==
                        ETAPAS_FINANCIAMENTO.profissao && "hidden"
                        } grid gap-6`}
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <Label className="text-xs">Qual sua ocupação?</Label>
                          <ComboboxControlled
                            options={BV_TIPOS_PROFISSOES.map((p) => {
                              return {
                                label: p.descricao,
                                value: p.codigo.toString(),
                                id: p.codigo,
                              }
                            })}
                            control={control}
                            controlName="tipoProfissao"
                            errors={errors}
                            placeholder="Qual a sua ocupação"
                          />
                        </div>

                        <div className="flex flex-col gap-3">
                          <Label className="text-xs">
                            Qual seu ramo de ocupação?
                          </Label>
                          <ComboboxControlled
                            options={BV_PROFISSOES.map((p) => {
                              return {
                                label: p.descricao,
                                value: p.codigo.toString(),
                                id: p.codigo,
                              }
                            })}
                            control={control}
                            controlName="profissao"
                            errors={errors}
                            placeholder="Qual seu ramo de ocupação"
                          />
                        </div>

                        <div className="flex flex-col gap-2 ">
                          <Label className="text-xs">
                            A quanto tempo esta na sua ocupação atual?
                          </Label>
                          <div className="flex gap-3 grid-cols-2">
                            <div>
                              <Label className="text-xs">A quantos anos?</Label>
                              <Input
                                errors={errors}
                                control={control}
                                controlName="anos"
                                placeholder="Anos"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">
                                A quantos meses?
                              </Label>
                              <Input
                                errors={errors}
                                control={control}
                                controlName="meses"
                                placeholder="Meses"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {
                      //#endregion
                    }
                    {
                      //#region ETAPA 8
                    }
                    <div
                      className={`${obterEtapaAtual().step !==
                        ETAPAS_FINANCIAMENTO.resumoSolicitacao && "hidden"
                        } grid gap-6`}
                    >
                      {detailSimulacao && <ResumePage parcela={detailSimulacao} />}
                      <div>
                        <Controller
                          control={control}
                          name="ciente"
                          render={({ field }) => (
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                className="flex items-center space-x-2"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />

                              <Label htmlFor="r1">
                                Confirmo que estou ciente sobre o CET e taxas do
                                meu contrato
                              </Label>
                            </div>
                          )}
                        />
                        {!isValid() && (
                          <span className="text-sm font-medium text-red-500">
                            {msgError()}
                          </span>
                        )}
                      </div>
                    </div>
                    {
                      //#endregion
                    }
                  </form>
                </CardContent>
                {(currentStep !== 2 || !reprovado) && currentStep !== 7 && (
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

                {currentStep === 7 && (
                  <Button size="sm" onClick={handleConfirm}>
                    Solicitar financiamento
                  </Button>
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
