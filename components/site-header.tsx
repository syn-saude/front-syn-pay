"use client"

import Link from "next/link"
import { singOut } from "@/contexts/AuthProvider"
import {
  DollarSign,
  HandCoins,
  Menu,
  Moon,
  NotebookPen,
  Pencil,
  Search,
  Sun,
  User,
} from "lucide-react"
import { useTheme } from "next-themes"

import { siteConfig } from "@/config/site"
import useAuth from "@/hooks/useAuth"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import Button from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useEffect } from "react"
import Input from "./ui/input"

export default function SiteHeader() {
  const { user } = useAuth()
  const { setTheme, theme } = useTheme()

  const { width } = useWindowDimensions()
  const isMobile = width && width < 600


  return (
    <header className="bg-background  top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        {!isMobile && <MainNav items={siteConfig.mainNav} />}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="h-full rounded-r-xl">
            <nav className="grid gap-4 text-base font-medium items-center">
              <div className="flex flex-row gap-10  ml-11">
                <MainNav />
              </div>

              <div className="flex flex-col items-center gap-4 cursor-pointer ">
                <Avatar key={user?.urlAvatar} className="h-28 w-28">
                  <AvatarImage src={user?.urlAvatar} alt="@shadcn" />
                  <AvatarFallback>
                    <User size={28} strokeWidth={1.75} />
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-0 items-center">
                  <div className="text-sm font-semibold">
                    Olá, {user?.nome}
                  </div>
                  <div
                    style={{ fontSize: 10, lineHeight: 1 }}
                    className=" text-xs text-slate-500 font-semibold "
                  >
                    {user?.perfisPorTenant[0].descricao}
                  </div>
                </div>
                <Link
                  href="/editar-usuario"
                  className="flex items-center gap-2 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  Editar
                  <NotebookPen size={16} strokeWidth={1.75} />
                </Link>
              </div>

              <Link
                href="/financiamentos"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <HandCoins className="h-5 w-5" />
                Financiamentos
              </Link>

              {/* <Link
                href="/pagamentos"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <DollarSign className="h-5 w-5" />
                Pagamentos
              </Link> */}

              <hr />
              <Link
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground "
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                href={""}
              >
                <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
                <Moon className="hidden h-5 w-5 dark:block" />
                Modo {theme === "light" ? "dia" : "noite"}
              </Link>

              <Button onClick={singOut} variant="destructive">
                Sair
              </Button>
            </nav>
          </SheetContent>
          {isMobile && <span>Menu</span>}
        </Sheet>

        {!isMobile && (
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="hover:bg-slate-50 p-2 rounded-sm hover:text-black"
            >
              <div className="flex flex-row items-center gap-4 cursor-pointer ">
                <div className="flex flex-col gap-0">
                  <div className="text-sm font-semibold">
                    Olá, {user?.nome}
                  </div>
                  <div
                    style={{ fontSize: 10, lineHeight: 1 }}
                    className=" text-xs text-slate-500 font-semibold "
                  >
                    {user?.perfisPorTenant[0].descricao}
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Avatar key={user?.urlAvatar} className="h-10 w-10">
                    <AvatarImage src={user?.urlAvatar} alt="@shadcn" />
                    <AvatarFallback>
                      <User size={28} strokeWidth={1.75} />
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex items-center gap-4 w-44 justify-between">
                  <div>{user?.nome}</div>
                  <ThemeToggle />
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                Alterar para modo {theme === "light" ? "noite" : "dia"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link
                href="/editar-usuario"
                className="flex items-center gap-2 px-2.5 text-muted-foreground hover:text-foreground"
              >
                Editar
                <NotebookPen size={16} strokeWidth={1.75} />
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={singOut}
                className="font-bold cursor-pointer text-red-600 hover:bg-red-10"
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
