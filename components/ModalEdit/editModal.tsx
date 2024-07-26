import React, { useState } from "react"
import { UserEditProps } from "@/services/auth/types"
import { redefinirUsuario } from "@/services/editUser"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { pt } from "yup-locales"

import useAuth from "@/hooks/useAuth"
import { IEditUserRequest } from "@/components/ModalEdit/interface"

import {
  Dialog,
  DialogContent,
  DialogHeader,

} from "../ui/dialog"
import FileUpload from "../ui/fileUpload/fileUpload"
import Input from "../ui/input"
import { Label } from "../ui/label"
import * as S from "./styles"

interface ModalOrderProps {
  isOpen: boolean
  onRequestClose: () => void
}

yup.setLocale(pt)

const schema = yup
  .object({
    nome: yup.string(),
    email: yup.string(),
    telefone: yup.string(),
  })
  .required()

export default function EditModal({ onRequestClose, isOpen }: ModalOrderProps) {
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

  async function handleEditarUsuarioSenha(form: UserEditProps) {
    try {
      setLoading(true)
      await redefinirUsuario(form)
      setEditUser(form)
      setLoading(false)
      onRequestClose()
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onRequestClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Label>Olá,</Label>
          <Label>Vamos alterar os deus dados?</Label>
          <div className="flex flex-col gap-8 items-center">
            <FileUpload />
          </div>
        </DialogHeader>

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
                placeholder="Informe seu email"
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <Label className="text-xs">Telefone</Label>
              <Input
                errors={errors}
                control={control}
                mask="(99) 99999-9999"
                controlName="telefone"
                placeholder="Informe seu telefone"
              />
            </div>
          </div>
          <S.ButtonContent type="submit" loading={loading} className="w-full ">
            Salvar
          </S.ButtonContent>
        </S.FormContent>
      </DialogContent>
    </Dialog>
  )
}


