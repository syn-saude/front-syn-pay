"use client"

import { ThemeProvider } from "next-themes"
import { ToastContainer } from "react-toastify"
import { Toaster } from "sonner"

import { AuthProvider } from "./AuthProvider"
import ToastProvider from "./ToastProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
        {/* <ToastContainer autoClose={3000} /> */}
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}
