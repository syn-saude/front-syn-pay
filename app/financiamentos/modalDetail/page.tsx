import React from "react"
import { X } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import ResumePage from "@/components/ui/resume-page/resumePage"
import { ParcelaBV, SimulacaoResponse } from "@/components/ui/resume-page/types"

import * as S from "./styles"

interface ModalOrderProps {
  isOpen: boolean
  onRequestClose: () => void
  optionDetail: ParcelaBV
  simulacao: SimulacaoResponse
}

export default function ModalDetail({
  onRequestClose,
  isOpen,
  optionDetail,
  simulacao,
}: ModalOrderProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onRequestClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detalhes</DialogTitle>
        </DialogHeader>
        <ResumePage parcela={optionDetail} simulacao={simulacao} />
      </DialogContent>
    </Dialog>
  )
}
