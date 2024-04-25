"use client"

import { Suspense } from "react"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/navigation"
import logo2 from "@/public/img/logo-2.png"
import { yupResolver } from "@hookform/resolvers/yup"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { pt } from "yup-locales"

import { SYN_ROUTES } from "@/config/const/routes"
import useAuth from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import withAuth from "@/components/with-auth"

yup.setLocale(pt)

const schema = yup
  .object({
    ciente: yup
      .boolean()
      .required()
      .oneOf([true], "Você precisa aceitar os termos"),
  })
  .required()

export default function TermoDeUso() {
  const router = useRouter()
  const { singOut } = useAuth()
  const { register, watch, handleSubmit, formState, control } = useForm<{
    ciente: boolean
  }>({
    resolver: yupResolver(schema),
  })

  const form = watch()
  const { errors } = formState

  async function handleAceiteTermo(form: any) {}

  return (
    <>
      <Head>
        <title>Syn Saúde - Termo de uso</title>
      </Head>
      <div className="h-full min-h-[100vh] flex items-start justify-center bg-slate-900">
        <div className="container max-w-screen-md mx-auto mt-10  bg-white p-8 pb-10 rounded-md  dark:bg-slate-950">
          <Button variant="link" onClick={singOut}>
            <ArrowLeft className="h-4" />
            Voltar
          </Button>
          <Image
            src={logo2}
            alt="SynSaude"
            width={120}
            className="my-4 mx-auto "
          />
          <div className="text-center mt-4 mb-8">
            <h5 className="text-lg text-foreground font-semibold">
              Precisamos que leia e aceite nosso termo de uso e políticas
            </h5>
            <p className="text-sm text-foreground ">
              Ao continuar, você declara que leu e aceitou nossos termos de uso
              e política de privacidade.
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-col gap-0 items-start">
              <Button
                className="text-sm"
                type="button"
                variant="link"
                onClick={() => {}}
              >
                Ver termo de uso{" "}
                <ExternalLink size={16} style={{ marginLeft: "6px" }} />
              </Button>

              <Button
                className="text-sm"
                type="button"
                variant="link"
                onClick={() => {}}
              >
                Ver políticas de privacidade{" "}
                <ExternalLink size={16} style={{ marginLeft: "6px" }} />
              </Button>
            </div>
            <div className="px-4 grid grid-cols-1 gap-3">
              <div>
                <Controller
                  control={control}
                  name="ciente"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        className="flex items-center space-x-2"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />

                      <Label htmlFor="" className="text-xs">
                        Li e aceito os termos de uso e as políticas de
                        privacidade
                      </Label>
                    </div>
                  )}
                />
                {!!errors?.ciente && (
                  <span className="text-sm font-medium text-red-500">
                    {errors?.ciente?.message}
                  </span>
                )}
              </div>
              <Button
                disabled={!form?.ciente}
                className="text-xs w-full"
                type="button"
                variant="default"
                onClick={() => {}}
              >
                Continuar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
