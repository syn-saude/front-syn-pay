"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { api } from "@/services/apiClient"
import {
  ItemListagemFinanciamento,
  ListagemQuery,
  obterListagemFinanciamento,
} from "@/services/financiamentos"
import { formatarDataHoraLocal } from "@/utils/formatacoes/formatarData"
import formatarDinheiro from "@/utils/formatacoes/formatarDinheiro"
import {
  Eye,
  FileText,
  Filter,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react"

import {
  STATUS_FINANCIAMENTO,
  STATUS_FINANCIAMENTO_ARRAY,
} from "@/config/const/syn/statusFinanciamento"
import useListagem from "@/hooks/listagem/useListagem"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import withAuth from "@/components/with-auth"

import { IFinanciamentoRequest } from "./interface"
import ModalDetail from "./modalDetail"
import * as S from "./styles"

function Financiamentos() {
  const router = useRouter()

  const {
    allDados,
    dados,
    loading,
    carregarListagem,
    filtroGeral,
    qtdAllDados,
    handleProxPagina,
  } = useListagem<ItemListagemFinanciamento, ListagemQuery>(
    1000,
    obterListagemFinanciamento as any
  )
  const [modalDetailIsOpen, setModalDetailIsOpen] = useState(false)
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [financiamentoDetail, setFinanciamentoDetail] =
    useState<IFinanciamentoRequest[]>()

  async function handleVisualizar(id: string) {
    const response = await api.get(`/synpay/financiamentos/${id}`)
    setFinanciamentoDetail(response.data)
    setModalDetailIsOpen(true)
  }

  function handleCloseModal() {
    setModalDetailIsOpen(false)
  }

  function obterDadosFiltrado(status?: string) {
    if (!!status) {
      return dados.filter((item) => item.statusSyn == status)
    }

    if (filtroStatus != "todos") {
      return dados.filter((item) => item.statusSyn == filtroStatus)
    }

    if (searchTerm) {
      return dados.filter((item) =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return dados
  }

  function podeEditar(statusSyn) {
    switch (statusSyn) {
      case STATUS_FINANCIAMENTO.CREDITO_PRE_REPROVADO:
      case STATUS_FINANCIAMENTO.EM_ANALISE:
      case STATUS_FINANCIAMENTO.PAGAMENTO_REALIZADO:
      case STATUS_FINANCIAMENTO.PROPOSTA_APROVADA:
      case STATUS_FINANCIAMENTO.PROPOSTA_RECUSADA:
        return false
      default:
        return true
    }
  }

  const transformStatusColors = (status) => {
    switch (status) {
      case STATUS_FINANCIAMENTO.RASCUNHO:
        return "text-gray-950 bg-gray-100 border-gray-300"
      case STATUS_FINANCIAMENTO.RASCUNHO_PRE_APROVADO:
        return " text-blue-950 bg-blue-50  border-blue-300"
      case STATUS_FINANCIAMENTO.CREDITO_PRE_REPROVADO:
        return "text-red-600 bg-red-50 border-red-300"
      case STATUS_FINANCIAMENTO.EM_ANALISE:
        return " text-orange-600 bg-orange-100 border-orange-300"
      case STATUS_FINANCIAMENTO.PROPOSTA_APROVADA:
        return " text-blue-950 bg-blue-100  border-blue-300"
      case STATUS_FINANCIAMENTO.PROPOSTA_RECUSADA:
        return "text-red-700 bg-red-100 border-red-300"
      case STATUS_FINANCIAMENTO.PAGAMENTO_REALIZADO:
        return " text-green-600 bg-green-100 border-green-300"
      default:
        return "text-gray-950 bg-gray-100 border-gray-300"
    }
  }

  return (
    <div className=" flex min-h-screen w-full flex-col bg-muted/40">
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
                  <Link href="#">Financiamentos</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue={filtroStatus}>
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger
                  value="todos"
                  onClick={() => {
                    setFiltroStatus("todos")
                  }}
                >
                  Todos
                  <Badge variant="secondary" className="ml-2">
                    {qtdAllDados}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value={STATUS_FINANCIAMENTO.RASCUNHO}
                  onClick={() => {
                    setFiltroStatus(STATUS_FINANCIAMENTO.RASCUNHO)
                  }}
                >
                  Rascunho
                  <Badge variant="secondary" className="ml-2">
                    {obterDadosFiltrado(STATUS_FINANCIAMENTO.RASCUNHO).length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value={STATUS_FINANCIAMENTO.RASCUNHO_PRE_APROVADO}
                  onClick={() => {
                    setFiltroStatus(STATUS_FINANCIAMENTO.RASCUNHO_PRE_APROVADO)
                  }}
                >
                  CPF aprovado
                  <Badge variant="secondary" className="ml-2">
                    {
                      obterDadosFiltrado(
                        STATUS_FINANCIAMENTO.RASCUNHO_PRE_APROVADO
                      ).length
                    }
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value={STATUS_FINANCIAMENTO.CREDITO_PRE_REPROVADO}
                  onClick={() => {
                    setFiltroStatus(STATUS_FINANCIAMENTO.CREDITO_PRE_REPROVADO)
                  }}
                >
                  CPF reprovado
                  <Badge variant="secondary" className="ml-2">
                    {
                      obterDadosFiltrado(
                        STATUS_FINANCIAMENTO.CREDITO_PRE_REPROVADO
                      ).length
                    }
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value={STATUS_FINANCIAMENTO.EM_ANALISE}
                  onClick={() => {
                    setFiltroStatus(STATUS_FINANCIAMENTO.EM_ANALISE)
                  }}
                >
                  Em análise
                  <Badge variant="secondary" className="ml-2">
                    {obterDadosFiltrado(STATUS_FINANCIAMENTO.EM_ANALISE).length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <div className=" felx relative align-middle p-[2px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Pesquisar por nome..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[240px] h-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-foreground h-8 gap-1"
                    >
                      <Filter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filtrar
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={filtroStatus == "todos"}
                      onClick={() => {
                        setFiltroStatus("todos")
                      }}
                    >
                      Todos
                    </DropdownMenuCheckboxItem>
                    {STATUS_FINANCIAMENTO_ARRAY.map((s) => (
                      <DropdownMenuCheckboxItem
                        checked={filtroStatus == s.id}
                        onClick={() => {
                          setFiltroStatus(s.id)
                        }}
                      >
                        {s.descricao}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link href="/financiamentos/add">
                  <Button size="sm" className=" gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Novo Financiamento
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
            <Card x-chunk="dashboard-06-chunk-0" className="mt-2">
              <CardHeader>
                <CardTitle>Financiamentos</CardTitle>
                <CardDescription>
                  Acompanhe as solicitações de financiamentos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!loading && obterDadosFiltrado().length == 0 ? (
                  <div className="text-sm text-foreground font-medium">
                    Nenhum registro encontrado com esse filtro.
                  </div>
                ) : (
                  <Table loading={loading}>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Valor solicitado
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Solicitado
                        </TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {obterDadosFiltrado().map((item) => (
                        <TableRow>
                          <TableCell className="font-medium flex flex-col">
                            <div
                              className="text-sm  text-primary font-semibold cursor-pointer hover:text-blue-900"
                              onClick={() => handleVisualizar(item.id)}
                            >
                              {item.nome}
                              <p className="text-xs w-max text-muted-foreground italic font-medium">
                                última etapa {item.etapa}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                transformStatusColors(item.statusSyn) +
                                " rounded-md shadow-md "
                              }
                            >
                              {item.descricaoStatusSyn}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {item.valorParcialLiberado
                              ? formatarDinheiro(item.valorParcialLiberado)
                              : formatarDinheiro(item.valorSolicitado)}
                          </TableCell>

                          <TableCell className="hidden md:table-cell ">
                            {formatarDataHoraLocal(item.criado)}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-row ">
                              <div className="cursor-pointer  hover:text-blue-800 ">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Eye
                                      size={18}
                                      strokeWidth={1.6}
                                      onClick={() => handleVisualizar(item.id)}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Visualizar</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>

                              {podeEditar(item.statusSyn) && (
                                <>
                                  <S.StepDivider />
                                  <div className="cursor-pointer hover:text-blue-800">
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <FileText
                                          size={18}
                                          strokeWidth={1.5}
                                          onClick={() =>
                                            router.push(
                                              `/financiamentos/add?id=${item.id}`
                                            )
                                          }
                                        />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Continuar solicitação</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </div>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </Tabs>
          {modalDetailIsOpen && (
            <ModalDetail
              isOpen={modalDetailIsOpen}
              onRequestClose={handleCloseModal}
              financiamentoDetail={financiamentoDetail}
              isView={true}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default withAuth(<Financiamentos />)
