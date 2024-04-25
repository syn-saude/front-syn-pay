import { ReactNode } from "react"
import { AuthResponse, SingInProps } from "@/services/auth/types"

export type AuthContextData = {
  user: AuthResponse | null
  isAuthenticated: boolean
  singIn: (credentials: SingInProps) => Promise<void>
  singOut?: () => void
  setAceitouTermo: () => void
}

export type UserProps = {
  id: string
  cpf: string
  name: string
}

export type AuthProviderProps = {
  children: ReactNode
}
