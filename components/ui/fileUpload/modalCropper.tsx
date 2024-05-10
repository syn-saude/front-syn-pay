import React, { useCallback, useEffect, useState } from "react"
import { Check } from "lucide-react"
import Cropper from "react-easy-crop"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../alert-dialog"
import getCroppedImg from "./cropImage"

interface ModalCropperProps {
  isOpen: boolean
  onRequestClose: () => void
  imgEdit: any
  onImgChange: (img: any) => void
}

export default function ModalCropper({
  onRequestClose,
  isOpen,
  imgEdit,
  onImgChange,
}: ModalCropperProps) {
  const minZoom = 0.4

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    setZoom(1)
  }, [imgEdit.open])

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  async function getCropped() {
    var imgCropped = await getCroppedImg(imgEdit, croppedAreaPixels)

    if (!!imgCropped) {
      onImgChange(imgCropped as File)
    }
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="flex flex-col items-center justify-center gap-7  ">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <span>editar imagem</span>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="relative h-[280px] w-[380px]">
          <Cropper
            image={imgEdit}
            crop={crop}
            minZoom={minZoom}
            zoom={zoom}
            showGrid={false}
            restrictPosition={false}
            cropSize={{ width: 256, height: 256 }}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="controls">
          <input
            type="range"
            value={zoom}
            min={minZoom}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => {
              setZoom(parseFloat(e.target.value))
            }}
            className="zoom-range"
          />
        </div>

        <AlertDialogFooter className="flex flex-row gap-4">
          <AlertDialogAction onClick={getCropped}>Recortar</AlertDialogAction>
          <AlertDialogCancel onClick={onRequestClose} className="m-0">
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
