"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { setupAPIClient } from "@/services/api"
import { obterCep } from "@/services/cep"
import {
  obterFinanciamentoPorId,
  salvarFinanciamento,
} from "@/services/financiamentos"
import { formatarDataHoraLocal } from "@/utils/formatacoes/formatarData"
import formatarDinheiro from "@/utils/formatacoes/formatarDinheiro"
import { DevTool } from "@hookform/devtools"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Frown,
  Home,
  InfoIcon,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  ShoppingCart,
  Users,
} from "lucide-react"
import moment from "moment"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"
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
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { Alert } from "@/components/ui/alert"
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
// import Router from "next/router"
import ResumePage from "@/components/ui/resume-page/resumePage"
import { ParcelaBV, SimulacaoResponse } from "@/components/ui/resume-page/types"
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
    id: yup.string().nullable().label("Nome"),
    nome: yup.string().required().label("Nome"),
    telefone: yup.string().required().label("Telefone"),
    cpf: yup.string().required().label("CPF"),
    dataNascimento: yup.string().required().label("Data de nascimento"),
    email: yup.string().email().required().label("E-mail"),
    uf: yup.string().required().label("UF"),
    //Step 2
    procedimento: yup.string().required().label("Procedimento"),
    valorSolicitado: yup
      .number()
      .min(500, "Valor solicitado deve ser menor ou igual a R$ 500,00")
      .max(30000, "Valor solicitado deve ser menor ou igual a R$ 30.000,00")
      .required()
      .label("Valor solicitado"),
    renda: yup.number().required().label("Renda"),
    //Step 3
    qtdParcelas: yup.number().required().label("Valor aprovado"),
    //Step 4
    //visualizar arquivo de validação
    //Step 5
    nacionalidade: yup.string().required().label("Nacionalidade"),
    estadoCivil: yup.number().required().label("Estado civil"),
    rg: yup.string().required().label("Identidade"),
    sexo: yup.string().required().label("Gênero"),
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
      .required("Você precisa aceitar os termos")
      .oneOf([true], "Você precisa aceitar os termos"),
    //visualização e validação
  })
  .required()
//#endregion

export interface FinanciamentoRequest {
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
    titulo: "Qual o seu procedimento?",
    descricao: "Nos informe o que precisa",
    validacao: ["procedimento", "valorSolicitado", "renda"],
    ativo: true,
  },
  {
    //step 3
    nuStep: 3,
    step: ETAPAS_FINANCIAMENTO.valorAprovados,
    titulo: "Simular condições",
    descricao: "Vamos simular as melhores condições",
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
  const searchParams = useSearchParams()

  //#region USE STATE
  const [currentStep, setCurrentStep] = useState(0)

  const [id, setId] = useState(searchParams.get("id"))
  const [cpfReprovado, setCpfReprovado] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingSalvar, setLoadingSalvar] = useState(false)

  const [simulacao, setSimulacao] = useState<SimulacaoResponse>()

  const [parcelaSelecionada, setParcelaSelecionada] = useState<ParcelaBV>()
  //#endregion

  useEffect(() => {
    verificarEdicao()
  }, [])

  async function verificarEdicao() {
    let idQuery = searchParams.get("id")
    if (idQuery) {
      try {
        setLoading(true)
        var response = await obterFinanciamentoPorId(idQuery)
        let financiamento = response.data
        Object.keys(financiamento).forEach(
          (key: keyof FinanciamentoRequest) => {
            let valor = financiamento[key]

            if (key == "dataNascimento") {
              valor = moment(financiamento[key]).format("DD/MM/yyyy")
            }

            if (key == "uf") {
              valor = financiamento[key].toLocaleLowerCase()
            }

            if (valor == null) return

            setValue(key, valor, { shouldValidate: false })
          }
        )
      } catch (error) {
        toast.error("Erro ao obter simulacao")
      }
    }
    setLoading(false)
  }

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
  useEffect(() => {
    handleCEPChange(form.cep)
  }, [form.cep])
  const handleCEPChange = async (value: any) => {
    const cep = value?.replace(/\D/g, "")
    if (cep?.length === 8) {
      try {
        const response = await obterCep(cep)
        const data = response.data
        // setValue("cep", data.cep)
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
  async function handleSalvarFinanciamento() {
    try {
      setLoadingSalvar(true)

      //Monta body
      let body = {
        ...form,
        etapa: etapas[currentStep].nuStep,
        dataNascimento: moment(form.dataNascimento, "DD/MM/yyyy").format(
          "yyyy-MM-DD"
        ),
      } as FinanciamentoRequest

      //Add id no body se for edição
      if (id) {
        body.id = id
      }

      //Chama endpoint para salvar financiamento
      const response = await salvarFinanciamento(body)
      setId(response.data.id)

      if (etapas[currentStep].nuStep === 2) {
        setSimulacao(response.data.simulacao)
      }
    } catch (error) {
      console.error(error)
      toast.error("Ocorreu um erro ao tentar realizar essa operação.")
      setLoadingSalvar(false)
      throw error
    }
    setLoadingSalvar(false)
  }
  //#endregion

  useEffect(() => {
    if (currentStep > 1) {
      if (!!simulacao?.listaParcelas?.length) {
        setCpfReprovado(false)
      } else {
        setCpfReprovado(true)
      }
    }
  }, [simulacao, currentStep])

  useEffect(() => {
    const parcela = simulacao?.listaParcelas?.find(
      (p) => p.quantidadeParcelas === form.qtdParcelas
    )
    setParcelaSelecionada(parcela)
  }, [form.qtdParcelas, simulacao])

  const handleFirstStep = () => {
    // setCurrentStep(0)
    window.location.href = "/financiamentos/add"
    // router.push("/financiamentos/add", undefined)
    // router.push("/financiamentos/add", undefined)
    // router.refresh()
  }

  //#region Handle Next prev Step
  const handleNextStep = async () => {
    //Verifica se formulário é válido
    var isValid = await trigger(obterEtapaAtual().validacao as any)

    if (!isValid) {
      return
    }

    //Salva etapa
    if (etapas[currentStep].nuStep <= 8) {
      await handleSalvarFinanciamento()
    }

    //Muda etapa após salvar e se não for a última
    if (etapas[currentStep].nuStep <= 7) {
      setCurrentStep((prevStep) => prevStep + 1)
    } else {
      router.replace("/financiamentos/sucesso")
    }
  }

  const handlePrevStep = () => {
    if (currentStep <= 0) {
      return
    }
    setCurrentStep((prevStep) => prevStep - 1)
  }
  //#endregion

  function obterEtapasAtivas() {
    return etapas.filter((e) => e.ativo)
  }

  function obterEtapaAtual() {
    return etapas[currentStep]
  }

  const { width } = useWindowDimensions()
  const isMobile = width && width < 600

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="container flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {!isMobile && (
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
        )}
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4  md:gap-8 md:p-10 mt-4">
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
              <Card x-chunk="dashboard-04-chunk-1" loading={loading}>
                {!cpfReprovado && (
                  <CardHeader>
                    <CardTitle>{obterEtapaAtual().titulo}</CardTitle>
                    <CardDescription>
                      {obterEtapaAtual().descricao}
                    </CardDescription>
                  </CardHeader>
                )}
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
                      <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
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
                      <div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
                        <div className="flex flex-col gap-1 ">
                          <Label className="text-xs">
                            Informe os números do seu CPF
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
                      <div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
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
                      className={`${
                        obterEtapaAtual().step !==
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
                            De quanto você precisa? <b>(máx: R$ 30.000,00)</b>
                          </Label>
                          <Input
                            money
                            defaultValue={form.valorSolicitado}
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
                      className={`${
                        obterEtapaAtual().step !==
                          ETAPAS_FINANCIAMENTO.valorAprovados && "hidden"
                      } grid gap-6`}
                    >
                      {!cpfReprovado && (
                        <div>
                          {!!simulacao?.existeValorParcial && (
                            <div>
                              <div className="text-sm  max-w-[500px]">
                                <Alert
                                  variant="default"
                                  className="flex flex-row gap-2 border-blue-500 bg-blue-50"
                                >
                                  <div className="text-blue-500">
                                    <InfoIcon />
                                  </div>
                                  <p className="text-sm text-blue-900">
                                    Você solicitou o valor de{" "}
                                    <b>
                                      {formatarDinheiro(form?.valorSolicitado)}
                                    </b>
                                    .
                                    <br />
                                    Infelizmente não encontramos crédito para
                                    este valor.
                                    <br /> Mas encontramos uma proposta para o
                                    valor de{" "}
                                    <b>
                                      {formatarDinheiro(
                                        simulacao?.valorMaximoFinanciado
                                      )}
                                    </b>
                                    .
                                  </p>
                                </Alert>

                                <p className="text-sm text-foreground font-semibold my-3">
                                  Escolha a melhor proposta abaixo para
                                  continuar a solicitação de financiamento:
                                </p>
                              </div>
                            </div>
                          )}
                          <Controller
                            control={control}
                            name="qtdParcelas"
                            render={({ field }) => (
                              <div className="grid grid-cols-1 gap-2 ">
                                {simulacao?.listaParcelas?.map(
                                  (item: ParcelaBV, index: number) => (
                                    <CardValorLiberado
                                      simulacao={simulacao}
                                      key={index}
                                      selecionado={
                                        form.qtdParcelas ===
                                        item.quantidadeParcelas
                                      }
                                      onValueChange={() =>
                                        setValue(
                                          "qtdParcelas",
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
                        </div>
                      )}
                      {cpfReprovado && (
                        <div className="grid grid-cols-1 gap-4 justify-items-center p-8">
                          <Frown strokeWidth={1.1} size={70} color="#ff6c2e" />
                          <div className="grid grid-cols-1 gap-4 max-w-[420px] text-center ">
                            <div className="text-lg font-semibold">
                              Infelizmente não encontramos propostas
                              disponíveis.
                            </div>
                            <div className="text-sm ">
                              Deseja realizar uma nova simulação com outro CPF?
                            </div>

                            <Button
                              size="lg"
                              variant="default"
                              type="button"
                              onClick={handleFirstStep}
                              className="w-full"
                            >
                              Sim, simular com outro CPF!
                            </Button>
                          </div>
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
                      className={`${
                        obterEtapaAtual().step !==
                          ETAPAS_FINANCIAMENTO.resumoSimulacao && "hidden"
                      } grid gap-6`}
                    >
                      {parcelaSelecionada && (
                        <ResumePage
                          parcela={parcelaSelecionada}
                          simulacao={simulacao}
                        />
                      )}
                    </div>

                    {
                      //#endregion
                    }

                    {
                      //#region ETAPA 5
                    }
                    <div
                      className={`${
                        obterEtapaAtual().step !==
                          ETAPAS_FINANCIAMENTO.dadosPessoais && "hidden"
                      } grid gap-6`}
                    >
                      <div className="flex grid-cols-2 gap-1 max-[600px]:grid-cols-1">
                        <div>
                          <Label className="text-xs">
                            Qual sua nacionalidade?
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
                      <div className="flex gap-8 grid-cols-2 max-[600px]:grid-cols-1">
                        <div className="flex flex-col gap-3 ">
                          <Label className="text-xs">
                            Informe os numeros da sua identidade
                          </Label>
                          <div className="flex gap-8 grid-cols-2 max-[600px]:grid-cols-1">
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
                          <Label className="text-xs">Informe seu sexo</Label>
                          <Controller
                            control={control}
                            name="sexo"
                            render={({ field }) => (
                              <RadioGroup
                                defaultValue={field.value}
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
                          {errors.sexo && (
                            <span className="text-sm font-medium text-red-500">
                              {errors.sexo.message}
                            </span>
                          )}
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
                      className={`${
                        obterEtapaAtual().step !==
                          ETAPAS_FINANCIAMENTO.residencia && "hidden"
                      } grid gap-6`}
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1 ">
                          <Label className="text-xs">Informe seu CEP</Label>
                          <Input
                            errors={errors}
                            control={control}
                            controlName="cep"
                            mask="99999-999"
                            value={form.cep}
                            placeholder="Informe seu Cep"
                          />
                        </div>
                        <div className="flex gap-3 grid-cols-2 max-[600px]:grid-cols-1">
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
                              key={form.cep}
                              defaultValue={form.cidade}
                              errors={errors}
                              control={control}
                              value={form.cidade}
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
                            value={form.endereco}
                            controlName="endereco"
                            placeholder="Qual a seu endereço?"
                          />
                        </div>
                        <div className="flex flex-col gap-1 ">
                          <Label className="text-xs">Informe seu bairro</Label>
                          <Input
                            errors={errors}
                            control={control}
                            value={form.bairro}
                            controlName="bairro"
                            placeholder="Qual a seu bairro?"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="col-span-2 gap-1 ">
                            <Label className="text-xs">Complemento</Label>
                            <Input
                              errors={errors}
                              control={control}
                              value={form.complemento}
                              controlName="complemento"
                              placeholder="Possui algum complemento?"
                            />
                          </div>
                          <div className="col-span-1 gap-1 ">
                            <Label className="text-xs">Número</Label>
                            <Input
                              errors={errors}
                              control={control}
                              value={form.numero}
                              controlName="numero"
                              placeholder="Informe o numero da sua residência"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex flex-col gap-1">
                            <Label className="text-xs">
                              Situação do seu imóvel
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
                          {/* <div className="flex flex-col gap-1">
                            <Label className="text-xs">
                              Morando na residência a quantos meses?
                            </Label>
                            <Input
                              errors={errors}
                              control={control}
                              controlName="mesesResidencia"
                              placeholder="Informe meses"
                            />
                          </div> */}
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
                      className={`${
                        obterEtapaAtual().step !==
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
                            A quanto tempo está na sua ocupação atual?
                          </Label>
                          <div className="flex gap-3 grid-cols-2 max-[600px]:grid-cols-1">
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
                      className={`${
                        obterEtapaAtual().step !==
                          ETAPAS_FINANCIAMENTO.resumoSolicitacao && "hidden"
                      } grid gap-6`}
                    >
                      {parcelaSelecionada && (
                        <ResumePage
                          parcela={parcelaSelecionada}
                          simulacao={simulacao}
                        />
                      )}
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
                {!cpfReprovado && (
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
                    {currentStep !== 7 && (
                      <Button
                        size="sm"
                        onClick={handleNextStep}
                        loading={loadingSalvar}
                      >
                        Continuar
                      </Button>
                    )}

                    {currentStep === 7 && (
                      <Button
                        size="sm"
                        onClick={handleNextStep}
                        loading={loadingSalvar}
                      >
                        Solicitar financiamento
                      </Button>
                    )}
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
