"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { api } from "@/services/apiClient"
import {
  ItemListagemFinanciamento,
  ListagemQuery,
  obterListagemFinanciamento,
} from "@/services/financiamentos"
import {
  formatarDataHora,
  formatarDataHoraLocal,
} from "@/utils/formatacoes/formatarData"
import formatarDinheiro from "@/utils/formatacoes/formatarDinheiro"
import {
  File,
  Filter,
  FilterIcon,
  Home,
  LineChart,
  //   ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"

import {
  STATUS_FINANCIAMENTO,
  STATUS_FINANCIAMENTO_ARRAY,
} from "@/config/const/syn/statusFinanciamento"
import { ListagemResponse } from "@/hooks/listagem/types"
import useListagem from "@/hooks/listagem/useListagem"
import { Badge } from "@/components/ui/badge"
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import withAuth from "@/components/with-auth"

import { IFinanciamentoRequest } from "./interface"
import ModalDetail from "./modalDetail"

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
  const [filtroStatus, setFiltroStatus] = useState<string>("")
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

  function obterDadosFiltrado() {
    if (!!filtroStatus)
      return dados.filter((item) => item.statusSyn == filtroStatus)

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
                  value=""
                  onClick={() => {
                    setFiltroStatus("")
                  }}
                >
                  Todos
                  <Badge variant="secondary" className="ml-2">
                    {qtdAllDados}
                  </Badge>
                </TabsTrigger>
                {/* {
                  STATUS_FINANCIAMENTO_ARRAY.map(s=>
                    
                  )
                } */}
                <TabsTrigger
                  value={STATUS_FINANCIAMENTO.RASCUNHO}
                  onClick={() => {
                    setFiltroStatus(STATUS_FINANCIAMENTO.RASCUNHO)
                  }}
                >
                  Rascunho
                </TabsTrigger>
                <TabsTrigger
                  value={STATUS_FINANCIAMENTO.RASCUNHO_PRE_APROVADO}
                  onClick={() => {
                    setFiltroStatus(STATUS_FINANCIAMENTO.RASCUNHO_PRE_APROVADO)
                  }}
                >
                  CPF aprovado
                </TabsTrigger>
                <TabsTrigger
                  value={STATUS_FINANCIAMENTO.CREDITO_PRE_REPROVADO}
                  onClick={() => {
                    setFiltroStatus(STATUS_FINANCIAMENTO.CREDITO_PRE_REPROVADO)
                  }}
                >
                  CPF reprovado
                </TabsTrigger>
                <TabsTrigger
                  value={STATUS_FINANCIAMENTO.EM_ANALISE}
                  onClick={() => {
                    setFiltroStatus(STATUS_FINANCIAMENTO.EM_ANALISE)
                  }}
                >
                  Em análise
                </TabsTrigger>
                {/* <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger> */}
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
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
                      checked={filtroStatus == ""}
                      onClick={() => {
                        setFiltroStatus("")
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
                  {/* <Button size="default" className="h-8 gap-1"> */}
                  <Button size="sm" className=" gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Novo Financiamento
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
            {/* <TabsContent value={filtroStatus}> */}
            <Card x-chunk="dashboard-06-chunk-0" className="mt-2">
              <CardHeader>
                <CardTitle>Financiamentos</CardTitle>
                <CardDescription>
                  Acompanhe as solicitações de financiamentos.
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                      <TableHead>
                        <span className="sr-only">Ações</span>
                      </TableHead>
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
                            <p
                              // variant="secondary"
                              className="text-xs w-max text-muted-foreground italic font-medium"
                            >
                              última etapa {item.etapa}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {item.descricaoStatusSyn}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {formatarDinheiro(item.valorSolicitado)}
                        </TableCell>

                        <TableCell className="hidden md:table-cell">
                          {formatarDataHoraLocal(item.criado)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                              <DropdownMenuItem
                                onClick={() => handleVisualizar(item.id)}
                              >
                                Visualizar
                              </DropdownMenuItem>
                              {podeEditar(item.statusSyn) && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    router.push(
                                      `/financiamentos/add?id=${item.id}`
                                    )
                                  }
                                >
                                  Continuar solicitação
                                </DropdownMenuItem>
                              )}
                              {/* <DropdownMenuItem>Editar</DropdownMenuItem>
                                <DropdownMenuItem>
                                  <span className="text-destructive hover:text-destructive">
                                    Remover
                                  </span>
                                </DropdownMenuItem> */}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* <TableRow>
                        <TableCell colSpan={5}></TableCell>
                      </TableRow> */}
                  </TableBody>
                </Table>
                {/* {qtdAllDados !== allDados.length && (
                    <Button
                      loading={loading}
                      className="w-full"
                      variant="outline"
                      onClick={handleProxPagina}
                    >
                      Carregar mais
                    </Button>
                  )} */}
              </CardContent>
              <CardFooter>
                {/* <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div> */}
              </CardFooter>
            </Card>
            {/* </TabsContent> */}
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
