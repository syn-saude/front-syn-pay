"use client"

import React, { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { EsqueciSenhaProps } from "@/services/auth/types"
import { esqueciSenha } from "@/services/esqueciSenha"
import { yupResolver } from "@hookform/resolvers/yup"
import { ArrowLeft, Router, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import * as yup from "yup"
import { pt } from "yup-locales"

import Button from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import SuccessModal from "../../components/success-modal/successModal"
import * as S from "./styles"

yup.setLocale(pt)

const schema = yup
  .object({
    cpf: yup.string().required(),
  })
  .required()

export default function EsqueciSenha() {
  const router = useRouter()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, watch, handleSubmit, setValue, formState, control } =
    useForm<EsqueciSenhaProps>({
      resolver: yupResolver(schema),
    })

  const form = watch()
  const { errors } = formState

  function handleCloseModal() {
    setModalIsOpen(false)
    router.push("/")
  }

  async function handleNewPassword(form: EsqueciSenhaProps) {
    try {
      setLoading(true)
      await esqueciSenha(form)
      setLoading(false)
      setModalIsOpen(true)
    } catch (error) {
      setLoading(false)
    }
  }

  const msgSuccess = () => {
    return <Dialog />
  }

  useEffect(() => {
    register("cpf")
  }, [register])
  return (
    <>
      <Head>
        <title>Esqueci minha senha</title>
      </Head>
      <S.Container className="bg-slate-900">
        <S.LoginContent className="bg-white p-8 pb-10 rounded-md  dark:bg-slate-950">
          <S.FormContent onSubmit={handleSubmit(handleNewPassword)}>
            <S.btnBack href="/">
              <ArrowLeft size={16} />
              Voltar
            </S.btnBack>
            <S.InputLabel>Esqueci minha senha</S.InputLabel>
            <S.InputContainer>
              <S.InputText>
                Digite o CPF da sua conta para que possamos enviar um e-mail com
                as instruções para definir uma nova senha.
              </S.InputText>
              <Input
                control={control}
                errors={errors}
                mask="999.999.999-99"
                controlName="cpf"
                placeholder="Digite seu cpf"
                type="text"
              />
            </S.InputContainer>
            <S.ButtonContent
              type="submit"
              loading={loading}
              className="w-full "
            >
              <User />
              CONTINUAR
            </S.ButtonContent>
          </S.FormContent>
          {modalIsOpen && (
            <SuccessModal
              textInfo="Dentro de instantes você deve receber um e-mail contendo as instruções para redefinir a senha."
              isOpen={modalIsOpen}
              onRequestClose={handleCloseModal}
            />
          )}
        </S.LoginContent>
      </S.Container>
    </>
  )
}
