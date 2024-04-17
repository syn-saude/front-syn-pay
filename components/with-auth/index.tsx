"use client"

import { ReactNode, useEffect, useState } from "react"
// import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"
// import { useRouter } from "next/router"
import { sessionStatus } from "@/utils/sessionStatus"
import { parseCookies } from "nookies"

import { SYN_ROUTES } from "@/config/const/routes"
import { SYN_PROFILES } from "@/config/const/syn/profiles"
import useAuth from "@/hooks/useAuth"

import SiteHeader from "../site-header"

// interface IProps {
//   Component: any
//   showHeader: boolean
// }

export default function withAuth(
  Component: ReactNode,
  profiles = [SYN_PROFILES.PARCEIRO],
  showHeader = true
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
        //Verificar se usuário logado tem o perfil requisitado
        const profileExist = profiles.find((p) => user?.perfis.includes(p))
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
      </div>
    )
  }
}
