import React from "react"
import { X } from "lucide-react"
import * as S from "./styles"
import ResumePage from "@/components/ui/resume-page/resumePage"
import { ParcelaBV } from "@/components/ui/resume-page/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void
  optionDetail: ParcelaBV
}
export default function ModalDetail({ onRequestClose, isOpen, optionDetail }: ModalOrderProps) {

  return (
    <Dialog open={isOpen} onOpenChange={onRequestClose}>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <ResumePage parcela={optionDetail}/>
      </DialogContent>
    </Dialog>
  )
}
