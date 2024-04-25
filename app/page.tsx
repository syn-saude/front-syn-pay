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

import * as S from "./styles"
import Modal from "@/app/modal/modal"

const { version } = require("../package.json")

yup.setLocale(pt)

const schema = yup
  .object({
    cpf: yup.string().required(),
    email: yup.string(),
    senha: yup.string().required(),
    ciente: yup
      .boolean()
      .required()
      .oneOf([true], "Você precisa aceitar os termos"),
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
  const msgError = () => errors.ciente?.message
  const isValid = () => !msgError()

  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [textInfo, setTextInfo] = useState<number>(0)
  const showOpenModal = (idInfo: number) => {
    setTextInfo(idInfo)
    setOpenModal(true)
  }


  async function handleSingIn(form: SingInProps) {
    if (!isValid) {
      return
    }

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

          <div className="flex flex-col gap-2 mt-2">
            <div className="flex grid-cols-2">
              <Button
                className="text-xs"
                type="button"
                variant="link"
                onClick={() => showOpenModal(1)}
              >
                Ver termo de uso{" "}
                <ExternalLink size={16} style={{ marginLeft: "6px" }} />
              </Button>

              <Button
                className="text-xs"
                type="button"
                variant="link"
                onClick={() => showOpenModal(2)}
                
              >
                Ver políticas de privacidade{" "}
                <ExternalLink size={16} style={{ marginLeft: "6px" }} />
              </Button>
            </div>
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

                    <Label className="text-xs">
                      Confirmo estar ciente sobre o CET e taxas do meu contrato!
                    </Label>
                  </div>
                )}
              />
              {!isValid() && (
                <span className="text-sm font-medium text-red-500">
                  {msgError()}
                </span>
              )}
            </div>
          </div>

          {openModal && (
            <Modal
              isOpen={openModal}
              onRequestClose={() => setOpenModal(false)}
              idInfo={textInfo}
            />
          )}
        </S.LoginContent>
      </S.Container>
    </>
  )
}
