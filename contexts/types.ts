import { ReactNode } from "react"
import { SingInProps } from "@/services/auth/types"

export type AuthContextData = {
  user: UserProps
  isAuthenticated: boolean
  singIn: (credentials: SingInProps) => Promise<void>
  singOut?: () => void
}

export type UserProps = {
  id: string
  cpf: string
  name: string
}

export type AuthProviderProps = {
  children: ReactNode
}
