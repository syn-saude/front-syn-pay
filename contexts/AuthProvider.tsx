"use client"

import { ReactNode, createContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/services/apiClient"
import { authLogin } from "@/services/auth"
import { SingInProps } from "@/services/auth/types"
import { destroyCookie, parseCookies, setCookie } from "nookies"
import { toast } from "sonner"

import { AuthContext } from "./AuthContext"
import { AuthProviderProps, UserProps } from "./types"

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const isAuthenticated = !!user

  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies()
    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { id, name, cpf } = response.data
          setUser({ id, name, cpf })
        })
        .catch(() => {
          singOut()
        })
    }
  }, [])

  async function singIn({ cpf, senha }: SingInProps) {
    try {
      const response = await authLogin({
        cpf,
        senha,
      })

      const { authToken } = response.data

      setCookie(undefined, "@nextauth.token", authToken, {
        maxAge: 60 * 60 * 1, // 1 hour
        // maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      })

      setUser({
        id: "",
        name: "",
        cpf,
      })

      api.defaults.headers["Authorization"] = `Bearer ${authToken}`

      toast.success("Bem Vindo! " + cpf)

      router.push("/homepage")
    } catch (error) {
      toast.error("Erro ao acessar")
      console.log("Error ao acessar", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, singIn, singOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function singOut() {
  try {
    destroyCookie(undefined, "@nextauth.token")
    window.location.href = "/"
    // router.push("/")
  } catch {
    console.log("Erro ao deslogar")
  }
}
