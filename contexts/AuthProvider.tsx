"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { addToken } from "@/services/apiClient"
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
    const { "@synauth.token": token } = parseCookies()
    if (token) {
      setUser(storageUser)
      addToken(token)
      // api
      //   .get("/me")
      //   .then((response) => {
      //     const { id, name, cpf } = response.data
      //     setUser({ id, name, cpf })
      //   })
      //   .catch(() => {
      //     singOut()
      //   })
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

      setUser(userAuthResponse)
      setStorageUser(userAuthResponse)
      addToken(authToken)

      // toast.success("Bem Vindo! " + cpf)
      router.push("/financiamentos")
    } catch (error) {
      toast.error("Usuário ou senha inválidos")
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
    destroyCookie(undefined, "@synauth.token")
    localStorage.removeItem("@synauth.user")
    window.location.href = "/"
    // router.push("/")
  } catch {
    console.log("Erro ao deslogar")
  }
}
