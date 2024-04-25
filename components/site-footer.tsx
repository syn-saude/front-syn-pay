import React from "react"

export default function SiteFooter() {
  return (
    <div className="flex flex-col grid-cols-1 gap-2 p-10 w-full" >
      <span style={{fontSize:'10px'}}>
        SYN SOLUCAO EM SAUDE LTDA inscrita no CNPJ 38.312.6222/0001-28, com sede
        na Cidade de São Luís, Estado do Maranhão, Endereço Rua Miquerinos, n°
        01, Jardim Renascença, Cep: 65.075-038, não é uma instituição financeira
        e não realiza operações de crédito diretamente.
      </span>
      <span style={{fontSize:'10px'}}>
        SYN SOLUCAO EM SAUDE LTDA é um correspondente bancário do BANCO
        VOTORANTIM S.A. inscrito no CNPJ sob o nº 59.588.111/0001-03 (“Banco
        Votorantim”) e BANCO BV S.A. inscrito no CNPJ sob o nº
        01.858.774/0001-10 (“BV”), instituições financeiras autorizadas a
        funcionar pelo Banco Central do Brasil conforme lei e regulação vigente,
        nos termos da Resolução CMN nº 4.935, de 29 de julho de 2021.
      </span>
    </div>
  )
}
