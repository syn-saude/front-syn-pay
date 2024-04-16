"use client"

import { ReactNode, useEffect } from "react"
import { redirect } from "next/navigation"
import { sessionStatus } from "@/utils/sessionStatus"

// import { useRouter } from "next/router"

// import { SYN_ROUTES } from "@/config/const/routes"
// import { SYN_PROFILES } from "@/config/const/syn/profiles"
// import useAuth from "@/hooks/useAuth"

import SiteHeader from "../site-header"

// interface IProps {
//   Component: any
//   showHeader: boolean
// }

export type TabProps = {
  Icon: React.ReactElement
  showHeader?: boolean
}

export default function withAuth(Component: ReactNode, showHeader = true) {
  // profiles: string[] = [SYN_PROFILES.PARCEIRO],
  const session = sessionStatus
  return function WithAuth(props: any) {
    useEffect(() => {
      if (!session) {
        redirect("/")
      }
    }, [])

    if (!session) {
      return null
    }

    // return <Component />
    // const { user } = useAuth()
    // const router = useRouter()

    // if (profiles.length > 0) {
    //   //Verificar se usuário logado tem o perfil requisitado
    //   const profileExist = profiles.find((p) => user?.perfis.includes(p))
    //   if (!profileExist) {
    //     redirect(SYN_ROUTES.signIn)
    //     // router.replace(SYN_ROUTES.signIn)
    //   }
    // }

    return (
      <div>
        {showHeader && <SiteHeader />}
        {Component}
      </div>
    )
  }
}
