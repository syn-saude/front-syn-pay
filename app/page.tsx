"use client"

import { FormEvent, useContext, useEffect, useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { AuthContext } from "@/contexts/AuthContext"
import doctorImg from "@/public/img/logo-2.png"
import { SingInProps } from "@/services/auth/types"
import { canSSRGuest } from "@/utils/canSSRGuest"
import { DevTool } from "@hookform/devtools"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
// import { toast } from "sonner"
import { toast } from "react-toastify"
import * as yup from "yup"
import { pt } from "yup-locales"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import InputWithMask from "@/components/InputMask"
import { NavigationMenuDemo } from "@/components/NavigationMenuT"

import * as S from "./styles"

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
      debugger
      setLoading(true)
      await singIn(form)
    } catch (error) {
      setLoading(false)
    }
  }

  function notificar() {
    toast.success("Bem Vindo! ")
  }
  useEffect(() => {
    register("cpf")
  }, [register])

  return (
    <>
      <Head>
        <title>SynSaude - login</title>
      </Head>
      <S.Container>
        {/* <NavigationMenuDemo /> */}
        <S.LoginContent>
          <Image src={doctorImg} alt="SynSaude" width={120} />

          {/* <h1>Bem vindo de Volta!1</h1> */}
          <S.FormContent onSubmit={handleSubmit(handleSingIn)}>
            <S.InputContainer>
              <S.InputLabel>Cpf</S.InputLabel>
              <Input
                control={control}
                errors={errors}
                controlName="cpf"
                placeholder="Digite seu cpf"
                type="text"
              />
            </S.InputContainer>
            <S.InputContainer>
              <S.InputLabel>Senha</S.InputLabel>
              <Input
                control={control}
                errors={errors}
                controlName="senha"
                placeholder="Digite sua senha"
                type="password"
              />
            </S.InputContainer>

            <S.InputLabel style={{ color: "var(--purple-300)" }}>
              Esqueceu sua senha?
            </S.InputLabel>
            <S.ButtonContent type="submit">Acessar</S.ButtonContent>
            <Button type="button" onClick={notificar}>
              Acessar
            </Button>
            <Button loading type="button" onClick={notificar}>
              Acessar
            </Button>
          </S.FormContent>
          <div>
            <S.InputLabel> Não possui uma conta?</S.InputLabel>
            <Link href="/singup">
              <S.InputLabel
                style={{ color: "var(--purple-300)", fontWeight: "700" }}
              >
                Cadastre-se!
              </S.InputLabel>
            </Link>
          </div>
        </S.LoginContent>
        {/* <Image src={doctorImg} alt="SynSaude" width={690} height={690}/> */}
        {/* <DevTool control={control} /> */}
      </S.Container>
    </>
  )
}

// export const getServerSideProps = canSSRGuest(async (ctx) => {
//   return {
//     props: {},
//   };
// });
