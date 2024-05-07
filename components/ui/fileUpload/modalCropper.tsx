import React, { useCallback, useEffect, useState } from "react"
import { Check } from "lucide-react"
import Cropper from "react-easy-crop"
import getCroppedImg  from "./cropImage"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../alert-dialog"

interface ModalCropperProps {
  isOpen: boolean
  onRequestClose: () => void
  imgEdit: any
  onImgChange?: (img: any) => void
}

export default function ModalCropper({
  onRequestClose,
  isOpen,
  imgEdit,
  onImgChange,
}: ModalCropperProps) {
  const { image, onCropped } = imgEdit
  const minZoom = 0.4

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    setZoom(1)
  }, [imgEdit.open])

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels)
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  async function getCropped() {
    debugger
    var imgCropped = await getCroppedImg(image, croppedAreaPixels)
    
    console.log(imgCropped)
    onCropped(imgCropped)
  }
  
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="flex flex-col items-center justify-center gap-7  ">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <span>editar imagem</span>
            {/* <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full border-2 border-green-300">
              <Check className=" h-14 w-14 text-green-500  animate-in" />
            </div> */}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="relative h-[260px] w-[260px]">
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
        <img src={image} alt="" />
        {/* <S.TextLabel>Sucesso!</S.TextLabel> */}
        {/* <S.ContenteInfo>
          <S.TextInfo>{textInfo}</S.TextInfo>
        </S.ContenteInfo> */}

        <AlertDialogFooter className="flex flex-row gap-4">
          <AlertDialogAction onClick={getCropped}>
            Recortar
          </AlertDialogAction>
          <AlertDialogCancel onClick={onRequestClose} className="m-0">
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
