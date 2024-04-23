"use client"

import { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import logo2 from "@/public/img/logo-2.png"
import { RedefinirSenhaProps } from "@/services/auth/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import * as yup from "yup"
import { pt } from "yup-locales"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as S from "./styles"
import { redefinirSenha, redefinirSenhaToken } from "@/services/redefinirSenha"
import { useSearchParams } from "next/navigation"
import { useRouter } from 'next/navigation'
import SuccessModal from "@/components/success-modal/successModal"

yup.setLocale(pt)

const schema = yup
  .object({
    senha: yup.string().required(),
    confirmaSenha: yup.string().required(),
  })
  .required()

export default function RedefinirSenha() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const { register, watch, handleSubmit, setValue, formState, control } =
    useForm<{ senha: string; confirmaSenha: string; }>({
      resolver: yupResolver(schema),
    })

  const form = watch()
  const { errors } = formState
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function handleCloseModal() {
    if (token !== null) {
      router.push('/')
    } else {
      setTimeout(() => {
        router.push('/financiamentos')
      }, 200)
    }
    setTimeout(() => {
      setModalIsOpen(false)
    }, 200)
  }

  async function handleDefinirSenha(form: RedefinirSenhaProps) {
    if (token !== null) {
      if (form.senha !== form.confirmaSenha) {
        toast.error("As senhas não conferem")
        return
      }
      const senha = form.senha
      try {
        setLoading(true)
        await redefinirSenhaToken({ token, senha })
        setLoading(false)
        setModalIsOpen(true)
      } catch (error) {
        setLoading(false)
      }

    } else {
      if (form.senha !== form.confirmaSenha) {
        toast.error("As senhas não conferem")
        return
      }
      const senha = form.senha
      try {
        setLoading(true)
        await redefinirSenha({ senha })
        setLoading(false)
        setModalIsOpen(true)
      } catch (error) {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <Head>
        <title>SynSaude - login</title>
      </Head>
      <S.Container className="bg-slate-900">
        <S.LoginContent className="bg-white p-8 pb-10 rounded-md  dark:bg-slate-950">
          <Image src={logo2} alt="SynSaude" width={120} className="mb-2" />
          <Label>Olá,</Label>
          <Label>Vamos alterar sua senha!</Label>
          <S.FormContent onSubmit={handleSubmit(handleDefinirSenha)}>
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
            <S.InputContainer>
              <Label>Confirmar Senha</Label>
              <Input
                control={control}
                errors={errors}
                controlName="confirmaSenha"
                placeholder="Confirme sua senha senha"
                type="password"
              />
            </S.InputContainer>
            <S.ButtonContent
              type="submit"
              loading={loading}
              className="w-full "
            >
              DEFINIR SENHA
            </S.ButtonContent>
          </S.FormContent>
          {modalIsOpen && (
            <SuccessModal
              textInfo="Dentro de instantes você será redirecionado!"
              isOpen={modalIsOpen}
              onRequestClose={handleCloseModal} />
          )
          }
        </S.LoginContent>
      </S.Container>
    </>
  )
}
