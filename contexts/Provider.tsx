"use client"

import { ThemeProvider } from "next-themes"
import { ToastContainer } from "react-toastify"
import { Toaster } from "sonner"

import { TooltipProvider } from "@/components/ui/tooltip"

import { AuthProvider } from "./AuthProvider"
import ToastProvider from "./ToastProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <ToastProvider>{children}</ToastProvider>
        </TooltipProvider>
        {/* <ToastContainer autoClose={3000} /> */}
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}
