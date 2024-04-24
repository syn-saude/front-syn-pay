"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

import { Alert } from "@/components/ui/alert"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Button from "@/components/ui/button"
import withAuth from "@/components/with-auth"

function Sucesso() {
  const router = useRouter()
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 ">
      <div className="container flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
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
              <BreadcrumbPage>Sucesso</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <main className="flex  min-h-[calc(100vh_-_theme(spacing.16))] mx-auto max-w-[550px] flex-1 flex-col gap-4 items-center text-center  md:gap-5 md:p-10 ">
          <div className="w-20 h-20 flex items-center justify-center bg-green-500 rounded-full">
            <Check className=" h-12 w-12 text-slate-50  animate-in" />
          </div>
          <h1 className="text-2xl font-bold">
            Solicitação de financiamento enviada com sucesso.
          </h1>
          <p className="text-lg text-foreground">
            Nós recebemos o seu pedido de financiamento. Agora é só aguardar que
            o nosso time SYN entrará em contato pelo telefone informado.
          </p>

          <Alert className="text-sm text-primary font-medium ">
            <Link
              href="https://api.whatsapp.com/send?phone=5598992293099&text=Olá preciso saber mais sobre financiamento de procediemento na syn"
              target="_blank"
              rel="Whats app"
            >
              <Button variant="link" className="text-sm ">
                Tem dúvidas? Clique aqui para falar conosco por whatsApp
              </Button>
            </Link>
            <p className="text-sm ">ou ligue (98) 99229-3099</p>
          </Alert>
          <Button
            className="w-full"
            onClick={() => {
              router.replace("/financiamentos")
            }}
          >
            Gerenciar financiamentos
          </Button>
        </main>
      </div>
    </div>
  )
}

export default withAuth(<Sucesso />)
