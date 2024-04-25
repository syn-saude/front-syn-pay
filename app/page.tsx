"use client"

import { useContext, useEffect, useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { AuthContext } from "@/contexts/AuthContext"
import logo2 from "@/public/img/logo-2.png"
import { SingInProps } from "@/services/auth/types"
import { canSSRGuest } from "@/utils/canSSRGuest"
import { DevTool } from "@hookform/devtools"
import { yupResolver } from "@hookform/resolvers/yup"
import { ExternalLink } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
// import { toast } from "sonner"
import { toast } from "react-toastify"
import * as yup from "yup"
import { pt } from "yup-locales"

import { SYN_ROUTES } from "@/config/const/routes"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Modal from "@/app/modal/modal"

import * as S from "./styles"

const { version } = require("../package.json")

yup.setLocale(pt)

const schema = yup
  .object({
    cpf: yup.string().required(),
    email: yup.string(),
    senha: yup.string().required(),
  })
  .required()

export default function Home() {
  const { singIn } = useContext(AuthContext)

  const { register, watch, handleSubmit, setValue, formState, control } =
    useForm<SingInProps>({
      resolver: yupResolver(schema),
    })

  const form = watch()
  const { errors } = formState

  const [loading, setLoading] = useState(false)

  async function handleSingIn(form: SingInProps) {
    try {
      setLoading(true)

      await singIn(form)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  useEffect(() => {
    register("cpf")
  }, [register])

  return (
    <>
      <Head>
        <title>SynSaude - login</title>
      </Head>
      <S.Container className="bg-slate-900">
        <S.LoginContent className="bg-white p-8 pb-10 rounded-md  transition-opacity  dark:bg-slate-950">
          <Image src={logo2} alt="SynSaude" width={120} className="mb-2" />

          <S.FormContent onSubmit={handleSubmit(handleSingIn)}>
            <S.InputContainer>
              <Label>CPF</Label>
              <Input
                control={control}
                errors={errors}
                mask="999.999.999-99"
                controlName="cpf"
                placeholder="Digite seu cpf"
                type="text"
              />
            </S.InputContainer>
            <S.InputContainer>
              <Label>Senha</Label>
              <Input
                control={control}
                errors={errors}
                controlName="senha"
                placeholder="Digite sua senha"
                type="password"
              />
            </S.InputContainer>

            <S.ButtonContent
              type="submit"
              loading={loading}
              className="w-full "
            >
              Acessar
            </S.ButtonContent>

            <S.btnBack href="/esqueci-senha">Esqueceu sua senha?</S.btnBack>

            <Badge variant="secondary">v{version}</Badge>
          </S.FormContent>
        </S.LoginContent>
      </S.Container>
    </>
  )
}
