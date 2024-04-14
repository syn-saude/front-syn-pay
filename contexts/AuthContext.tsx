"use client"

import { createContext } from "react"

import { AuthContextData, AuthProviderProps } from "./types"

export const AuthContext = createContext({} as AuthContextData)
