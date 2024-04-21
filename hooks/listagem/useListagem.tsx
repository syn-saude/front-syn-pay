import React, { useEffect, useState } from "react"
import { AxiosResponse } from "axios"
import { toast } from "react-toastify"
// import { showNotificationErrorAPI } from "src/core/helpers/notification"
import { useDebouncedCallback } from "use-debounce/dist"

import useAuth from "../useAuth"
import { ListagemResponse, ObjetoDescricaoGenerico } from "./types"

export interface IBuscarDadosListagem<T, F> {
  (query: F, primeiraBusca?: Boolean): Promise<
    AxiosResponse<ListagemResponse<T>>
  >
}

function useListagem<T, F>(
  qtdPorPagina = 10,
  fnBuscarDados: IBuscarDadosListagem<T, F>
) {
  const [loading, setLoading] = useState(true)
  const [termoPesquisa, setTermoPesquisa] = useState("")
  const [pagina, setPagina] = useState(1)
  const [qtdPaginas, setQtdPaginas] = useState(1)
  const [dados, setDados] = useState<T[]>([])
  const [qtdAllDados, setQtdAllDados] = useState(0)
  const [allDados, setAllDados] = useState<T[]>([])

  //Filtro status
  const [filtroStatus, setFiltroStatus] = useState<string>(" ")
  const [loadingFiltroStatus, setLoadingFiltroStatus] = useState(true)
  const [listaStatus, setListaStatus] = useState<ObjetoDescricaoGenerico[]>([])

  // Filtro Geral
  const [filtroGeral, setFiltroGeral] = useState<F>()
  const [primeiraBusca, setPrimeiraBusca] = useState(true)

  const [debouncedTermoPesquisa, setDebouncedTermoPesquisa] = useState("")
  const debounced = useDebouncedCallback(() => {
    setDebouncedTermoPesquisa(termoPesquisa)
    carregarListagem({ resetarPaginacao: true })
  }, 1200)

  //LISTAGEM
  const [listagemAsync, setListagemAsync] = useState(true)

  const handleTermoPesquisa = (
    event: React.ChangeEvent<HTMLInputElement>,
    clear?: boolean
  ) => {
    setLoading(true)
    setTermoPesquisa(clear ? "" : event.target.value)
    if (!clear) {
      debounced
    }
  }

  const handleLimparFiltros = () => {
    setLoading(true)
    setTermoPesquisa("")
    setFiltroStatus(" ")
    setFiltroGeral(undefined)
    // debounced.callback()
  }

  const handlePesquisarDados = () => {
    setLoading(true)
    // debounced.callback()
  }

  const handleSetTermoPesquisarCodigo = (codigo: any) => {
    setTermoPesquisa(codigo)
  }

  const handleSetTermoPesquisar = (
    event: React.ChangeEvent<HTMLInputElement>,
    clear?: boolean
  ) => {
    setTermoPesquisa(
      clear ? "" : event.target.value ? event.target.value : termoPesquisa
    )
  }

  const handleCustomPagina = (page: any, event?: any) => {
    setLoading(true)
    setPagina(page)
  }

  function handleProxPagina() {
    if (qtdAllDados > allDados?.length) {
      setPagina((oldState) => oldState + 1)
    }
  }

  function handlePrevPagina() {
    if (pagina > 1) {
      setPagina((oldState) => oldState - 1)
    }
  }

  const carregarListagem = async ({
    resetarPaginacao,
    status,
    tag,
    responsavelId,
    statusProposta,
    newDados,
    criadoPorHospital,
    filtro,
    medicoId,
    dataInicio,
    dataFim,
  }: {
    resetarPaginacao: Boolean
    status?: string
    medicoId?: string
    tag?: string
    responsavelId?: string
    statusProposta?: string
    newDados?: any
    criadoPorHospital?: "0" | "1" | "2"
    filtro?: F
    dataInicio?: string
    dataFim?: string
  }) => {
    if (newDados) {
      return setDados(newDados)
    }
    try {
      setLoading(true)
      setFiltroStatus(status || filtroStatus || " ")

      const filtroFinal = {
        ...filtro,
        pagina,
        qtdPorPagina,
        termoPesquisa: termoPesquisa === undefined ? "" : termoPesquisa,
        status: status || filtroStatus,
        // dataFim: dataFim === undefined ? "" : dataFim,
        // dataInicio: dataInicio === undefined ? "" : dataInicio,
      }
      const response = await fnBuscarDados(filtroFinal as any, primeiraBusca)
      // const response = await fnBuscarDados(filtroFinal, primeiraBusca)

      setQtdAllDados(response.data.qtdTotal)
      setAllDados((oldState) =>
        resetarPaginacao
          ? response.data.items
          : [...oldState, ...response.data.items]
      )
      setDados(response.data.items)
      setQtdPaginas(
        Math.ceil(Math.max(1, response.data.qtdTotal) / qtdPorPagina)
      )

      if (resetarPaginacao) {
        setPagina(1)
      }

      setPrimeiraBusca(false)
      setLoading(false)
    } catch (e) {
      // showNotificationErrorAPI(e)
      toast.error("erro listagem")
      setLoading(false)
    }
  }

  const carregarListagemAsync = async ({
    resetarPaginacao,
    status,
    tag,
    responsavelId,
    statusProposta,
    newDados,
    criadoPorHospital,
    filtro,
    medicoId,
    dataInicio,
    dataFim,
  }: {
    resetarPaginacao: Boolean
    status?: string
    medicoId?: string
    tag?: string
    responsavelId?: string
    statusProposta?: string
    newDados?: any
    criadoPorHospital?: "0" | "1" | "2"
    filtro?: F
    dataInicio?: string
    dataFim?: string
  }) => {
    // if (newDados) {
    //   return setDados(newDados)
    // }
    try {
      // setLoading(true)

      if (resetarPaginacao) {
        setPagina(1)
      }
      setFiltroStatus(status || filtroStatus || " ")

      setLoading(false)
      setTimeout(() => {
        setListagemAsync(true)
      }, 200)
    } catch (e) {
      // showNotificationErrorAPI(e)
      setLoading(false)
    }
  }

  async function obterListagemAsync(
    resetarPaginacao = true,
    filtro: F = {} as F
  ) {
    setLoading(true)
    const filtroFinal = {
      ...filtro,
      pagina,
      qtdPorPagina,
      termoPesquisa: termoPesquisa === undefined ? "" : termoPesquisa,
      status: status || filtroStatus,
    }
    const response = await fnBuscarDados(filtroFinal, primeiraBusca)

    setQtdAllDados(response.data.qtdTotal)
    setAllDados(response.data.items)
    setDados(response.data.items)
    setQtdPaginas(Math.ceil(Math.max(1, response.data.qtdTotal) / qtdPorPagina))

    if (resetarPaginacao) {
      setPagina(1)
    }

    setPrimeiraBusca(false)
    setLoading(false)
    setListagemAsync(false)
  }

  useEffect(() => {
    if (listagemAsync && !loading) {
      obterListagemAsync()
    }
    setTimeout(() => {
      setListagemAsync(false)
    }, 2000)
  }, [listagemAsync])

  const handleFiltroStatus = (event: any) => {
    const status = event.target.value
    setFiltroStatus(status)
    carregarListagem({
      resetarPaginacao: true,
      status: status,
      // dataInicio: filtroDataInicio,
      // dataFim: filtroDataFim,
    })
  }

  function atualizarItemListagem(
    id: string,
    novoValor: any,
    key: string = "id"
  ) {
    const novosDados = allDados.map((item) =>
      (item as any)[key] === id ? novoValor : item
    )
    setAllDados(novosDados as any)
  }

  function removerItemListagem(id: string, key = "id") {
    const novosDados = allDados.filter((item) => (item as any)[key] !== id)
    setAllDados(novosDados as any)
    setQtdAllDados(qtdAllDados - 1)
  }

  useEffect(() => {
    carregarListagem({
      resetarPaginacao: false,
      filtro: filtroGeral,
    })
  }, [pagina])

  useEffect(() => {
    if (!primeiraBusca) {
      carregarListagem({
        filtro: filtroGeral,
        resetarPaginacao: true,
      })
    }
  }, [filtroGeral])

  // function obterDadosUnicos(dados: T[]) {
  //   return dados
  //   const myList = dados
  //   const unique = [...new Set(myList)]

  //   return unique
  // }
  return {
    loading,
    termoPesquisa,
    handleTermoPesquisa,
    pagina,
    handleCustomPagina,
    qtdPaginas,
    dados: dados,
    nenhumDado: !loading && dados.length === 0 && allDados.length === 0,
    // && !debouncedTermoPesquisa,
    //&& filtroStatus !== ' ',
    nenhumResultado:
      !loading &&
      dados.length === 0 &&
      (debouncedTermoPesquisa || filtroStatus !== " "),
    dadosCarregados: !loading && dados.length > 0,
    allDadosCarregados: allDados.length > 0,
    carregarListagem,
    carregarListagemAsync,
    filtroStatus,
    loadingFiltroStatus,
    listaStatus,
    handleFiltroStatus,
    handleProxPagina,
    handlePrevPagina,
    qtdAllDados,
    allDados: allDados,
    // allDados: obterDadosUnicos(allDados),
    setFiltroGeral,
    filtroGeral,

    atualizarItemListagem,
    handleSetTermoPesquisar,
    handleSetTermoPesquisarCodigo,
    handlePesquisarDados,

    handleLimparFiltros,
    removerItemListagem,
  }
}

export default useListagem
