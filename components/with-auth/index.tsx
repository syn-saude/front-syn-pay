"use client"

import { ReactNode, useEffect, useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { sessionStatus } from "@/utils/sessionStatus"
import { parseCookies } from "nookies"

import { SYN_ROUTES } from "@/config/const/routes"
import { SYN_PROFILES } from "@/config/const/syn/profiles"
import useAuth from "@/hooks/useAuth"
import TermoDeUso from "@/app/termo-de-uso/component/termos"

import SiteFooter from "../site-footer"
import SiteHeader from "../site-header"

export default function withAuth(
  Component: ReactNode,
  profiles = [SYN_PROFILES.CLINICA_SYNPAY],
  showHeader = true,
  showFooter = true
) {
  const session = sessionStatus
  return function WithAuth(props: any) {
    const { "@synauth.token": token } = parseCookies()
    const [allowed, setAllowed] = useState(false)
    const { user } = useAuth()
    const router = useRouter()
    function replaceToSignin() {
      window.document.location.href = SYN_ROUTES.signIn
      return
    }

    useEffect(() => {
      if (!token) {
        replaceToSignin()
      }

      if (!!user && profiles.length > 0) {
        const profileExist = profiles.find((p) =>
          user?.perfisPorTenant[0].perfis.map((p) => p.idPerfil).includes(p)
        )
        if (!profileExist) {
          replaceToSignin()
        }
      }
      setAllowed(true)
    }, [user])

    if (!user || !allowed) {
      return null
    }

    if (!user?.aceitouTermo || !user.aceitouPoliticaPrivacidade) {
      // if (!!window) window?.history.pushState({}, "", SYN_ROUTES.termoDeUso)

      return <TermoDeUso />
    }

    return (
      <div>
        {showHeader && <SiteHeader />}
        {Component}
        {showFooter && <SiteFooter />}
      </div>
    )
  }
}
