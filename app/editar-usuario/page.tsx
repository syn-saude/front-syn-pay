"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { UserEditProps } from "@/services/auth/types"
import { redefinirUser } from "@/services/editUser"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { pt } from "yup-locales"

import useAuth from "@/hooks/useAuth"
import FileUpload from "@/components/ui/fileUpload/fileUpload"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SuccessModal from "@/components/success-modal/successModal"
import withAuth from "@/components/with-auth"

import { IEditUserRequest } from "./interface"
import * as S from "./styles"

yup.setLocale(pt)

const schema = yup
  .object({
    nome: yup.string(),
    email: yup.string(),
    telefone: yup.string(),
  })
  .required()

function EditarUsuario() {
  const { user } = useAuth()

  const { setEditUser } = useAuth()
  const { register, watch, handleSubmit, setValue, formState, control } =
    useForm<IEditUserRequest>({
      resolver: yupResolver(schema),
      defaultValues: {
        nome: user?.nome,
        email: user?.email,
        telefone: user?.telefone,
      },
    })

  const form = watch()
  const { errors } = formState

  const [loading, setLoading] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const router = useRouter()

  function handleCloseModal() {
    router.push("/financiamentos")
    setTimeout(() => {
      setModalIsOpen(false)
    }, 400)
  }

  async function handleEditarUsuarioSenha(form: UserEditProps) {
    try {
      setLoading(true)
      await redefinirUser(form)
      setEditUser(form)
      setLoading(false)
      setModalIsOpen(true)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <>
      <S.Container className="bg-slate-800">
        <S.LoginContent className="bg-white p-8 pb-10 rounded-md  dark:bg-slate-950">
          <Label>Olá,</Label>
          <Label>Vamos alterar os deus dados?</Label>

          {/* <div>{user?.urlAvatar}</div> */}
          <div className="flex flex-col gap-8 items-center">
            <FileUpload />
          </div>

          <S.FormContent onSubmit={handleSubmit(handleEditarUsuarioSenha)}>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-1 w-full">
                <Label className="text-xs">Nome completo</Label>
                <Input
                  errors={errors}
                  control={control}
                  controlName="nome"
                  placeholder="Informe seu nome"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">E-mail</Label>
                <Input
                  errors={errors}
                  control={control}
                  controlName="email"
                  placeholder="Informe seu nome"
                />
              </div>
              <div className="flex flex-col gap-1 ">
                <Label className="text-xs">Telefone</Label>
                <Input
                  errors={errors}
                  control={control}
                  mask="(99) 99999-9999"
                  controlName="telefone"
                  placeholder="Informe seu nome"
                />
              </div>
            </div>
            <S.ButtonContent
              type="submit"
              loading={loading}
              className="w-full "
            >
              Salvar
            </S.ButtonContent>
          </S.FormContent>
          {modalIsOpen && (
            <SuccessModal
              textInfo="Dentro de instantes você será redirecionado!"
              isOpen={modalIsOpen}
              onRequestClose={handleCloseModal}
            />
          )}
        </S.LoginContent>
      </S.Container>
    </>
  )
}

export default withAuth(<EditarUsuario />)
