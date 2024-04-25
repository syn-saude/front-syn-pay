"use client"

import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { sessionStatus } from "@/utils/sessionStatus"
import { parseCookies } from "nookies"

import { SYN_ROUTES } from "@/config/const/routes"
import { SYN_PROFILES } from "@/config/const/syn/profiles"
import useAuth from "@/hooks/useAuth"

import SiteHeader from "../site-header"
import SiteFooter from "../site-footer"


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
      router.replace(SYN_ROUTES.signIn)
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

    return (
      <div>
        {showHeader && <SiteHeader />}
        {Component}
        {showFooter && <SiteFooter />}
      </div>
    )
  }
}
