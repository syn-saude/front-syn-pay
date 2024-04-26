"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { addTenant, addToken } from "@/services/apiClient"
import { authLogin } from "@/services/auth"
import { AuthResponse, SingInProps } from "@/services/auth/types"
import { destroyCookie, parseCookies, setCookie } from "nookies"
import { toast } from "react-toastify"

import useLocalStorage from "@/hooks/useLocalStorage"

import { AuthContext } from "./AuthContext"
import { AuthProviderProps, UserProps } from "./types"

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const [storageUser, setStorageUser, removeStorageUser] =
    useLocalStorage("@synauth.user")
  const [user, setUser] = useState<AuthResponse | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const { "@synauth.token": token, "@synauth.tenant": tenant } =
      parseCookies()

    if (token) {
      setUser(storageUser)
      addToken(token)
      addTenant(tenant)
    }
  }, [])

  async function singIn({ cpf, senha }: SingInProps) {
    try {
      const response = await authLogin({
        cpf,
        senha,
      })

      const userAuthResponse = response.data
      const { authToken } = userAuthResponse

      setCookie(undefined, "@synauth.token", authToken, {
        // maxAge: 60 * 60 * 1, // 1 hour
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      })

      let tenantId = userAuthResponse.perfisPorTenant[0]?.tenantId
      setCookie(undefined, "@synauth.tenant", tenantId, {
        // maxAge: 60 * 60 * 1, // 1 hour
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      })

      setUser(userAuthResponse)
      setStorageUser(userAuthResponse)
      addToken(authToken)
      addTenant(tenantId)

      if (userAuthResponse.primeiroAcesso === true) {
        router.push(`/definir-senha`)
      } else {
        router.push("/financiamentos")
      }
    } catch (error) {
      toast.error("Usuário ou senha inválidos")
    }
  }

  function setAceitouTermo() {
    if (!user) return

    let newUser = user
    newUser.aceitouPoliticaPrivacidade = true
    newUser.aceitouTermo = true

    setUser(newUser)
    setStorageUser(newUser)
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, singIn, singOut, setAceitouTermo }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function singOut() {
  try {
    destroyCookie(undefined, "@synauth.token")
    destroyCookie(undefined, "@synauth.tenant")
    localStorage.removeItem("@synauth.user")
    window.location.href = "/"
    // router.push("/")
  } catch {
    console.log("Erro ao deslogar")
  }
}
