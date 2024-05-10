import React from "react"
import { Check } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import * as S from "./styles"

interface ModalOrderProps {
  isOpen: boolean
  onRequestClose: () => void
  textInfo: string
}
export default function SuccessModal({
  onRequestClose,
  isOpen,
  textInfo,
}: ModalOrderProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="flex flex-col items-center justify-center gap-7">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full border-2 border-green-300">
              <Check className=" h-14 w-14 text-green-500  animate-in" />
            </div>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <S.TextLabel>Sucesso!</S.TextLabel>
        <S.ContenteInfo>
          <S.TextInfo>{textInfo}</S.TextInfo>
        </S.ContenteInfo>

        <AlertDialogFooter>
          <AlertDialogAction onClick={onRequestClose}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
