import { AxiosResponse } from "axios"

import { api } from "../apiClient"
import { AuthResponse, SingInProps } from "./types"

export function authLogin(
  query: SingInProps
): Promise<AxiosResponse<AuthResponse>> {
  return api.post("/synpayauth/login", query)
}
