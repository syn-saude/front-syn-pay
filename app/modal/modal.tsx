import React from "react"

import PoliticaPrivacidadeText from "@/config/const/docs/PoliticaPrivacidadeTexto"
import TermoDeUsoText from "@/config/const/docs/TermoDeUsoTexto"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"

import * as S from "./styles"

interface ModalProps {
  isOpen: boolean
  onRequestClose: () => void
  idInfo: number
}
export default function Modal({ onRequestClose, isOpen, idInfo }: ModalProps) {
  const veiwInfo = idInfo === 1 ? TermoDeUsoText : PoliticaPrivacidadeText

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-5xl max-h-full overflow-auto align-middle">
        <S.ContenteInfo>
          <S.TextInfo>{idInfo}</S.TextInfo>
        </S.ContenteInfo>
        <div
          className="mt-[-50]"
          dangerouslySetInnerHTML={{ __html: veiwInfo }}
        ></div>
        <AlertDialogFooter className="mx-[250px] mt-[-50]">
          <AlertDialogAction
            className="w-[400px] h-16"
            onClick={onRequestClose}
          >
            Fechar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
