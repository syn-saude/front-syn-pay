import { setupAPIClient } from "./api"

export const api = setupAPIClient()

export const addToken = (token: string) => {
  api.defaults.headers.Authorization = `Bearer ${token}`
}

export const addTenant = (tenant: string) => {
  api.defaults.headers["X-Tenant"] = `${tenant}`
}
